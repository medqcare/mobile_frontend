import keys from "../keys";

const {
  SET_SPECIALISTS,
  SET_SPECIALISTS_LOADING,
  SET_SPECIALISTS_ERROR
} = keys.specialistKeys
const initialState = {
  specialists: [],
  isLoading: false,
  error: null
};

export default function specialistReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SPECIALISTS:
      return { ...state, specialists: payload, isLoading: false, error: null };
    case SET_SPECIALISTS_LOADING:
      return { ...state, isLoading: payload };
    case SET_SPECIALISTS_ERROR:
      return { ...state, error: payload, isLoading: false}
    default:
      return state;
  }
}
