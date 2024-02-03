import React from 'react'
import './Footer.css'
import logo from '../Assets/logo.png'
import facebook_icon from '../Assets/facebook_icon.png'
import instagram_icon from '../Assets/instagram_icon.png'
import tiktok_icon from '../Assets/tiktok_icon.png'
const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={logo} alt=''/>
            <p>Green Flavor</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Officers</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icon-container">
                <img src={facebook_icon} alt=''/>
            </div>
            <div className="footer-icon-container">
                <img src={instagram_icon} alt=''/>
            </div>
            <div className="footer-icon-container">
                <img src={tiktok_icon} alt=''/>
            </div>
        </div>
        <div className="footer-copyright">
            <hr/>
            <p>Copyright @ 2023 - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer