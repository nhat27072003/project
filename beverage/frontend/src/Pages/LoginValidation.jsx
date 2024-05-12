const LoginValidation = (values) => {
    let error = {}
    
    if(values.username === "")
        error.username = "Email không được để trống";
    else if(!/^[a-zA-Z0-9]+$/.test(values.username))
        error.username = "Username chỉ chứa kí tự và số không dùng kí tự đặc biệt"
    else 
        error.username = "";

    if(values.password === "")
        error.password = "Password không được để trống";
    else if(/\s/.test(values.password))
        error.password = "Password không được chứa kí tự khoảng trắng"
    else 
        error.password = "";
  return error;
}

export default LoginValidation