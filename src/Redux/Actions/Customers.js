import { api } from "../../Services/api";
import { customers } from "../../Services/customers";
import * as types from "../Constants/Constants";

export const getCustomers = value => {
  let options = {
    url: `customers/search?searchCriteria[filterGroups][0][filters][0][field]=firstname&searchCriteria[filterGroups][0][filters][0][value]=%25${value}%25&searchCriteria[filterGroups][0][filters][0][condition_type]=like`
  };

  options.types = [types.GET_CUSTOMERS_SUCCESS, types.GET_CUSTOMERS_FAILURE];

  return api.get(options);
};

export const addAddress = (obj, customerId) => {
  let options = {
    url: `customers/${customerId}`
  };

  options.types = [types.GET_CUSTOMERS_SUCCESS, types.GET_CUSTOMERS_FAILURE];

  return api.put(options, obj);
}

export const storeCustomerIdToRedux = Id => {
  const options = {
    types: [types.GET_CUSTOMER_ID_SUCCESS, types.GET_CUSTOMER_ID_FAILURE],
    Id
  };
  return customers.saveCustomerIdToRedux(options);
};
