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
      <ul className="navbar-menu">
        <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</li>
        <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
        <li onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</li> 
        <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact-us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        <button onClick={()=>navigate('/myorders')}>My Order</button>
      </div>
    </div>
  );
}

export default Navbar;
