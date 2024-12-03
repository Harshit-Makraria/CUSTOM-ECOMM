import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export type ResponseType = InferResponseType<typeof client.api.cart["$get"], 200>;

export const 
useGetcart = () => {
  const query = useQuery({
    
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await client.api.cart.$get()

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      const {...data } = await response.json();
      return data.data;
    },
  });

  return query;
};
