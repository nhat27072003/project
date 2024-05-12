import React ,{ createContext, useState } from "react";

// Tạo một context
export const AuthContext = createContext();

// AuthProvider.js
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState('');

  const login = (userData) => {
    // Xử lý đăng nhập và cập nhật dữ liệu người dùng
    setUserData(userData);
  };

  const logout = () => {
    // Xử lý đăng xuất và cập nhật dữ liệu người dùng
    setUserData('');
  };

  // Trả về AuthContext.Provider với giá trị được cung cấp
  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
