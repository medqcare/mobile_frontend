const { SET_SPECIALISTS, LOADING_SPECIALISTS } = require('../keys/specialists');

const initialState = {
  specialists: [],
  isLoading: false,
};

export default function specialistReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SPECIALISTS:
      return { ...state, specialists: payload };
    case LOADING_SPECIALISTS:
      return { ...state, isLoading: payload };
    default:
      return state;
  }
}
