import axios from 'axios';
import { baseURL } from '../../config';

const drugInstance = axios.create({
  baseURL: `${baseURL}/api/v1/members`,
  headers: {
    'x-secret': 123456 
  }
});

export function getDrugs(patientID, token){
    return async dispatch => {
        try {
            let { data } = await drugInstance({
                method: 'GET',
                url: `/getAllDrugs/${patientID}`,
                headers: {
                    authorization: token
                },
            })
            await dispatch({
                type: 'GET_DRUGS_DATA',
                payload: data.data
            })
        } catch (error) {
            console.log(error, 'error di action prescription')
        }
    }
}