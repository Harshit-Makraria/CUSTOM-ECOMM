import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export type ResponseType = InferResponseType<
  (typeof client.api.departments)[":id"]["$get"],
  200
>;

export const useGetDepartments = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["departments", { id }],
    queryFn: async () => {
      const response = await client.api.departments[":id"].$get({
        param: {
          id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch department");
      }

      const { ...data } = await response.json();
      return data;
    },
  });

  return query;
};
