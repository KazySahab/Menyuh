// Frontend code (React component)
import React, { useState, useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      console.log("refreshed");
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error(error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.post(url + "/api/order/delete", { orderId });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order deleted successfully");
      } else {
        toast.error("Error deleting order");
      }
    } catch (error) {
      toast.error("Error deleting order");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order-add">
      <h3>Order Page</h3>
      <button onClick={fetchAllOrders} id="refresh_btn">Refresh</button>
      <div className="order-list">
        {orders.slice().reverse().map((order, index) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} x{item.quantity}
                    {index !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <div className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </div>
              <p className="order-item-phone">{order.address.phone} <br />{order.address.email} </p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>Rs. {order.amount}</p>
            <select
            className={
              order.status === 'Food Processing' ? 'food-processing' :
              order.status === 'Out For Delivery' ? 'out-for-delivery' :
              order.status === 'Delivered' ? 'delivered' : ''
            }
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option  value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option  value="Delivered">Delivered</option>
            </select>
            <button id="buttons" onClick={() => deleteOrder(order._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
