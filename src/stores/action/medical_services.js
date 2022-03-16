import axios from 'axios';
import { baseURL } from '../../config';
// import { medicalServices } from '../reducers/keys'

// const { 
//     SET_MEDICAL_SERVICES,
//     SET_ERROR_MEDICAL_SERVICES,
//     SET_LOADING_MEDICAL_SERVICES
// } = medicalServices

const mobileMedicalServiceInstance = axios.create({
	baseURL: `${baseURL}/api/v1/members/reservations/service`
})

export function getMedicalServices(type, status, page){
	return async dispatch => {
		try {
			// await dispatch({
            //     type: SET_LOADING_MEDICAL_SERVICES,
            //     payload: true
            // })
			const { data } = await axios({
				method: 'GET',
				url: `${baseURL}/api/v1/members/medical/services?type=${type}&status=${status}&page=${page}`,
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

export function createMedicalServiceReservation(bookData, token){
	return async dispatch => {
		try {
			const { data } = await mobileMedicalServiceInstance({
				method: 'POST',
				data: bookData,
				headers: { Authorization: token },
			})
			return data
		} catch (error) {
			// console.log(error.response.data, 'Error in creating service reservation')
			return error.response.data
		}
	}
}


  