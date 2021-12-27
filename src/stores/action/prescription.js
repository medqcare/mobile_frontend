import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { baseURL } from '../../config';

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