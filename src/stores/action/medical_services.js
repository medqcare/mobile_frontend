import axios from 'axios';
import { baseURL, webBaseURL, instance, webInstace } from '../../config'
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

export function getMedicalServices(type, status, page, medicalServices, addPage){
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

export function searchMedicalServicesByName(searchQuery, medicalServices){
	if(text){
		const lowerCase = text.toLowerCase()
		const newMedicalServiceList = medicalServices.filter(el => el.name.toLowerCase().includes(lowerCase))
		setMedicalServices(newMedicalServiceList)
	}
	else {
		getMedicalServices()
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



  