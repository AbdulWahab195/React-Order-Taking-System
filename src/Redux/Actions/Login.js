import { api } from './../../Services/api';
import { authorization } from '../../Services/auth';
import * as types from '../Constants/Constants';

export const login = params => {
  let options = { ...params };
  options.types = [
    types.LOGIN_SUCCESS,
    types.LOGIN_FAILURE
  ]

  return authorization.login(options);
};

export const logout = () => {
  return authorization.logout();
}

export const updateToken = params => {
  let options = { url: `integration/admin/token` };
  options.types = [
    types.TOKEN_GENERATION_SUCCESS,
    types.TOKEN_GENERATION_FAILURE
  ]
  return api.post(options, {
    "username": "admin",
    "password": "admin123"
  });
};