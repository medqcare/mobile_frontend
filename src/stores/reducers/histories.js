import keys from "../keys";

const {
    SET_ORDER_HISTORY,
    SET_ORDER_HISTORY_LOADING,
    SET_ORDER_HISTORY_ERROR,
    SET_TRANSACTION_HISTORY,
    SET_TRANSACTION_HISTORY_LOADING,
    SET_TRANSACTION_HISTORY_ERROR
} = keys.historyKeys

const initState = {
    orderHistory: [],
    orderIsLoading: false,
    orderError: null,
    transactionHistory: [],
    transactionIsLoading: false,
    transactionError: null
}

function historiesReducer(state = initState, action){
    const { type, payload } = action

    switch (type) {
        case SET_ORDER_HISTORY:
            return { ...state, orderHistory: payload, orderIsLoading: false, orderError: null }
        case SET_ORDER_HISTORY_LOADING:
            return { ...state, orderIsLoading: payload }
        case SET_ORDER_HISTORY_ERROR:
            return { ...state, orderIsLoading: false, orderError: payload }

        case SET_TRANSACTION_HISTORY:
            return { ...state, transactionHistory: payload, transactionIsLoading: false, transactionError: null }
        case SET_TRANSACTION_HISTORY_LOADING:
            return { ...state, transactionIsLoading: payload }
        case SET_TRANSACTION_HISTORY_ERROR:
            return { ...state, transactionIsLoading: false, transactionError: payload }
        default:
            return state;
    }
}

export default historiesReducer