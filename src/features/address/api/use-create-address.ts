import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.address["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.address["$post"]>["json"];

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.address.$post({ json });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success(" New Address Added");

      queryClient.invalidateQueries({ queryKey: ["Address"] });
    },
    onError: () => {
      toast.error("Failed to add address");
    }
  });

  return mutation;
};
