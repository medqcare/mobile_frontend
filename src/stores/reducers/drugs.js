import keys from "../keys";
const { 
    SET_DRUGS,
    SET_DRUGS_LOADING,
    SET_DRUGS_ERROR,
    DELETE_DRUGS
} = keys.drugKeys

const initState = {
    drugs: [],
    isLoading: false,
    error: null
}

function drugReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_DRUGS:
            return { ...state, drugs: payload, error: null }
        case SET_DRUGS_LOADING:
            return { ...state, isLoading: payload }
        case SET_DRUGS_ERROR:
            return { ...state, error: payload }
        case DELETE_DRUGS:
            return { drugs: [], isLoading: false, error: null}
        default:
            return state
    }
}

export default drugReducer