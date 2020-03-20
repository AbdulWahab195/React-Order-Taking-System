import { api } from './api';
import * as types from '../Redux/Constants/Constants';

const products = {
    getProducts: (opt, id) => {
        let options = { url: `categories/${id}/products` };
        options.types = [
            types.GET_PRODUCTS_SUCCESS,
            types.GET_PRODUCTS_FAILURE
        ]
        return api.get(options);
    },
    getProductBySKU: (opt, sku) => {
        let options = { url: `products/${sku}` };
        options.types = [
            types.GET_PRODUCT_SKU_SUCCESS,
            types.GET_PRODUCT_SKU_FAILURE
        ]
        return api.get(options);
    },
    getProductAttributeOptions: (opt, attributeId) => {
        let options = { url: `products/attributes/${attributeId}/options` };
        options.types = [
            types.GET_PRODUCT_ATTRIBUTE_OPTIONS_SUCCESS,
            types.GET_PRODUCT_ATTRIBUTE_OPTIONS_FAILURE
        ]
        return api.get(options);
    },
    searchProducts: (opt, searchString) => {
        let options = { url: `products?searchCriteria[filter_groups][0][filters][0][field]=name&searchCriteria[filter_groups][0][filters][0][value]=${searchString}&searchCriteria[filter_groups][0][filters][1][field]=sku&searchCriteria[filter_groups][0][filters][1][value]=${searchString}` };
        options.types = [
            types.GET_SEARCH_PRODUCTS_SUCCESS,
            types.GET_SEARCH_PRODUCTS_FAILURE
        ]
        return api.get(options);
    },
    searchProductsFromCart: (opt, searchString) => {
        let options = { url: `products?searchCriteria[filter_groups][0][filters][0][field]=name&searchCriteria[filter_groups][0][filters][0][value]=${searchString}&searchCriteria[filter_groups][0][filters][1][field]=sku&searchCriteria[filter_groups][0][filters][1][value]=${searchString}` };
        options.types = [
            types.GET_SEARCH_PRODUCTS_FROM_CART_SUCCESS,
            types.GET_SEARCH_PRODUCTS_FROM_CART_FAILURE
        ]
        return api.get(options);
    },
    searchProductsByCategoryId: (opt, Id) => {
        let options = { url: `products?searchCriteria[filter_groups][1][filters][0][field]=category_id&searchCriteria[filter_groups][1][filters][0][value]=${Id}` };
        options.types = [
            types.GET_SEARCH_PRODUCTS_SUCCESS,
            types.GET_SEARCH_PRODUCTS_FAILURE
        ]
        return api.get(options);
    },
}

export { products };
