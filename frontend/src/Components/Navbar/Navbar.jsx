import React, { useContext, useState } from 'react'; // Import useState from React
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { StoreContext } from '../../context/StoreContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");
  const {getTotalCartAmount}= useContext(StoreContext);

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        <button onClick={()=>navigate('/myorders')}>My Orders</button>
      </div>
    </div>
  );
}

export default Navbar;
