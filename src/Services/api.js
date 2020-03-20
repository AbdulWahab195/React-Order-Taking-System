import axios from "axios";

const instance = axios.create({
  baseURL: 'http://54.67.47.199/rest/V1/'
});

const loading = () => ({ type: "LOADING" });
const select_loading = () => ({ type: "SELECT_LOADING" });
const loading_complete = () => ({ type: "LOADING_COMPLETE" });

const api = {
  get: (options, select = null, noLoading = false) => async dispatch => {
    if (!noLoading) {
      if (select) {
        dispatch(select_loading());
      } else {
        dispatch(loading());
      }
    }
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      return instance.get(options.url, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(res => {
          if (!noLoading) {
            dispatch(loading_complete());
          }
          resolve(
            dispatch({
              type: success,
              payload: res.data
            })
          );
        })
        .catch(err => {
          if (!noLoading) {
            dispatch(loading_complete());
          }
          reject(
            dispatch({
              type: failure,
              payload: err
            })
          );
        });
    };

    return new Promise(promise);
  },
  post: (options, params = null) => async dispatch => {
    dispatch(loading());
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      instance.post(options.url, params, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(res => {
          dispatch(loading_complete());
          resolve(
            dispatch({
              type: success,
              payload: res.data
            })
          );
        })
        .catch(err => {
          dispatch(loading_complete());
          reject(
            dispatch({
              type: failure,
              payload: err
            })
          );
        });
    };

    return new Promise(promise);
  },
  put: (options, params = null, noLoading = false) => async dispatch => {
    if (!noLoading) {
      dispatch(loading());
    }
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      instance
        .put(options.url, params, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          }
        })
        .then(res => {
          if (!noLoading) {
            dispatch(loading_complete());
          }
          resolve(
            dispatch({
              type: success,
              payload: res.data
            })
          );
        })
        .catch(err => {
          if (!noLoading) {
            dispatch(loading_complete());
          }
          reject(
            dispatch({
              type: failure,
              payload: err
            })
          );
        });
    };

    return new Promise(promise);
  },
  delete: options => async dispatch => {
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      instance
        .delete(options.url, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          }
        })
        .then(res => {
          dispatch(loading_complete());
          resolve(
            dispatch({
              type: success,
              payload: res.data
            })
          );
        })
        .catch(err => {
          dispatch(loading_complete());
          reject(
            dispatch({
              type: failure,
              payload: err
            })
          );
        });
    };

    return new Promise(promise);
  }
};

export { api };
