import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.cart)["$patch"],
  200
>;
type RequestType = InferRequestType<(typeof client.api.cart)["$patch"]>["json"];

export const useUpdateCart = () => {
 

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["cart"],
    mutationFn: async (json) => {
      const response = await client.api.cart.$patch({
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("cart updated")
    },
    onError: () => {
      toast.error("Failed to update product");
    },
  });

  return mutation;
};
