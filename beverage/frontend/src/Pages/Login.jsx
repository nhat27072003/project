import React, { useContext, useState, useEffect } from 'react';
import './CSS/Login.css';
import LoginValidation from './LoginValidation';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { ShopContext } from '../Context/ShopContext';
import { loginUser } from '../services/manageUsers';
import { UserContext } from '../Context/UserContext';

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  const { user, loginContext, getCart } = useContext(UserContext);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const validationErrors = LoginValidation(values);
    setErrors(validationErrors);

    // Kiểm tra lỗi sau khi cập nhật errors
    if (Object.values(validationErrors).every((error) => error === '')) {
      const result = await loginUser(values);
      if (result.EC === 0) {
        loginContext({ username: result.DT.username, role: result.DT.role, userId: result.DT.userId });
        navigate('/');
        getCart();
      }
      else {
        alert("username hoặc mật khẩu không đúng");
      }
    }
  }
  return (
    <div className="login">
      <div className="wrapper">
        <div className="title">Login Form</div>
        <form onSubmit=''>
          <div className="field">
            <input type="text" required onChange={handleInput} name='username' />
            {errors.username && <span>{errors.username}</span>}
            <label>User name</label>
          </div>
          <div className="field">
            <input type="password" required onChange={handleInput} name='password' />
            {errors.password && <span>{errors.password}</span>}
            <label>Password</label>
          </div>
          <div className="pass-link"><a href="#">Forgot Password</a></div>
          <div className="field">
            <button type="submit" onClick={submitForm}>Login</button>
          </div>
          <div className="signup-link">
            Not a member?
            <Link to="/signup" style={{ textDecoration: "none", color: "#4158d0" }}> Signup Now?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Login;
