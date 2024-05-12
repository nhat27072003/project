
function SignupValidation(values){
    let errors = {}
    
    if(values.username === "")
        errors.username = "username không được để trống";
    else if(!/^[a-zA-Z0-9]+$/.test(values.username))
        errors.username = "username chỉ chứa kí tự và số không dùng kí tự đặc biệt";
    else 
        errors.username = "";

    if(values.email === "")
        errors.email = "email không được để trống";
    else 
        errors.email = "";

    if(values.password === "")
        errors.password = "password không được để trống";
    else if(/\s/.test(values.password))
        errors.password = "password không được chứa kí tự khoảng trắng"
    else 
        errors.password = "";
  return errors;
}

export default SignupValidation