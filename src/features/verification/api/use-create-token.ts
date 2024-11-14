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
        const {error} = await response.json() as {error :string}
        throw new Error(error);
      }

      return await response.json();
    },
    onSuccess: () => {

      toast.success("Token send");
      
      queryClient.invalidateQueries({ queryKey: ["tokens"] });
    },
    onError: (error :Error) => {
  
      toast.error(error.message);
    }
  });

  return mutation;
};
