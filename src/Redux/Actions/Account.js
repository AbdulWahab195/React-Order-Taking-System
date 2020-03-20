import { api } from "../../Services/api";
import * as types from "../Constants/Constants";

export const createAccount = params => {
  let options = { url: "customers" };

  options.types = [types.CREATE_ACCOUNT_SUCCESS, types.CREATE_ACCOUNT_FAILURE];

  return api.post(options, params);
};
