import { ToastAndroid } from 'react-native';
import { instance } from '../../config';


export function getReminders(patientID, token){
    return async dispatch => {
        try {
            console.log('coba')
            let { data } = await instance({
                method: 'GET',
                url: `reminders/getAllReminders/${patientID}`,
                headers: {
                    authorization: token
                },
            })
            console.log(`Application found ${data.data.length} reminders`)
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

export function changeReminderAlarmTime(reminderID, alarmTime, token){
    return async dispatch => {
        try {
            const { data } = await instance({
                method: 'PATCH',
                url: `reminders/changeReminderAlarmTime/${reminderID}`,
                headers: {
                    authorization: token
                },
                data: { alarmTime }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function changeReminderStatus(status, reminderID, token){
    return async dispatch => {
        try {
            const { data } = await instance({
                method: 'PATCH',
                url: `reminders/changeReminderStatus/${reminderID}`,
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