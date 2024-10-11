import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.departments["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.departments["$post"]>["json"];

export const useDepartmentToken = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.departments.$post({ json });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {

      toast.success("department created");

      queryClient.invalidateQueries({ queryKey: ["tokens"] });
    },
    onError: () => {
      toast.error("Failed to create department");
    }
  });

  return mutation;
};
