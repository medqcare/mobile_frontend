import keys from "../keys";
const { 
    SET_DOCTORS,
    SET_CONCAT_DOCTORS,
    SET_CURRENT_PAGE,
    SET_SPECIALIST,
    SET_DOCTORS_LOADING,
    DELETE_DOCTORS,
    SET_DOCTORS_ERROR
} = keys.doctorKeys

const initState = {
    doctors: [],
    isLoading: false,
    error: null,
    currentPage: 0,
    specialist: 'All'
}

function doctorReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_DOCTORS:
            return { ...state, doctors: payload, error: null }
        case SET_CONCAT_DOCTORS:
            return { ...state, doctors: [...doctors, ...payload], error: null }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: payload }
        case SET_SPECIALIST:
            return { ...state, specialist: payload }
        case SET_DOCTORS_LOADING:
            return { ...state, isLoading: payload }
        case DELETE_DOCTORS:
            return { doctors: [], isLoading: false, error: null, currentPage: 0, specialist: 'All' }
        case SET_DOCTORS_ERROR:
            return { ...state, error: payload, isLoading: false }
        default:
            return state
    }
}

export default doctorReducer