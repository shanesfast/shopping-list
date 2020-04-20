// eslint-disable-next-line
export const ErrorReducer = (state, action) => {
  switch (action.type) {
      case 'CLEAR_ERRORS':
        return {
          msg: {},
          status: null,
          id: null
        };

      case 'GET_ERRORS':
        return {
          msg: action.payload.msg,
          status: action.payload.status,
          id: action.payload.id
        };

      default:
          return state;
  }
}