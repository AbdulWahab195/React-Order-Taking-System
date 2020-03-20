import { api } from './api';
import * as types from '../Redux/Constants/Constants';
import firebase from 'firebase/app';
import 'firebase/auth';
import { config } from '../config';
firebase.initializeApp(config);

const AUTH = firebase.auth();

const loading = () => ({ type: 'LOADING' });
const loading_complete = () => ({ type: 'LOADING_COMPLETE' });

const authorization = {
  login: options => async dispatch => {
    dispatch(loading());
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      return AUTH.signInWithEmailAndPassword(options.email, options.password)
        .then(user => {
          dispatch(loading_complete());
          localStorage.setItem('userEmail', user.user.email);
          resolve(dispatch({
            type: success,
            payload: user.user.email
          }))
        })
        .catch(err => {
          dispatch(loading_complete());
          reject(dispatch({
            type: failure,
            payload: err.message
          }))
        });
    }

    return new Promise(promise);
  },
  logout: () => async dispatch => {
    dispatch(loading());
    const promise = (resolve, reject) => {
      AUTH.signOut()
        .then(res => {
          dispatch(loading_complete());
          localStorage.clear('userEmail');
          resolve(res);
        })
        .catch(err => {
          dispatch(loading_complete);
          reject(err);
        });
    }

    return new Promise(promise);
  },
  updateToken: (options) => async dispatch => {
    let options = { url: `integration/admin/token` };
    options.types = [
      types.TOKEN_GENERATION_SUCCESS,
      types.TOKEN_GENERATION_FAILURE
    ]
    return api.post(options, {
      "username": "admin",
      "password": "admin123"
    });
  }
}

export { authorization };
