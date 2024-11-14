import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export type ResponseType = InferResponseType<
  (typeof client.api.branch)["$get"],
  200
>;

export const useGetBranchs = () => {
  const query = useQuery({
    
    queryKey: ["branchs"],
    queryFn: async () => {
      const response = await client.api.branch.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch department");
      }

      const {data}  = await response.json();
      return data
    },
  });

  return query;
};
