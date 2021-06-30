import { actionTypes } from './actions';

const initialState = {
  data: [],
  loading: false,
  initialized: false
};

const reducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.LOADING:
      return {...state, loading: true };

    case actionTypes.LOADING_SUCCESS:
      const { data } = payload;
      return {...state, data, loading: false, initialized: true };

    case actionTypes.LOADING_FAILURE:
      return {...state, loading: false };

    case actionTypes.ADD:
      const lessons = [...state.data].map(a => ({...a})).concat([payload.data]);
      return {...state, data: lessons };

    default:
      return state;
  }
}
export default reducer;
