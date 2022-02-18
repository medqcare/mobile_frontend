import axios from 'axios';
import { baseURL, webBaseURL } from '../../config';
import { medicalServices } from '../reducers/keys'

const { 
    SET_MEDICAL_SERVICES,
    SET_ERROR_MEDICAL_SERVICES,
    SET_LOADING_MEDICAL_SERVICES
} = medicalServices

const webMedicalServicesInstance = axios.create({
  	baseURL: `${webBaseURL}/api/v1/assesments/services/getPagination`,
})

export function getMedicalServices(type, status, page){
	console.log(type, status, page)
	return async dispatch => {
		try {
			// await dispatch({
            //     type: SET_LOADING_MEDICAL_SERVICES,
            //     payload: true
            // })
			const { data } = await webMedicalServicesInstance({
				method: 'GET',
				url: `?type=${type}&status=${status}&page=${page}`,
			})
			// await dispatch({
            //     type: SET_LOADING_MEDICAL_SERVICES,
            //     payload: false
            // })
			if(data) return data.data
			return []
		}
		catch(error){
			console.log(error)
			console.log('error di action')
		}
	}
}


  