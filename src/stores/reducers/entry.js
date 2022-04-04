import keys from "../keys";
const {
    SET_SIGNIN_LOADING,
    SET_SIGNIN_ERROR,
    SET_SIGNUP_IS_REGISTERED,
    SET_SIGNUP_LOADING,
    SET_SIGNUP_ERROR,
} = keys.entryKeys

const initState = {
    signUpisRegistered: false,
    signUpIsLoading: false,
    signUpError: null,
    signInIsLoading: false,
    signInError: null
}

function entryReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_SIGNIN_LOADING:
            return { ...state, signInIsLoading: payload }
        case SET_SIGNIN_ERROR:
            return { ...state, signInError: payload }
        case SET_SIGNUP_IS_REGISTERED:
            return { ...state, signUpisRegistered: payload, signUpIsLoading: false }
        case SET_SIGNUP_LOADING:
            return { ...state, signUpIsLoading: payload }
        case SET_SIGNUP_ERROR:
            return { ...state, signUpError: payload }
        default:
            return state
    }
}

export default entryReducer