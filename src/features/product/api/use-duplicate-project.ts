import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.product[":id"]["duplicate"]["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.product[":id"]["duplicate"]["$post"]>["param"];

export const useDuplicateproduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (param) => {
      const response = await client.api.product[":id"].duplicate.$post({ 
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to duplicate product");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: () => {
      toast.error("Failed to duplicate product");
    }
  });

  return mutation;
};
