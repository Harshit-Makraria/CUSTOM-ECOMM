"use client";
import { useState } from "react";

const StatusUpdateForm = () => {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [message, setMessage] = useState("");
  const [adminDetails] = useState({ name: "Admin123", role: "Admin" }); // Simulated admin details
  const [notification, setNotification] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Log admin details with timestamp
    const timestamp = new Date().toLocaleString();
    console.log(
      `Status updated by ${adminDetails.name} (${adminDetails.role}) at ${timestamp}:`,
      { orderId, status }
    );

    // Send the status update to the server
    const response = await fetch("/api/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, status }),
    });

    const data = await response.json();
    setMessage(data.message);

    // Set notification
    setNotification(`Status for Order ID ${orderId} updated to ${status}.`);
    setTimeout(() => setNotification(""), 5000); // Clear notification after 5 seconds
  };

  return (
    <div>
      <h2>Update Order Status</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Order ID:
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="PENDING">Pending</option>
            <option value="DISPATCHED">Dispatched</option>
            <option value="IN_TRANSIT">In Transit</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </label>
        <button type="submit">Update Status</button>
      </form>
      {notification && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#d1e7dd",
            color: "#0f5132",
            borderRadius: "4px",
            border: "1px solid #badbcc",
          }}
        >
          {notification}
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default StatusUpdateForm;
