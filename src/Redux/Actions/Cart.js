import { api } from './../../Services/api';
import * as types from '../Constants/Constants';

export const getCartIdFromCustomerId = params => {
  let options = { url: `customers/${params}/carts` };
  options.types = [
    types.GET_CART_ID_SUCCESS,
    types.GET_CART_ID_FAILURE
  ]
  return api.post(options);
};

export const addToCart = (params, obj) => {
  let options = { url: `carts/${params}/items` };
  options.types = [
    types.ADD_TO_CART_SUCCESS,
    types.ADD_TO_CART_FAILURE
  ]
  return api.post(options, obj);
}

export const getCartItems = params => {
  let options = { url: `carts/${params}/totals` };
  options.types = [
    types.GET_CART_SUCCESS,
    types.GET_CART_FAILURE
  ]
  return api.get(options);
}

export const deleteItemFromCart = (cartId, itemId) => {
  let options = { url: `carts/${cartId}/items/${itemId}` };
  options.types = [
    types.DELETE_TO_CART_SUCCESS,
    types.DELETE_TO_CART_FAILURE
  ]
  return api.delete(options);
}

export const getAttributeFromAttributeId = (attributeId) => {
  let options = { url: `products/attributes/${attributeId}` };
  options.types = [
    types.DELETE_TO_CART_SUCCESS,
    types.DELETE_TO_CART_FAILURE
  ]
  return api.get(options);
}