import React, { createContext, useReducer } from 'react';
import { ErrorReducer } from '../reducers/ErrorReducer.js';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errorState, dispatch] = useReducer(ErrorReducer, {
    msg: {},
    status: null,
    id: null
  });

  return (
    <ErrorContext.Provider value={{errorState, dispatch}}>
      {children}
    </ErrorContext.Provider>
  );
}