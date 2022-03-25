import keys from "../keys";
const {
    SET_SIGNIN_LOADING,
    SET_SIGNIN_ERROR,
    SET_SIGNUP_LOADING,
    SET_SIGNUP_ERROR,
} = keys.entryKeys

const signUp = {
    isLoading: false,
    error: null
}

const signIn = {
    isLoading: false,
    error: null
}

const initState = {
    signIn,
    signUp,
}

function entryReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_SIGNIN_LOADING:
            return { ...signIn, isLoading: payload }
        case SET_SIGNIN_ERROR:
            return { ...signIn, isLoading: payload }
        case SET_SIGNUP_LOADING:
            return { ...signUp, isLoading: payload }
        case SET_SIGNUP_ERROR:
            return { ...signUp, isLoading: payload }
        default:
            return state
    }
}

export default entryReducer