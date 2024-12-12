import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.shiprocket["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.shiprocket["$post"]>["json"];

export const useCreateRate = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
    //   const response = await client.api.products.$post({ json });
      const response = await client.api.shiprocket.$post({ json });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Rate Displayed");

      queryClient.invalidateQueries({ queryKey: ["shiprocket"] });
    },
    onError: () => {
      toast.error("Failed to display rate");
    }
  });

  return mutation;
};
