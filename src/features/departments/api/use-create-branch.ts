import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.branch["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.branch["$post"]>["json"];

export const useDepartmentToken = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.branch.$post({ json });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {

      toast.success("Department created");

      queryClient.invalidateQueries({ queryKey: ["branchs"] });
    },
    onError: () => {
      toast.error("Failed to create Department");
    }
  });

  return mutation;
};
