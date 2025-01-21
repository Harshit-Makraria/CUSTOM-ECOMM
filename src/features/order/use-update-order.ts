import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono"; // Assuming `client` has a base URL configured

// Define the expected response type from the updateOrder API call
type UpdateOrderResponse = {
  data: {
    count: number;
  };
};

// Define the input type for the mutation
type UpdateOrderInput = {
  orderId: string;
  status: string;
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  // Define the PATCH request function
  const updateOrder = async ({ orderId, status }: UpdateOrderInput): Promise<UpdateOrderResponse> => {
    // Use the `fetch` API to make the PATCH request
    const response = await fetch(`/api/order/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update order status");
    }

    return response.json();
  };

  // Define mutation options with the correct input and response types
  const mutation = useMutation<UpdateOrderResponse, Error, UpdateOrderInput>({
    mutationFn: updateOrder,
    onSuccess: () => {
      // Invalidate the query to fetch the latest data for orders
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
    onError: (error: Error) => {
      // Handle any errors that occur during the mutation
      console.error("Error updating order:", error);
    },
  });

  return mutation;
};
