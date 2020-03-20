import { combineReducers } from "redux";
import { loadingReducer } from "./Loading";
import { authReducer } from "./Login";
import { productsReducer } from "./Products";
import { cartReducer } from "./Cart";
import { categoriesReducer } from "./Categories";
import { customersReducer } from "./Customers";
import { accountReducer } from "./Account";

export default combineReducers({
  loadingReducer,
  authReducer,
  productsReducer,
  cartReducer,
  categoriesReducer,
  customersReducer,
  accountReducer
});
