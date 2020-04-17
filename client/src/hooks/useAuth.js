import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useError from './useError';

import axios from 'axios';

const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { returnErrors } = useError();

  // Check token and load User
  function loadUser() {
    // User loading
    dispatch({ type: 'USER_LOADING' });

    // Get token from state (which is from localStorage)
    const token = state.token;

    // Headers
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }

    // Add token to headers if it's there
    if (token) config.headers['x-auth-token'] = token;

    axios.get('/api/auth/user', config)
    .then(res => dispatch({
      type: 'USER_LOADED',
      payload: res.data
    }))
    .catch(err => { 
      returnErrors(err.response.data, err.response.status);
      dispatch({ type: 'AUTH_ERROR' }); 
    });
  }

  return {
    loadUser
  }
};

export default useAuth;