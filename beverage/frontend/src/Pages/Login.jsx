import React, { useContext, useState, useEffect } from 'react';
import './CSS/Login.css';
import LoginValidation from './LoginValidation';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { ShopContext } from '../Context/ShopContext';

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  const { userData, login, logout } = useContext(AuthContext);
  //const {updateTotal} = useContext(ShopContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { getCart } = useContext(ShopContext);
  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // const submitForm = async () => {
  //   setErrors(LoginValidation(values));
  //   if (errors.username === "" && errors.password === "") {
  //     await axios.post('http://localhost:8081/login', values)
  //       .then(res => {
  //         console.log(values);
  //         //if (res.data.errors) {
  //         //  setErrLogin(res.data.errors);
  //         //} else {
  //           if (res.data.success  && values.username === "admin") {
  //             login('admin');
  //             navigate('/');
  //             getCart();
  //             console.log(values.username);
  //           } else if (res.data.success) {
  //             login(values.username);
  //             navigate('/');
  //             //updateTotal();
  //           } else {
  //             login('');
  //             alert("username và mật khẩu không đúng");
  //           }
  //         }
  //       ).catch(err => console.log(err));
  //   }

  // };
  const submitForm = async (event) => {
    event.preventDefault();
    const validationErrors = LoginValidation(values);
    setErrors(validationErrors);

    // Kiểm tra lỗi sau khi cập nhật errors
    if (Object.values(validationErrors).every((error) => error === '')) {
      await axios.post('http://localhost:8081/login', values)
        .then(res => {
          console.log(values);
          if (res.data.success && values.username === "admin") {
            login('admin');
            navigate('/');
            getCart();
            console.log(values.username);
          } else if (res.data.success) {
            login(values.username);
            navigate('/');
          } else {
            login('');
            alert("username và mật khẩu không đúng");
          }
        })
        .catch(err => console.log(err));
    }
  };
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
