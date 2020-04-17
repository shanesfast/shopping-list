import React, { createContext, useReducer } from 'react';
import { ErrorReducer } from '../reducers/ErrorReducer.js';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ErrorReducer, {
    msg: {},
    status: null,
    id: null
  });

  return (
    <ErrorContext.Provider value={{state, dispatch}}>
      {children}
    </ErrorContext.Provider>
  );
}