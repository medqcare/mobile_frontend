import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { baseURL, instance } from '../../config'
import getToken from '../../helpers/localStorage/token';
import keys from '../keys';

const {
    SET_PRESCRIPTIONS,
    SET_ACTIVE_PRESCRIPTIONS,
    SET_PRESCRIPTION_HISTORY,
    SET_PRESCRIPTIONS_LOADING,
    SET_PRESCRIPTIONS_ERROR
} = keys.prescrptionKeys

const prescriptionInstance = axios.create({
  baseURL: `${baseURL}/api/v1/members`,
  headers: {
    'x-secret': 123456 
  }
});

export function getAllPrescriptions(patientID, token){
    return async dispatch => {
        try {
            let { data } = await prescriptionInstance({
                method: 'GET',
                url: `/getAllPrescriptions/${patientID}`,
                headers: {
                    authorization: token
                },
            })
            await dispatch({
                type: 'GET_PRESCRIPTION_DATA',
                payload: data.data
            })
        } catch (error) {
            console.log(error) 
        }
    }
}

export function getTodaysPrescriptions(patientID){
    return async dispatch => {
        try {
            console.log(`Application is trying to find active prescription`)

            const token = await getToken()
            const { data } = await instance({
                method: 'GET',
                url: `getTodaysPrescriptionByPatientID/${patientID}`,
                headers: {
                    authorization: token
                },
            })

            console.log(`Application found ${data.data.length} active prescription(s)`)

            await dispatch({
                type: SET_ACTIVE_PRESCRIPTIONS,
                payload: data.data
            })

            return data.data
        } catch (error) {
            console.log(error) 
        }
    }
}

export function getPrescriptionHistory(patientID){
    return async dispatch => {
        try {
            console.log(`Application is trying to find prescription history`)
            const token = await getToken()
            const { data } = await instance({
                method: 'GET',
                url: `getPrescriptionHistory/${patientID}`,
                headers: {
                    authorization: token
                },
            })

            console.log(`Application found ${data.data.length} prescription history`)

            await dispatch({
                type: SET_PRESCRIPTION_HISTORY,
                payload: data.data
            })

            return data.data
        } catch (error) {
            console.log(error) 

            await dispatch({
                type: SET_PRESCRIPTIONS_ERROR,
                payload: error
            })
        }
    }
}

// export function changeReminderStatus(status, reminderID, token){
//     return async dispatch => {
//         try {
//             const { data } = await reminderInstance({
//                 method: 'PATCH',
//                 url: `/changeReminderStatus/${reminderID}`,
//                 headers: {
//                     authorization: token,
//                 },
//                 data: { status }
//             })
//             ToastAndroid.show('Successflly changed your reminder status', ToastAndroid.SHORT)
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }