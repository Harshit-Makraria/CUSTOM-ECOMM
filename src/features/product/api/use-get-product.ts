import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export type ResponseType = InferResponseType<typeof client.api.product[":id"]["$get"], 200>;

export const 
useGetproduct = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["product", { id }],
    queryFn: async () => {
      const response = await client.api.product[":id"].$get({
        param: {
          id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const { ...data } = await response.json();
      return data;
    },
  });

  return query;
};
