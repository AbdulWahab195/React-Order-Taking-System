import * as types from "../Constants/Constants";

const initialState = {
  accounts: []
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_ACCOUNT_SUCCESS:
      return { ...state, accounts: action.payload };
    case types.CREATE_ACCOUNT_FAILURE:
      return { ...state, accounts: action.payload };
    default:
      return state;
  }
};

export { accountReducer };
