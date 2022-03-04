import keys from "../keys";
const { 
    SET_DOCTORS,
    SET_DOCTORS_LOADING,
    SET_DOCTORS_ERROR
} = keys.doctorKeys

const initState = {
    doctors: [],
    isLoading: false,
    error: null
}

function doctorReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_DOCTORS:
            return { ...state, doctors: payload, error: null }
        case SET_DOCTORS_LOADING:
            return { ...state, isLoading: payload }
        case SET_DOCTORS_ERROR:
            return { ...state, error: payload }
        default:
            return state
    }
}

export default doctorReducer