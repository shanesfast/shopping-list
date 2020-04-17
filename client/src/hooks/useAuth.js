import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useError from './useError';

import axios from 'axios';

const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated } = state;
  const { returnErrors } = useError();

  // Check token and load User
  function loadUser() {
    // User loading
    dispatch({ type: 'USER_LOADING' });

    axios.get('/api/auth/user', tokenConfig())
    .then(res => { 
      console.log(res.data);
      dispatch({
      type: 'USER_LOADED',
      payload: res.data
    })}
    )
    .catch(err => { 
      returnErrors(err.response.data, err.response.status);
      dispatch({ type: 'AUTH_ERROR' }); 
    });
  }

  // Register new user
  function register({ name, email, password }) {
    // Headers
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }

    // Request Body
    const body = JSON.stringify({ name, email, password });

    axios.post('api/users', body, config)
    .then(res => {
      console.log(res.data);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
    })
    .catch(err => {
      returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL');
      dispatch({ type: 'REGISTER_FAIL' });
    });
  }

  // Setup config/headers and token
  function tokenConfig() {
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

    return config;
  }

  return {
    isAuthenticated,
    loadUser,
    register,
    tokenConfig
  }
};

export default useAuth;