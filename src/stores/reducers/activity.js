import keys from "../keys";
const {
    SET_TODAY_ACTIVITY,
    SET_TODAY_ACTIVITY_LOADING,
    SET_TODAY_ACTIVITY_ERROR,
    DELETE_TODAY_ACTIVITY,
} = keys.activityKeys

const initState = {
    todayActivity: [],
    isLoading: false,
    error: null,
}

function todayActivityReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_TODAY_ACTIVITY:
            return { ...state, todayActivity: payload, error: null }
        case SET_TODAY_ACTIVITY_LOADING:
            return { ...state, isLoading: payload}
        case SET_TODAY_ACTIVITY_ERROR:
            return { ...state, todayActivity: payload, error: payload }
        case DELETE_TODAY_ACTIVITY:
            return { todayActivity: null, isLoading: false, error: null }
        default:
            return state
    }
}

export default todayActivityReducer