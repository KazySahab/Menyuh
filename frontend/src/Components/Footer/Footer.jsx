import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <img src={assets.logo} alt="" />
            <p>Online Food Ordering System By Menyuh</p>
        </div>
      
    </div>
  )
}

export default Footer
