import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = ({ phoneNumber }) => {
  const [orders, setOrders] = useState([]);
    console.log(phoneNumber);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post("/api/order/userorders", {
          phone: 9845334595,
        });
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (phoneNumber) {
      fetchOrders();
    }
  }, [phoneNumber]);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Order ID: {order._id}</p>
              {/* Display other order details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
