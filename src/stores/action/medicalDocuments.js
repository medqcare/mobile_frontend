import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { baseURL, instance } from '../../config';
import getToken from '../../helpers/localStorage/token';

import keys from '../keys';

const { 
    SET_MEDICAL_DOCUMENTS,
	SET_MEDICAL_DOCUMENTS_TOTAL_PAGES,
    SET_MEDICAL_DOCUMENTS_LOADING,
    SET_MEDICAL_DOCUMENTS_ERROR,
} = keys.medicalDocumentKeys

// const instance = axios.create({
//   baseURL: `${baseURL}/api/v1`,
// });

export function getDocumentByPatient(patientID, stringTypeSeparateByComma, page, search, defaultTypes) {
	return async dispatch => {
		try {
			console.log(`Application is trying to find medical documents`)

			await dispatch({
				type: SET_MEDICAL_DOCUMENTS_LOADING,
				payload: true
			})

			let type = null;
		
			if (
				typeof stringTypeSeparateByComma === 'string' &&
				stringTypeSeparateByComma.length > 0
			) {
				type = stringTypeSeparateByComma;
			}

			const token = await getToken()
			
			if(search){
				const { data } = await instance({
					method: 'GET',
					url: `getDocumentByPatient?search=${search}`,
					headers: {
						Authorization: token,
						patientid: patientID,
						type: defaultTypes
					}
				})

				console.log(`Application found ${data.data.length} medical documents by search query`)

				return await dispatch({
					type: SET_MEDICAL_DOCUMENTS,
					payload: data.data
				})
			} else {
				const { data } = await instance({
					method: 'GET',
					url: 'getDocumentByPatient',
					headers: {
						Authorization: token,
						patientid: patientID,
						type,
						page: page,
					},
				})
	
				console.log(`Application found ${data.data.length} medical document(s)`)
	
				console.log(`Application found in total of ${data.totalPages} page(s)`) 
	
				await dispatch({
					type: SET_MEDICAL_DOCUMENTS,
					payload: data.data
				})
	
				await dispatch({
					type: SET_MEDICAL_DOCUMENTS_TOTAL_PAGES,
					payload: data.totalPages
				})
			}	
		} catch (error) {
			ToastAndroid.show('Gagal memuat dokumen, silahkan coba kembali');
			console.log(error)
			await dispatch({
				type: SET_MEDICAL_DOCUMENTS_ERROR,
				payload: error
			})
		}
		
	}
}

export function uploadDocument(token, patientid, data) {
	return async dispatch => {
		try {
			return instance({
				url: 'addDokumen',
				method: 'POST',
				headers: {
				  Authorization: token,
				  patientid,
				},
				data,
			});
		} catch (error) {
			console.log(error)
			await dispatch({
				type: SET_MEDICAL_DOCUMENTS_ERROR,
				payload: error
			})
		}
	}
}

export function renameDocument(token, patientid, data) {
	return async dispatch => {
		try {
			return instance({
				url: 'renameDocument',
				method: 'PATCH',
				headers: {
				  Authorization: token,
				  patientid,
				},
				data,
			});
		} catch (error) {
			console.log(error)
			await dispatch({
				type: SET_MEDICAL_DOCUMENTS_ERROR,
				payload: error
			})
		}
	}
}

export function deleteDocument(token, patientid, data) {
	return async dispatch => {
		try {
			return instance({
				url: 'deleteDocument',
				method: 'DELETE',
				headers: {
				  Authorization: token,
				  patientid,
				},
				data,
			});
		} catch (error) {
			console.log(error)
			await dispatch({
				type: SET_MEDICAL_DOCUMENTS_ERROR,
				payload: error
			})
		}
	}
  
}
