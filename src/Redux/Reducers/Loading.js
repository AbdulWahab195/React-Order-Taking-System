import * as types from '../Constants/Constants';

const initialState = {
  loading: false
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: true }
    case types.LOADING_COMPLETE:
      return { ...state, loading: false }
    default:
      return state
  }
}

export { loadingReducer };
