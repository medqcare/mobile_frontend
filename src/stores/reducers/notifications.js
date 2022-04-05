import keys from "../keys";

const { 
    SET_NOTIFICATIONS,
    SET_NOTIFICATIONS_COUNT,
    SET_NOTIFICATIONS_LOADING,
    SET_NOTIFICATIONS_ERROR,
} = keys.notificationKeys

const initState = {
    notifications: [],
    notificationsCount: 0,
    isLoading: false,
    error: null
}

function notificationsReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_NOTIFICATIONS:
            return { ...state, notifications: payload, isLoading: false, error: null }            
        case SET_NOTIFICATIONS_COUNT:
            return { ...state, notificationsCount: payload }
        case SET_NOTIFICATIONS_LOADING:
            return { ...state, isLoading: payload }
        case SET_NOTIFICATIONS_ERROR:
            return { ...state, error: payload, isLoading: false }
        default:
            return state
    }
}

export default notificationsReducer