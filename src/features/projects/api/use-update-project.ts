import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"][":jsonId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":id"][":jsonId"]["$patch"]
>["json"];

export const useUpdateProject = (id: string, jsonId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["project", { id, jsonId }],
    mutationFn: async (json) => {
      const response = await client.api.projects[":id"][":jsonId"].$patch({
        json,
        param: { id, jsonId },
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", { id }] });
    },
    onError: () => {
      toast.error("Failed to update project");
    },
  });

  return mutation;
};
