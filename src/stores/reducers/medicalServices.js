import keys from '../keys';

const { 
    SET_MEDICAL_SERVICES,
    SET_MEDICAL_SERVICES_CURRENTPAGE,
    SET_MEDICAL_SERVICES_TYPE,
    SET_MEDICAL_SERVICES_STATUS,
    SET_MEDICAL_SERVICES_LOADING,
    SET_MEDICAL_SERVICES_ERROR,
} = keys.medicalServicesKeys

const initState = {
    medicalServices: [],
    currentPage: 1,
    type: 'MOBILE',
    status: true,
    isLoading: false,
    error: null
}

function medicalServicesReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_MEDICAL_SERVICES:
            return { ...state, medicalServices: payload, isLoading: false, error: null }
        case SET_MEDICAL_SERVICES_CURRENTPAGE:
            return { ...state, currentPage: payload }
        case SET_MEDICAL_SERVICES_TYPE:
            return { ...state, type: payload }
        case SET_MEDICAL_SERVICES_STATUS:
            return { ...state, status: payload }
        case SET_MEDICAL_SERVICES_LOADING:
            return { ...state, isLoading: payload }
        case SET_MEDICAL_SERVICES_ERROR:
            return { ...state, error: payload, isLoading: false }
        default:
            return state
    }
}

export default medicalServicesReducer