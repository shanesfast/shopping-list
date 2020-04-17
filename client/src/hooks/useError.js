import { useContext } from 'react';
import { ErrorContext } from "../context/ErrorContext";

const useError = () => {
  const { dispatch } = useContext(ErrorContext);

  // RETURN ERRORS
  function returnErrors(msg, status, id = null) {
    dispatch({
      type: 'GET_ERRORS',
      payload: { msg, status, id }
    });
  }

  // CLEAR ERRORS
  function clearErrors() {
    dispatch({ type: 'CLEAR_ERRORS' });
  }

  return {
    clearErrors,
    returnErrors
  }
};

export default useError;