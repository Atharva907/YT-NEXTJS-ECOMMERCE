import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authReducer } from '@/store/reducer/authReducer';
import { useSelector } from 'react-redux';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const auth = useSelector(state => state.auth);

  return (
    <AuthContext.Provider value={{ auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
