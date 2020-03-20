const account = {
  getAccount: (options, types) => dispatch => {
    const [success] = types;
    const promise = (resolve, reject) => {
      resolve(
        dispatch({
          type: success,
          payload: options
        })
      );
    };

    return new Promise(promise);
  }
};

export { account };
