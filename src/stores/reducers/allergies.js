import keys from "../keys";
const { 
    SET_ALLERGIES,
    SET_ALLERGIES_LOADING,
    SET_ALLERGIES_ERROR,
    DELETE_ALLERGIES
} = keys.allergyKeys

const initState = {
    allergies: [],
    isLoading: false,
    error: null
}

function allergiesReducer(state = initState, action){
    const { type, payload } = action

    switch (type) {
        case SET_ALLERGIES:
            return  {...state, allergies : payload }
        case SET_ALLERGIES_LOADING:
            return { ...state, isLoading: payload }
        case SET_ALLERGIES_ERROR:
            return { ...state, error: payload }
        case DELETE_ALLERGIES: 
            return { ...state, allergies: []}
        default:
            return state
    }
}

export default allergiesReducer