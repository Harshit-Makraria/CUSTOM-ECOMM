import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.cart["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.cart["$post"]>["json"];

export const useCreatecart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
    //   const response = await client.api.products.$post({ json });
      const response = await client.api.cart.$post({ json });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("cart created");

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Failed to create cart");
    }
  });

  return mutation;
};
