import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import './MyOrders.css'

const MyOrders = () => {
  const { url, userId } = useContext(StoreContext);

  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      console.log("Customer UUID in fetchOrders:", userId);
      const response = await axios.post(url + "/api/order/userorders", {
        userId,
      });
      if (response.data && response.data.data) {
        setData(response.data.data);
        console.log("Order Data:", response.data.data);
      } else {
        console.log("No data found in response");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.slice().reverse().map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length-1) {
                    return item.name + " x" + item.quantity
                  }
                  else{
                    return item.name + " x" + item.quantity + ", "
                  }
                })}
              </p>
              <p>Rs.{order.amount}.00</p>
              <p>Items:{order.items.length}</p>
              <p><span>&#x25cf;</span><b>{order.status}</b></p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
