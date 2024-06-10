import React, { createContext, useEffect, useState } from 'react'
import { authenicateCookie } from '../services/manageUsers';


export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const noneUser = {
    username: '',
    role: ''
  };

  const [user, setUser] = useState(noneUser);

  const loginContext = (userData) => {
    setUser(userData);
  }

  const logoutContext = () => {
    setUser(noneUser);
  }
  useEffect(() => {
    authenicateUser();
  }, []);

  const authenicateUser = async () => {
    const result = await authenicateCookie();
    if (result.EC === 0) {
      if (result.DT.isauthenicated) {
        setUser(result.DT.user);
      }
      else setUser(noneUser);
    }
    else setUser(noneUser);
  }
  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  )
}
export default UserContextProvider;