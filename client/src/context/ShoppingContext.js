import React, { createContext, useEffect, useReducer } from 'react';
import { ShoppingReducer } from '../reducers/ShoppingReducer.js';

import axios from 'axios';

export const ShoppingContext = createContext();

export const ShoppingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ShoppingReducer, {
    items: [],
    loading: false,
  });

  useEffect(() => {
    const getItems = () => {
      dispatch({ type: 'ITEMS_LOADING' });
      axios.get('/api/items').then(res => dispatch({ type: 'GET_LIST', list: res.data }))
    }

    getItems();
  }, []);

  return (
    <ShoppingContext.Provider value={{state, dispatch}}>
      {children}
    </ShoppingContext.Provider>
  );
}
