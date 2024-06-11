import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from '../../context/StoreContext';

const MyOrders = () => {
  const { url, customerUUID, } = useContext(StoreContext); // Access phone number from context
  
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      console.log("Customer UUID in fetchOrders:", customerUUID);
      const response = await axios.post(url + "/api/order/userorders", { customerUUID });
      setOrders(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    if (customerUUID) {
      fetchOrders();
    }
  }, [customerUUID]);

  return (
    <div>
    </div>
  );
};

export default MyOrders;
