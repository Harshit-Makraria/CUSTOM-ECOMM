import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export type ResponseType = InferResponseType<
  (typeof client.api.verificationToken)[":id"]["$get"],
  200
>;

export const useGetToken = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["token", { id }],
    queryFn: async () => {
      const response = await client.api.verificationToken[":id"].$get({
        param: {
          id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }

      const { ...data } = await response.json();
      return data;
    },
  });

  return query;
};
