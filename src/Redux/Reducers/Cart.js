import * as types from '../Constants/Constants';

const initialState = {
  cartId: 0,
  cart: {
    items_qty: 0,
    base_currency_code: '',
    items: [],
    total_segments: []
  }
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CART_ID_SUCCESS:
      return { ...state, cartId: action.payload }
    case types.GET_CART_ID_FAILURE:
      return { ...state, cartId: action.payload }
    case types.GET_CART_SUCCESS:
      return { ...state, cart: action.payload }
    case types.GET_CART_FAILURE:
      return { ...state, cart: action.payload }
    case types.DELETE_TO_CART_SUCCESS:
      return { ...state }
    case types.DELETE_TO_CART_FAILURE:
      return { ...state }
    default:
      if (action.payload !== undefined && action.payload.response !== undefined && action.payload.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      }
      return state
  }
}

export { cartReducer };
