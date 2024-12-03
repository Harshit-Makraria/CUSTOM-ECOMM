// import { InferResponseType } from "hono";
// import { useInfiniteQuery } from "@tanstack/react-query";

// import { client } from "@/lib/hono";

// export type ResponseType = InferResponseType<typeof client.api.product["$post"], 200>;

// export const useGetproducts = () => {
//   const query = useInfiniteQuery<ResponseType, Error>({
//     initialPageParam: 1,
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//     queryKey: ["products"],
//     queryFn: async ({ pageParam }) => {
//       const response = await client.api.product.$post({
//         json: {
//           page: (pageParam as number).toString(),
//           limit: "5",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch products");
//       }

//       return response.json();
//     },
//   });

//   return query;
// };
