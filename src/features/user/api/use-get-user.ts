import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export type ResponseType = InferResponseType<
  (typeof client.api.users.user)["$get"],
  200
>;

export type UserResponse = ResponseType;


export const useGetUser = () => {
  const query = useQuery({
    
    queryKey: ["user"],
    queryFn: async () => {
      const response = await client.api.users.user.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data  = await response.json();
      return data.data;
    },
  });

  return query;
};
