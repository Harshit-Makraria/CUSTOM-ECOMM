 
import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export type ResponseType = InferResponseType<
  (typeof client.api.order)["id"]["$get"],
  200
>;

export const useGetOrderByUserId = () => {
  const query = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const response = await client.api.order.id.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch order");
      }

      const { ...data } = await response.json();
      return data.data;
    },
  });

  return query;
};
