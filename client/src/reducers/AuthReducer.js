// eslint-disable-next-line
export const AuthReducer = (state, action) => {
  switch (action.type) {
      case 'USER_LOADING':
        return {
          ...state,
          isLoading: true
        };

      case 'USER_LOADED':
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.user
        };

      case 'LOGIN_SUCCESS':
      case 'REGISTER_SUCCESS':
          return {
            ...state, 
            ...action.paylod,
            isAuthenticated: true,
            isLoading: false
          };

      case 'AUTH_ERROR':
      case 'LOGIN_FAIL':
      case 'LOGOUT_SUCCESS':
      case 'REGISTER_FAIL':
          localStorage.removeItem('token');
          
          return {
            ...state, 
            token: null,
            user: null, 
            isAuthenticated: false,
            isLoading: false
          };

      default:
          return state;
  }
}