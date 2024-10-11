import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.users["$post"]>;
type RequestType = InferRequestType<typeof client.api.users.employee["$post"]>["json"];

export const useEmployeeSignUp = () => {
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
 
      const response = await client.api.users.employee.$post({ json });
      
      if (!response.ok) {
        // change this in future- display the message from backend 
        throw new Error("Email already exist");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("User created");
    },

    
  });

  return mutation;
};
