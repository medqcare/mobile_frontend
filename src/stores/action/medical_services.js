import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { instance } from '../../config'
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

export function getMedicalServices(type, status, page, medicalServices, addPage, setMedicalServices, setCurrentPage, discount){
	return async dispatch => {
		try {
			console.log('Application trying to find avaliable medical services')
			console.log('type:', type)
			console.log('status:', status)
			console.log('page:', page)
			console.log('discount:', discount)
			if(discount === 'discountedItems') discount = true
			else if(discount === 'noDiscount') discount = false

			if(addPage){
				page += 1
				setCurrentPage(page)
			} else {
				await dispatch({
					type: SET_MEDICAL_SERVICES_LOADING,
					payload: true
				})
			}

			const { data } = await instance({
				method: 'GET',
				url: `medical/services?type=${type}&status=${status}&page=${page}&discount=${discount}`,
			})

			if(data.data) {
				const { docs, totalDocs, limit, totalPages, page: dataPage, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage } = data.data

				if(docs.length === 0){
					console.log(`Application didn't find any available services`)
				} else if (page == 1){
					await setMedicalServices(docs)
					await dispatch({
						type: SET_MEDICAL_SERVICES,
						payload: docs
					})
					return hasNextPage
				} else {
					await setMedicalServices([...medicalServices, ...docs])
					await dispatch({
						type: SET_MEDICAL_SERVICES,
						payload: [...medicalServices, ...docs]
					})
					return hasNextPage
				}
			}
		}
		catch(error){
			console.log(error.response.data)
			console.log('error di action')
		}
		finally {
			dispatch({
      		  type: SET_MEDICAL_SERVICES_LOADING,
      		  payload: false,
      		});
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
			const { data } = await instance({
				method: 'POST',
				url: `reservations/service`,
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