import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.verificationToken["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.verificationToken["$post"]>["json"];

export const useCreateToken = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.verificationToken.$post({ json });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Token send");

      queryClient.invalidateQueries({ queryKey: ["tokens"] });
    },
    onError: () => {
      
      toast.error("Failed to create token");
    }
  });

  return mutation;
};
