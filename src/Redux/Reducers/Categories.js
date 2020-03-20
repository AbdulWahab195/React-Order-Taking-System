import * as types from '../Constants/Constants';
import { logout } from './../Actions/Login';
const initialState = {
  categories: []
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORIES_SUCCESS:
      return { ...state, categories: [action.payload] }
    case types.GET_CATEGORIES_FAILURE:
      if (action.payload !== undefined && action.payload.response !== undefined && action.payload.response.status === 401) {
        localStorage.clear();
        logout();
        return;
      } else {
        return { ...state, categories: action.payload } 
      }
    default:
      if (action.payload !== undefined && action.payload.response !== undefined && action.payload.response.status === 401) {
        localStorage.clear();
        logout();
        return
      } 
      else {
        return state
      }
  }
}

export { categoriesReducer };
