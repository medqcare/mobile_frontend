import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { baseURL } from '../../config';

const reminderInstance = axios.create({
  baseURL: `${baseURL}/api/v1/members`,
  headers: {
    'x-secret': 123456 
  }
});

export function getReminders(patientID, token){
    return async dispatch => {
        try {
            let { data } = await reminderInstance({
                method: 'GET',
                url: `/getAllReminders/${patientID}`,
                headers: {
                    authorization: token
                },
            })
            // await dispatch({
            //     type: 'GET_REMINDER_DATA',
            //     payload: data.data
            // })
            return data.data
        } catch (error) {
            console.log(error) 
        }
    }
}

export function changeReminderStatus(status, reminderID, token){
    return async dispatch => {
        try {
            const { data } = await reminderInstance({
                method: 'PATCH',
                url: `/changeReminderStatus/${reminderID}`,
                headers: {
                    authorization: token,
                },
                data: { status }
            })
            ToastAndroid.show('Successflly changed your reminder status', ToastAndroid.SHORT)
        } catch (error) {
            console.log(error)
        }
    }
}