import * as types from '../Constants/Constants';

const initialState = {
  products: [],
  product: {}
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload }
    case types.GET_PRODUCTS_FAILURE:
      return { ...state, products: action.payload }
    case types.GET_PRODUCT_SKU_SUCCESS:
      return { ...state, product: action.payload }
    case types.GET_PRODUCT_SKU_FAILURE:
      return { ...state, product: action.payload }
    case types.GET_SEARCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload.items }
    case types.GET_SEARCH_PRODUCTS_FAILURE:
      return { ...state, products: action.payload }
    default:
      return state
  }
}

export { productsReducer };
