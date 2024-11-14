import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export type ResponseType = InferResponseType<
  (typeof client.api.departments)["$get"],
  200
>;

export const useGetDepartment = () => {
  const query = useQuery({
    
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await client.api.departments.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch department");
      }

      const {data}  = await response.json();
      return data
    },
  });

  return query;
};
