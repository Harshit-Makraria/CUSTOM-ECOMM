import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export type ResponseType = InferResponseType<
  (typeof client.api.users.employee)["$get"],
  200
>;

export type EmployeeResponse = ResponseType;


export const useGetEmployee = () => {
  const query = useQuery({
    
    queryKey: ["employee"],
    queryFn: async () => {
      const response = await client.api.users.employee.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch tokens");
      }

      const data  = await response.json();
      return data;
    },
  });

  return query;
};
