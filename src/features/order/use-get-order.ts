import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export type ResponseType = InferResponseType<
  (typeof client.api.order)[":id"]["$get"],
  200
>;

export const useGetOrder = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["order", { id }],
    queryFn: async () => {
      const response = await client.api.order[":id"].$get({
        param: {
          id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order");
      }

      const { ...data } = await response.json();
      return data;
    },
  });

  return query;
};
