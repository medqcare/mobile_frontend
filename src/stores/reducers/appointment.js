import keys from "../keys";

const {
    SET_APPOINTMENTS,
    SET_DOCTOR_APPOINTMENTS,
    SET_MEDICAL_SERVICE_APPOINTMENTS,
    SET_APPOINTMENT_ORDER_TYPE,
    SET_APPOINTMENTS_LOADING,
    SET_APPOINTMENTS_ERROR,
} = keys.appointmentsKeys

const initState = {
    doctorAppointments: [],
    medicalServiceAppointments: [],
    orderType: 'Konsultasi Dokter',
    isLoading: false,
    error: null
}

function appointmentsReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_APPOINTMENTS:
            const { doctorAppointments, medicalServiceAppointments } = payload
            return { ...state, doctorAppointments, medicalServiceAppointments, isLoading: false, error: null }
        case SET_DOCTOR_APPOINTMENTS:
            return { ...state, doctorAppointments: payload }
        case SET_MEDICAL_SERVICE_APPOINTMENTS:
            return { ...state, medicalServiceAppointments: payload }
        case SET_APPOINTMENT_ORDER_TYPE:
            return { ...state, orderType: payload }
        case SET_APPOINTMENTS_LOADING:
            return { ...state, isLoading: payload }
        case SET_APPOINTMENTS_ERROR:
            return { ...state, error: payload}
        default:
            return state
    }
}

export default appointmentsReducer