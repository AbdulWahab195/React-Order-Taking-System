import * as types from '../Constants/Constants';

const initialState = {
  email: '',
  error: '',
  token: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, email: action.payload }
    case types.LOGIN_FAILURE:
      return { ...state, error: action.payload }
    case types.TOKEN_GENERATION_SUCCESS:
      return { ...state, token: action.payload }
    case types.TOKEN_GENERATION_FAILURE:
      return { ...state, token: action.payload }
    default:
      return state
  }
}

export { authReducer };
