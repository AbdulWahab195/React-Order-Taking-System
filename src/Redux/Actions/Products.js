import { products } from '../../Services/products';
import * as types from '../Constants/Constants';

export const getProducts = params => {
  let options = { ...params };
  options.types = [
    types.GET_PRODUCTS_SUCCESS,
    types.GET_PRODUCTS_FAILURE
  ]

  return products.getProducts(options, params)
};

export const getProductBySKU = (params) => {
  let options = { ...params };
  options.types = [
    types.GET_PRODUCT_SKU_SUCCESS,
    types.GET_PRODUCT_SKU_FAILURE
  ]

  return products.getProductBySKU(options, params)
};

export const searchProducts = (params) => {
  let options = { ...params };
  options.types = [
    types.GET_SEARCH_PRODUCTS_SUCCESS,
    types.GET_SEARCH_PRODUCTS_FAILURE
  ]

  return products.searchProducts(options, params)
};

export const searchProductsFromCart = (params) => {
  let options = { ...params };
  options.types = [
    types.GET_SEARCH_PRODUCTS_FROM_CART_SUCCESS,
    types.GET_SEARCH_PRODUCTS_FROM_CART_FAILURE
  ]

  return products.searchProductsFromCart(options, params)
};

export const searchProductsByCategoryId = (params) => {
  let options = { ...params };
  options.types = [
    types.GET_SEARCH_PRODUCTS_SUCCESS,
    types.GET_SEARCH_PRODUCTS_FAILURE
  ]

  return products.searchProductsByCategoryId(options, params)
};

export const getProductAttributeOptions = (params) => {
  let options = { ...params };
  options.types = [
    types.GET_PRODUCT_ATTRIBUTE_OPTIONS_SUCCESS,
    types.GET_PRODUCT_ATTRIBUTE_OPTIONS_FAILURE
  ]

  return products.getProductAttributeOptions(options, params)
};