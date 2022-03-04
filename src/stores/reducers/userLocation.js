import keys from "../keys";
const { 
    SET_USER_LOCATION,
    SET_USER_LOCATION_LOADING,
    SET_USER_LOCATION_ERROR,
    DELETE_USER_LOCATION
} = keys.userLocationKeys

const initState = {
    userLocation: null,
    isLoading: false,
    error: null
}

function userLocationReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_USER_LOCATION:
            return { ...state, userLocation: payload, error: null }
        case SET_USER_LOCATION_LOADING: 
            return { ...state, isLoading: payload }
        case SET_USER_LOCATION_ERROR:
            return { ...state, error: payload }
        case DELETE_USER_LOCATION:
            return { ...state, userLocation: [], isLoading: false, error: null}
        default:
            return state
    }
}

export default userLocationReducer

