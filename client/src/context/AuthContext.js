import React, { createContext, useReducer } from 'react';
import { AuthReducer } from '../reducers/AuthReducer.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
  });

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
}