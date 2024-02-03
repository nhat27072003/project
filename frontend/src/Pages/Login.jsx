
/*import React, { useContext, useState } from 'react'
import './CSS/Login.css'
import LoginValidation from './LoginValidation'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthProvider'


const Login = () => {
  const [values,setValues] = useState({
    username: "",
    password: ""
  })
  const { userData, login, logout } = useContext(AuthContext);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [errLogin, setErrLogin] = useState([]);
  const handleInput = async (event) => {
    await setValues(prev => ({...prev,[event.target.name]: event.target.value}));
    console.log(values);
  }
  const handleSubmit = async (event) =>{
    event.preventDefault();
    setErrors(LoginValidation(values));
    if(errors.username === "" && errors.password ===""){
      console.log(values);
      axios.post('http://localhost:8081/login', values)
      .then(res => {
        console.log(res.data)
        if(res.data.errors){
          setErrLogin(res.data.errors);
        }
        else {
          if(res.data === "success" && values.username==="admin"){
            login('admin');
            navigate('/');
            console.log(values.username)
          }
          else if(res.data === "success"){
            login('user');
            navigate('/');
          }
          else {
            login('');
            alert("No record existed!");
          }
        }
    }).catch(err => console.log(err));
  }
}
  return (
    <div className='login'>
      <div className="login-container">
        <h1>Đăng nhập</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="login-fields">
            <div className='bt'>
              <input type="text" onChange={handleInput} placeholder='Username' name='username'/>  
              {errors.username && <span>{errors.username}</span>}
            </div>
            <div className="bt">
              <input type="password" onChange={handleInput} placeholder='Password' name='password'/>
              {errors.password && <span>{errors.password}</span>}
            </div>
          </div>
          <button type="submit">Đăng nhập</button>
          <p className="login-login">Bạn chưa có tài khoản? <Link style={{textDecoration:"none"}} to='/signup'><span>Đăng ký</span></Link></p>
        </form>
      </div>
    </div>
  )
}

export default 
*/
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
  const [errLogin, setErrLogin] = useState([]);
  const {getCart} = useContext(ShopContext);
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setErrors(LoginValidation(values));
  }, [values]);

  const submitForm = async () => {
    if (errors.username === "" && errors.password === "") {
      await axios.post('http://localhost:8081/login', values)
        .then(res => {
          console.log(values);
          //if (res.data.errors) {
          //  setErrLogin(res.data.errors);
          //} else {
            if (res.data.success  && values.username === "admin") {
              login('admin');
              navigate('/');
              getCart();
              console.log(values.username);
            } else if (res.data.success) {
              login(values.username);
              navigate('/');
              //updateTotal();
            } else {
              login('');
              alert("username và mật khẩu không đúng");
            }
          }
        ).catch(err => console.log(err));
    }
  };

  return (
    <div className='login'>
      <div className="login-container">
        <h1>Đăng nhập</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-fields">
            <div className='bt'>
              <input type="text" onChange={handleInput} placeholder='Username' name='username' />
              {errors.username && <span>{errors.username}</span>}
            </div>
            <div className="bt">
              <input type="password" onChange={handleInput} placeholder='Password' name='password' />
              {errors.password && <span>{errors.password}</span>}
            </div>
          </div>
          <button type="submit" onClick={submitForm}>Đăng nhập</button>
          <p className="login-login">Bạn chưa có tài khoản? <Link style={{ textDecoration: "none" }} to='/signup'><span>Đăng ký</span></Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
