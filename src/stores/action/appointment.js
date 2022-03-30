import keys from "../keys";
import { 
    instance
} from '../../config'
import getToken from "../../helpers/localStorage/token";
import { ToastAndroid } from "react-native";

const { 
    SET_APPOINTMENTS,
    SET_APPOINTMENT_ORDER_TYPE,
    SET_HEALTHFACILITY,
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

export function setHealthFacility(appointmentData){
    return async dispatch => {
        try {
            const { data } = await instance({
                method: 'POST',
                url: `detailFacility/${appointmentData.healthFacility.facilityID}`
            })

            if(data.data){
                console.log('Application found the reserved health facility')

                await dispatch({
                    type: SET_HEALTHFACILITY,
                    payload: data.data
                })
            } else {
                console.log('Application did not found the reserved health facility')
                await dispatch({
                    type: SET_HEALTHFACILITY,
                    payload: appointmentData.healthFacility
                })
            }
        } catch (error) {
            console.log(error.message)
            await dispatch({
                type: SET_APPOINTMENTS_ERROR,
                payload: error.message
            })
        }
    }
}

export function checkIn(payload, navigation){
    return async dispatch => {
        try {
            console.log('Application is trying to check in')

            const token = await getToken()
            const { data } = await instance({
                method: 'POST',
                url: `createRegistered`,
                headers: {
                    Authorization: token
                },
                data: payload
            })

            if(data.status === true){
                console.log('Application checked in successfully, redirecting to Activity_List')
                navigation.navigate('Activity_List')
            }
        } catch (error) {
            console.log(error.message)
            const errorMessage = 'Check-In failed, please try again later'
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
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