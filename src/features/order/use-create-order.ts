import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.order["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.order["$post"]>["json"];

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.order.$post({ json });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {

      toast.success(" created");

      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
    onError: () => {
      toast.error("Failed to create order");
    }
  });

  return mutation;
};
