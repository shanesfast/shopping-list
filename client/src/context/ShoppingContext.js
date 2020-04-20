import React, { createContext, useEffect, useReducer } from 'react';
import { ShoppingReducer } from '../reducers/ShoppingReducer';
import useError from '../hooks/useError';

import axios from 'axios';

export const ShoppingContext = createContext();

export const ShoppingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ShoppingReducer, {
    items: [],
    loading: false,
  });

  const { returnErrors } = useError();

  useEffect(() => {
    const getItems = () => {
      dispatch({ type: 'ITEMS_LOADING' });
      axios.get('/api/items')
      .then(res => dispatch({ type: 'GET_LIST', list: res.data }))
      .catch(err => returnErrors(err.response.data, err.response.status));
    }

    getItems();
    // eslint-disable-next-line
  }, []);

  return (
    <ShoppingContext.Provider value={{state, dispatch}}>
      {children}
    </ShoppingContext.Provider>
  );
}
