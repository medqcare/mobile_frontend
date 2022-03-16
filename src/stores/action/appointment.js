import keys from "../keys";
import { 
    instance
} from '../../config'
import getToken from "../../helpers/localStorage/token";
import { ToastAndroid } from "react-native";

const { 
    SET_APPOINTMENTS,
    SET_APPOINTMENT_ORDER_TYPE,
    SET_APPOINTMENTS_LOADING,
    SET_APPOINTMENTS_ERROR,
} = keys.appointmentsKeys

export function searchAllReservations(status, type){
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_APPOINTMENTS_LOADING,
                payload: true
            })
            const token = await getToken()
            const { data } = await instance({
                method: 'GET',
                url: `reservations/user?status=${status}`,
                headers: {
                    Authorization: token
                }
            })

            const { reservations } = data.data
            const doctorAppointments = []
            const medicalServiceAppointments = []

            for(let i = 0; i < reservations.length; i++){
                const reservation = reservations[i]
                const { orderType } = reservation
                if(orderType === 'doctor') doctorAppointments.push(reservation)
                else medicalServiceAppointments.push(reservation)
            }

            await dispatch({
                type: SET_APPOINTMENTS,
                payload: {
                    doctorAppointments,
                    medicalServiceAppointments
                }
            })

        } catch (error) {
            console.log(error)
            await dispatch({
                type: SET_APPOINTMENTS_ERROR,
                payload: error
            })
        }
    }
}

export function cancelSelectedReservation(reservationID, appointmentList, keyToDispatch){
    return async (dispatch) => {
        try {
            const token = await getToken()
            const { data } = await instance({
                method: 'PATCH',
                url: `cancelReservation`,
                headers: {
                    Authorization: token
                },
                data: {
                    reservationID
                }
            })

            const newAppointmentList = appointmentList.filter(el => el._id !== reservationID)
            await dispatch({
                type: keyToDispatch,
                payload: newAppointmentList
            })
            
            console.log(data)
        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT)
        }
    }
}