import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {      const response = await axios.post('http://localhost:8080/api/user/login', null, {
        params: {
          email: email,
          password: password
        }
      });        if (!response?.data) throw new Error('Invalid credentials');
      const userData = response.data;
      
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return userData;
    } catch (error) {
      throw error;
    }
  };
  const register = async (userData) => {
    try {

      const response = await axios.post('http://localhost:8080/api/user/register', userData);
      

      if (response.status !== 200) throw new Error('Registration failed');
      const newUser = response.data;
      
      
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  const updateProfile = async (userData) => {
    try {
      const response = await axios.put('http://localhost:8080/api/user/edit', userData);
      

      if (response.data == null) throw new Error('Update failed');
      const updatedUser = response.data;
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN'?true:false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
