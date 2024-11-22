import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.product)[":id"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.product)[":id"]["$patch"]
>["json"];

export const useUpdateproduct = (id: string, jsonId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["product", { id, jsonId }],
    mutationFn: async (json) => {
      const response = await client.api.product[":id"].$patch({
        json,
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", { id }] });
    },
    onError: () => {
      toast.error("Failed to update product");
    },
  });

  return mutation;
};
