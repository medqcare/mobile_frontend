import keys from './../keys'

const { 
    SET_MEDICAL_DOCUMENTS,
    SET_MEDICAL_DOCUMENTS_TOTAL_PAGES,
    SET_MEDICAL_DOCUMENTS_LOADING,
    SET_MEDICAL_DOCUMENTS_ERROR,
} = keys.medicalDocumentKeys

const initState = {
    medicalDocuments: [],
    totalPages: 0,
    isLoading: false,
    error: null
}

function medicalDocumentsReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_MEDICAL_DOCUMENTS:
            return { ...state, medicalDocuments: payload, isLoading: false, error: null}
        case SET_MEDICAL_DOCUMENTS_TOTAL_PAGES:
            return { ...state, totalPages: payload }
        case SET_MEDICAL_DOCUMENTS_LOADING:
            return { ...state, isLoading: payload }
        case SET_MEDICAL_DOCUMENTS_ERROR:
            return { ...state, error: payload }
        default:
            return state
    }
}

export default medicalDocumentsReducer