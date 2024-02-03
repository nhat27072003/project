import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './CSS/Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import SignupValidation from './SignupValidation'
const Signup = () => {
  const [values,setValues] = useState({
    username: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({...prev,[event.target.name]: event.target.value}));
    console.log(values);
  }

  useEffect(() => {
    setErrors(SignupValidation(values));
  }, [values]);

  const handleSubmit = async (event) =>{
    event.preventDefault();
    setErrors(SignupValidation(values));
    if(errors.username === "" && errors.email ==="" && errors.password ===""){
      await axios.post('http://localhost:8081/sign', values)
      .then(res => {
        console.log(res.data);
        if(res.data.success){
          alert("Đăng ký tài khoản thành công");
          navigate('/login');
        }
        else alert("User đã tồn tại");
      })
  }
}
  return (
    <div className='signup'>
      <div className="signup-container">
        <h1>Đăng ký</h1>
        <form action="">
          <div className="signup-fields">
            <div className="bt">
              <input type="text" onChange={handleInput} placeholder='Username' name='username'/>
              {errors.username && <span>{errors.username}</span>}
            </div>
            <div className="bt">
              <input type="email" onChange={handleInput} placeholder='Emai Address' name='email'/>
              {errors.email && <span>{errors.email}</span>}
            </div>
            <div className="bt">
              <input type="password" onChange={handleInput} placeholder='Password' name='password'/>
              {errors.password && <span>{errors.password}</span>}
            </div>
          </div>
          <button onClick={handleSubmit}>Đăng ký</button>
          <p className="signup-signup">Bạn đã có tài khoản? <Link style={{textDecoration:"none"}} to='/login'><span>Đăng Nhập</span></Link></p>   
        </form>
      </div>
    </div>
  )
}

export default Signup