import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";





const PlaceOrder = ({}) => {
  const navigate = useNavigate();
  const { getTotalCartAmount, food_list, cartItems, url, userId} =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userId,
  });

  console.log(userId);
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
        console.log(orderItems);
      }
    });
    let orderData = {
      userId:userId,
      address:data,
      items: orderItems,
      amount: getTotalCartAmount(),
    };
    let response = await axios.post(url + "/api/order/place", orderData);
    if (response.data.success) {
      setData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
      toast.success(response.data.message);
      setTimeout(() => {
        navigate('/myorders');
      }, 2000);
    } else {
      toast.error(response.data.message);
    }
    
    
 
  };
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Order Information</p>
        <div className="multi-fields">
          <input
            required
            id="firstName"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            id="lastName"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          id="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          id="phone"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone Number"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs. {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs. {0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs. {getTotalCartAmount()}</b>
            </div>
          </div>
          <button type="submit">Place Order</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
