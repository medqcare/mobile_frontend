import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { baseURL, webBaseURL, instance, webInstace } from '../../config'
import getToken from '../../helpers/localStorage/token';
import keys from '../keys';

const { 
    SET_MEDICAL_SERVICES,
    SET_MEDICAL_SERVICES_CURRENTPAGE,
    SET_MEDICAL_SERVICES_TYPE,
    SET_MEDICAL_SERVICES_STATUS,
    SET_MEDICAL_SERVICES_LOADING,
    SET_MEDICAL_SERVICES_ERROR,
} = keys.medicalServicesKeys

// const webMedicalServicesInstance = axios.create({
//   	baseURL: `${webBaseURL}/api/v1/assesments/services/getPagination`,
// })

const mobileMedicalServiceInstance = axios.create({
	baseURL: `${baseURL}/api/v1/members/reservations/service`
})

export function getMedicalServices(type, status, page, medicalServices, addPage, setMedicalServices){
	return async dispatch => {
		try {
			console.log('Application trying to find avaliable medical services')
			console.log('type:', type)
			console.log('status:', status)
			console.log('page:', page)
			await dispatch({
				type: SET_MEDICAL_SERVICES_LOADING,
				payload: true
			})
			const { data } = await webInstace({
				method: 'GET',
				url: `assesments/services/getPagination?type=${type}&status=${status}&page=${page}`,
			})
			if(data.data) {
				if(data.data.docs.length === 0){
					console.log(`Application didn't find any available services`)
				}
				if(page == 1){
					await setMedicalServices(data.data.docs)
					await dispatch({
						type: SET_MEDICAL_SERVICES,
						payload: data.data.docs
					})
				} else {
					await dispatch({
						type: SET_MEDICAL_SERVICES,
						payload: [...medicalServices, ...data.data.docs]
					})
				}
				console.log(`Application found ${data.data.docs.length} medical service(s)`)

				if(addPage){
					const nextPage = page + 1;
					await dispatch({
						type: SET_MEDICAL_SERVICES_CURRENTPAGE,
						payload: nextPage
					})
				}
				console.log('All data fetched, no need to add page')
				
			}
		}
		catch(error){
			console.log(error)
			console.log('error di action')
		}
	}
}

export function createMedicalServiceReservation(bookData, setModal){
	return async dispatch => {
		try {
			await dispatch({
				type: SET_MEDICAL_SERVICES_LOADING,
				payload: true
			})
			console.log('Application is trying to make medical service reservation')
			const token = await getToken()
			const { data } = await mobileMedicalServiceInstance({
				method: 'POST',
				data: bookData,
				headers: { Authorization: token },
			})

			setModal(true)
			
			await dispatch({
				type: SET_MEDICAL_SERVICES_LOADING,
				payload: false
			})
		} catch (error) {
			if(error.response.data.message === 'patient already reserve for this service'){
				await dispatch({
					type: SET_MEDICAL_SERVICES_ERROR,
					payload: error.response.data.message
				})
				ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
			}
		}
	}
}