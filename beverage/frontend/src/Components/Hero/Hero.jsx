import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero.png'
const Hero = () => {
    const handleScrollDown = () => {
      const targetElement = document.getElementById('newscroll'); // Thay 'targetElementId' bằng ID của phần tử bạn muốn cuộn đến
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' }); // Cuộn mềm dần với hiệu ứng smooth
      }
    }
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Đặt đồ uống dễ dàng</h2>
        <div>
          <div className="hand-icon">
            <p>tiện lợi</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>cho tất cả mọi người</p>
        </div> 
        <button className="hero-latest-btn" onClick={handleScrollDown}>
          <div>Sản phẩm mới</div>
          <img src={arrow_icon} alt=""/>
        </button>    
      </div>
      <div className="hero-right">
        <img src={hero_image} alt=''/>
      </div>
    </div>
  )
}

export default Hero