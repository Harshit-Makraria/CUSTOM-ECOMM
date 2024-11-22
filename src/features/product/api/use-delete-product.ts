import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.product[":id"]["$delete"], 200>;
type RequestType = InferRequestType<typeof client.api.product[":id"]["$delete"]>["param"];

export const useDeleteproduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (param) => {
      const response = await client.api.product[":id"].$delete({ 
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.invalidateQueries({ queryKey: ["product", { id: data.id }] });
    },
    onError: () => {
      toast.error("Failed to delete product");
    }
  });

  return mutation;
};
