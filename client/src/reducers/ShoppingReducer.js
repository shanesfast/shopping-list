// eslint-disable-next-line
export const ShoppingReducer = (state, action) => {
  switch (action.type) {
      case 'GET_LIST':
        return {
          ...state, 
          items: action.list,
          loading: false
        }

      case 'ITEMS_LOADING':
        return {
          ...state, 
          loading: true
        };

      case 'REMOVE_ITEM':
        return {
          ...state, 
          items: state.items.filter(item => item._id !== action._id)
        };

      case 'UPDATE_LIST':
        return {
          ...state,
          items: [...state.items, action.item]
        };

      default:
          return state;
  }
}
