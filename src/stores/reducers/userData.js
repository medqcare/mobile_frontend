import keys from "../keys";
const { 
    SET_USER_DATA,
    SET_USER_DATA_LOADING,
    SET_USER_DATA_ERROR,
    DELETE_USER_DATA,
    SET_DARKMODE
} = keys.userDataKeys

const initState = {
    userData: null,
    isLoading: false,
    darkMode: false,
    error: null
}

function userDataReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_USER_DATA:
            return { ...state, userData: payload, isLoading: false, error: null }
        case SET_USER_DATA_LOADING:
            return { ...state, isLoading: payload}
        case SET_USER_DATA_ERROR:
            return { ...state, error: payload, isLoading: false }
        case DELETE_USER_DATA:
            return { ...state, userData: null, isLoading: false, error: null }
        case SET_DARKMODE: 
            return { ...state, darkMode: payload }
        default:
            return state
    }
}

export default userDataReducer