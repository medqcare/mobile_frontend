import keys from "../keys";

const {
    SET_QUEUES,
    SET_QUEUES_NUMBER,
    SET_QUEUES_LOADING,
    SET_QUEUES_ERROR,
} = keys.queueKeys

const initState = {
    queues: [],
    queueNumber: 0,
    isLoading: false,
    error: null
}

function queuesReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_QUEUES:
            return { ...state, queues: payload, isLoading: false, error: null }
        case SET_QUEUES_NUMBER:
            return { ...state, queueNumber: payload, isLoading: false, error: null }
        case SET_QUEUES_LOADING:
            return { ...state, isLoading: payload }
        case SET_QUEUES_ERROR:
            return { ...state, error: payload }
        default:
            return state
    }
}

export default queuesReducer