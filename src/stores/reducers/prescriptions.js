import keys from "../keys";

const {
    SET_PRESCRIPTIONS,
    SET_ACTIVE_PRESCRIPTIONS,
    SET_PRESCRIPTION_HISTORY,
    SET_PRESCRIPTIONS_LOADING,
    SET_PRESCRIPTIONS_ERROR
} = keys.prescrptionKeys

const initState = {
    activePrescriptions: [],
    prescriptionHistory: [],
    isLoading: true,
    error: null
}
function prescriptionsReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_PRESCRIPTIONS:
            const { activePrescriptions, prescriptionHistory } = payload
            return { ...state, activePrescriptions, prescriptionHistory, isLoading: false, error: null }
        case SET_ACTIVE_PRESCRIPTIONS:
            return { ...state, activePrescriptions: payload, isLoading: false, error: null }
        case SET_PRESCRIPTION_HISTORY:
            return { ...state, prescriptionHistory: payload, isLoading: false, error: null }
        case SET_PRESCRIPTIONS_LOADING:
            return { ...state, isLoading: payload }
        case SET_PRESCRIPTIONS_ERROR:
            return { ...state, error: payload, isLoading: false }
        default:
            return state
    }
}

export default prescriptionsReducer