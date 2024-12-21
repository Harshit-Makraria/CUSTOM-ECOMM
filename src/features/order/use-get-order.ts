
import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export type ResponseType = InferResponseType<
  (typeof client.api.order)["$get"],
  200
>;

export const useGetOrder = () => {
  const query = useQuery({
  
    queryKey: ["order"],
    queryFn: async () => {
      const response = await client.api.order.$get({
      
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order");
      }

      const { ...data } = await response.json();
      return data.data;
    },
  });

  return query;
};
