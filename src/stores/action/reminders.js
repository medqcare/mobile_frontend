import axios from 'axios';
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
            await dispatch({
                type: 'GET_REMINDER_DATA',
                payload: data.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}