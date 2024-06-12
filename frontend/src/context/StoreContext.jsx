import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { v4 as uuidv4 } from "uuid";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:4000";
  const [userId, setUserId] = useState(() => {
    let uuid = localStorage.getItem("userId");
    if (!uuid) {
      uuid = uuidv4();
     
      localStorage.setItem("userId", uuid);
    }
    return uuid;
  });
  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (itemId) => {
    try {
      // Update the local state cartItems
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
      console.log("Adding to cart:", { itemId, userId });
      // Make API request to update user's cart in the database
      if (userId) {
        const response = await axios.post(url + "/api/cart/add", { itemId, userId });
        console.log("Server response:", response.data);
      }
    } catch (error) {
      console.log("Error adding to cart:", error);
      // Handle error
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}));
    if(userId){
      const response = await axios.post(url + "/api/cart/remove", { itemId, userId });
        console.log("Server response:", response.data);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  const fetchCartData = async () => {
    try {
      const response = await axios.post(url + "/api/cart/get", { userId });
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const createUserIfNotExists = async () => {
    try {
      const response = await axios.post(`${url}/api/user/login`, { userId });
      console.log(response.data); // Handle the response from the server
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      if(localStorage.getItem("userId"))
        {
          await fetchCartData();
        }
    };
    loadData();
  }, []);

  createUserIfNotExists();

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    userId,
    setUserId
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
