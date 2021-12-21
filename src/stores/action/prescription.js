import axios from 'axios';
import { baseURL } from '../../config';

const prescriptionInstance = axios.create({
  baseURL: `${baseURL}/api/v1/members`,
  headers: {
    'x-secret': 123456 
  }
});

export function getPrescriptions(patientID, token){
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
            console.log(error, 'error di action prescription')
        }
    }
}