import React, { useState } from 'react';
import axios from 'axios';
import './CSS/Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import SignupValidation from './SignupValidation';
import { signupUser } from '../services/manageUsers';

const Signup = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error when user starts typing
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = SignupValidation(values);
    setErrors(validationErrors);

    if (Object.values(validationErrors).every((error) => error === '')) {
      const res = await signupUser(values);
      if (res.EC === 0) {
        alert('Đăng ký tài khoản thành công');
        navigate('/login');
      } else {
        alert('User đã tồn tại');
      }
    }
  };

  return (
    <div className="signup">
      <div className="wrapper">
        <div className="title">Sign up Form</div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input type="text" required onChange={handleInput} name="username" />
            {errors.username && <span>{errors.username}</span>}
            <label>User name</label>
          </div>
          <div className="field">
            <input type="text" required onChange={handleInput} name="email" />
            {errors.email && <span>{errors.email}</span>}
            <label>Email Address</label>
          </div>
          <div className="field">
            <input type="password" required onChange={handleInput} name="password" />
            {errors.password && <span>{errors.password}</span>}
            <label>Password</label>
          </div>
          <div className="field">
            <button type="submit">Sign up</button>
          </div>
          <div className="signup-link">
            You have account?
            <Link to="/login" style={{ textDecoration: 'none', color: '#4158d0' }}> Login Now?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
