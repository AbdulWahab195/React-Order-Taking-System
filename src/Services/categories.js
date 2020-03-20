import { api } from "./api";
import * as types from "../Redux/Constants/Constants";

const categories = {
  getCategories: () => {
    let options = { url: "categories" };
    options.types = [
      types.GET_CATEGORIES_SUCCESS,
      types.GET_CATEGORIES_FAILURE
    ];
    return api.get(options);
  }
};

export { categories };
