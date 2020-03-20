import * as types from '../Constants/Constants';

const initialState = {
  customers: [],
  customerId: 0
};

const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    // 
    case types.GET_CUSTOMERS_SUCCESS:
      return { ...state, customers: action.payload.items }
    case types.GET_CUSTOMERS_FAILURE:
      return { ...state, customers: action.payload }
    case types.GET_CUSTOMER_ID_SUCCESS:
      return { ...state, customerId: action.payload }
    case types.GET_CUSTOMER_ID_FAILURE:
      return { ...state, customerId: action.payload }
    default:
      return state
  }
}

export { customersReducer };
