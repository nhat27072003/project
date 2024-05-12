import React from 'react'
import './Breadcrum.css'
import breadcrum_icon from '../Assets/breadcrum_arrow.png'
const Breadcrum = (props) => {
    const {product} = props;
    const category=product.category;
    let check;
    if(category==="tra-sua")
        check="trà sữa";
    else if(category==="cafe")
        check="cà phê"
    else check="Nước giải khát"
    return (
    <div className="breadcrum">
        HOME <img src={breadcrum_icon} alt=''/> SHOP <img src={breadcrum_icon} alt="" /> {check} <img src={breadcrum_icon} alt="" /> {product?.name}
    </div>
  )
}

export default Breadcrum