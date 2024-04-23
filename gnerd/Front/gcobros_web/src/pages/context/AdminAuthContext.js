import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        checkTokenValidity(token);
      } else {
        console.log('No token found in local storage.');
      }
    }
  }, []);

  const checkTokenValidity = (token) => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(jwtDecode(token));
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem('token');
          setUser(null);
        } else {
          console.log(decoded);
          setUser({
            id: decoded.id,
            email: decoded.email,
            name: decoded.name
          });
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
