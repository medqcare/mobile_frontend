import keys from "../keys";

const { 
    SET_TRANSACTION,
    SET_TRANSACTION_LOADING,
    SET_TRANSACTION_ERROR
} = keys.transactionKeys

const initState = {
    transactions: [],
    isLoading: false,
    error: null
}

function transactionsReducer(state = initState, action){
    const { type, payload } = action

    switch (type) {
        case SET_TRANSACTION:
            return { ...state, transactions: payload, isLoading: false, error: null }
        case SET_TRANSACTION_LOADING:
            return { ...state, isLoading: payload }
        case SET_TRANSACTION_ERROR:
            return { ...state, isLoading: false, error: payload }
        default:
            return state;
    }
}

export default transactionsReducer