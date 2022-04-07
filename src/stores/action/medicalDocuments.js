import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { instance } from '../../config';
import getToken from '../../helpers/localStorage/token';

import keys from '../keys';

const { 
    SET_MEDICAL_DOCUMENTS,
	SET_MEDICAL_DOCUMENTS_TOTAL_PAGES,
    SET_MEDICAL_DOCUMENTS_LOADING,
    SET_MEDICAL_DOCUMENTS_ERROR,
} = keys.medicalDocumentKeys

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

export function uploadDocument(patientID, document, medicalDocuments) {
	return async dispatch => {
		try {
			const token = await getToken()
			const { data } = await instance({
				method: 'POST',
				url: 'addDokumen',
				headers: {
					Authorization: token,
					patientid: patientID
				},
				data: document,
			})

			const newMedicalDocumentsList = [...medicalDocuments, data.data]

			await dispatch({
				type: SET_MEDICAL_DOCUMENTS,
				payload: newMedicalDocumentsList
			})
		} catch (error) {
			console.log(error)
			await dispatch({
				type: SET_MEDICAL_DOCUMENTS_ERROR,
				payload: error
			})
		}
	}
}

export function renameDocument(patientID, payload, medicalDocuments) {
	return async dispatch => {
		try {
			const token = await getToken()
			const { data } = await instance({
				method: 'PATCH',
				url: 'renameDocument',
				headers: {
					Authorization: token,
					patientid: patientID
				},
				data: payload
			})

			const newMedicalDocumentsList = medicalDocuments.map(el => {
				if(el._id === payload.documentid){
					el.name = payload.name
				}

				return el
			})

			await dispatch({
				type: SET_MEDICAL_DOCUMENTS,
				payload: newMedicalDocumentsList
			})
		} catch (error) {
			console.log(error)
			await dispatch({
				type: SET_MEDICAL_DOCUMENTS_ERROR,
				payload: error
			})
		}
	}
}

export function deleteDocument(patientID, payload, medicalDocuments) {
	return async dispatch => {
		try {
			const token = await getToken()
			const { data } = await instance({
				method: 'DELETE',
				url: `deleteDocument`,
				headers: {
					Authorization: token,
					patientid: patientID,
				},
				data: payload
			})

			const newMedicalDocumentsList = medicalDocuments.filter(el => el._id !== payload.documentid)

			await dispatch({
				type: SET_MEDICAL_DOCUMENTS,
				payload: newMedicalDocumentsList
			})
		} catch (error) {
			console.log(error)
			await dispatch({
				type: SET_MEDICAL_DOCUMENTS_ERROR,
				payload: error
			})
		}
	}
  
}
