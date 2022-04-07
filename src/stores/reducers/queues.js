import keys from "../keys";

const {
    SET_QUEUES,
    SET_QUEUES_LOADING,
    SET_QUEUES_ERROR,
} = keys.queueKeys

const initState = {
    queues: [],
    isLoading: false,
    error: null
}

function queuesReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_QUEUES:
            return { ...state, queues: payload, isLoading: false, error: null }
        case SET_QUEUES_LOADING:
            return { ...state, isLoading: payload }
        case SET_QUEUES_ERROR:
            return { ...state, error: payload, isLoading: false, isLoadingQueueNumber: false }
        default:
            return state
    }
}

export default queuesReducer