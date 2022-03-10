import keys from "../keys";
const {
    SET_CLINIC,
    SET_CLINIC_LOADING,
    SET_CLINIC_ERROR
} = keys.clinicKeys 

const initialState = {
    clinics: [],
    isLoading: false,
    error: null
}

function clinicReducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case SET_CLINIC:
            return { ...state, clinics: payload, isLoading: false, error: null}
        case SET_CLINIC_LOADING:
            return { ...state, isLoading: payload}
        case SET_CLINIC_ERROR:
            return { ...state, error: payload}
        default:
            return state
    }
}

export default clinicReducer