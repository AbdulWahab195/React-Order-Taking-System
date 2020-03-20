import { categories } from '../../Services/categories';
import * as types from '../Constants/Constants';

export const getCategories = params => {
  let options = { ...params };
  options.types = [
    types.GET_CATEGORIES_SUCCESS,
    types.GET_CATEGORIES_FAILURE
  ]

  return categories.getCategories(options)
};