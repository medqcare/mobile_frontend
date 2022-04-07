import keys from "../keys";
const { 
    SET_DRUGS,
    SET_WEB_DRUGS,
    SET_ACTIVE_DRUGS,
    SET_FINISHED_DRUGS,
    SET_DRUGS_LOADING,
    SET_WEB_DRUGS_LOADING,
    SET_DRUGS_ERROR,
    SET_WEB_DRUGS_ERROR,
    DELETE_DRUGS
} = keys.drugKeys

const initState = {
    activeDrugs: [],
    finishedDrugs: [],
    webDrugs: [],
    drugs: [],
    isLoading: false,
    isLoadingWebDrug: false,
    error: null,
    errorWebDrug: null
}

function drugReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_DRUGS:
            const { activeDrugs, finishedDrugs } = payload
            return { ...state, activeDrugs, finishedDrugs, isLoading: false, error: null }
        case SET_WEB_DRUGS:
            return { ...state, webDrugs: payload, isLoadingWebDrug: false, errorWebDrug: null }
        case SET_ACTIVE_DRUGS:
            return { ...state, activeDrugs: payload, isLoading: false, error: null }
        case SET_FINISHED_DRUGS:
            return { ...state, finishedDrugs: payload, isLoading: false, error: null }
        case SET_DRUGS_LOADING:
            return { ...state, isLoading: payload }
        case SET_WEB_DRUGS_LOADING:
            return { ...state, isLoadingWebDrug: payload }
        case SET_DRUGS_ERROR:
            return { ...state, error: payload }
        case SET_WEB_DRUGS_ERROR:
            return { ...state, errorWebDrug: payload }
        case DELETE_DRUGS:
            return { drugs: [], isLoading: false, error: null}
        default:
            return state
    }
}

export default drugReducer