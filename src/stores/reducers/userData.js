import keys from "../keys";
const { 
    SET_USER_DATA,
    SET_USER_DATA_LOADING,
    SET_USER_DATA_ERROR,
    DELETE_USER_DATA
} = keys.userDataKeys

const initState = {
    userData: null,
    isLoading: false,
    error: null
}

function userDataReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_USER_DATA:
            return { ...state, userData: payload, error: null }
        case SET_USER_DATA_LOADING:
            return { ...state, isLoading: payload}
        case SET_USER_DATA_ERROR:
            return { ...state, userData: payload, error: payload }
        case DELETE_USER_DATA:
            return { userData: null, isLoading: false, error: null }
        default:
            return state
    }
}

export default userDataReducer