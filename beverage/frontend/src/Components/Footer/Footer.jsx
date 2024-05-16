/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Footer.css'
import logo from '../Assets/logo.png'

const Footer = () => {
    return (
        <footer>
            <div class="content">
                <div class="top">
                    <div class="logo">
                        <img src={logo} alt="" />
                        <span class="logo-name">Green Flavor</span>
                    </div>
                    <div class="media">
                        <a href="#"><i class='bx bxl-facebook' ></i></a>
                        <a href="#"><i class='bx bxl-twitter' ></i></a>
                        <a href="#"><i class='bx bxl-instagram-alt' ></i></a>
                        <a href="#"><i class='bx bxl-tiktok' ></i></a>
                    </div>
                </div>
                <div class="link-boxes">
                    <div class="box">
                        <ul>
                            <li class="link-name">Company</li>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Get started</a></li>
                        </ul>
                    </div>
                    <div class="box">
                        <ul>
                            <li class="link-name">services</li>
                            <li><a href="#">App design</a></li>
                            <li><a href="#">Web Design</a></li>
                            <li><a href="#">Logo Design</a></li>
                            <li><a href="#">Banner Design</a></li>
                        </ul>
                    </div>
                    <div class="box">
                        <ul>
                            <li class="link-name">Account</li>
                            <li><a href="#">Profile</a></li>
                            <li><a href="#">My account</a></li>
                            <li><a href="#">Preference</a></li>
                            <li><a href="#">Purchase</a></li>
                        </ul>
                    </div>
                    <div class="box">
                        <ul>
                            <li class="link-name">Courses</li>
                            <li><a href="#">HTML & CSS</a></li>
                            <li><a href="#">Javascript</a></li>
                            <li><a href="#">React js</a></li>
                            <li><a href="#">NODE js</a></li>
                        </ul>
                    </div>
                    <div class="box input-box">
                        <ul>
                            <li class="link-name">Subcribe</li>
                            <li><input type="text" placeholder="Enter your Email" /></li>
                            <li><input type="button" value="subcribe" /></li>
                        </ul>
                    </div>
                </div>
            </div >
        </footer >
    )
}

export default Footer