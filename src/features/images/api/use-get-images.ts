
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";  // Ensure correct client path

// Custom Hook for Fetching Images
export const useGetImages = () => {
  return useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const response = await client.api.images.$get();

      // Assuming `client.api.images.$get()` returns parsed JSON response
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const { data } = await response.json();
      return data;
      // Returning image data array directly
        },
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2, // Retry failed requests twice
  });
};
