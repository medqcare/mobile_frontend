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
	return async (dispatch, getState) => {
		try {
			console.log(`Application is trying to find medical documents`)

			if (page === 1 || search != null) {
				await dispatch({
					type: SET_MEDICAL_DOCUMENTS_LOADING,
					payload: true
				})
			}

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
					url: `documents/getDocumentByPatient?search=${search}`,
					headers: {
						Authorization: token,
						patientid: patientID,
						type: defaultTypes
					}
				})

				console.log(`Application found ${data.data.length} medical documents by search query`)

				dispatch({
					type: SET_MEDICAL_DOCUMENTS,
					payload: data.data
				})
			} else {
				const { data } = await instance({
					method: 'GET',
					url: 'documents/getDocumentByPatient',
					headers: {
						Authorization: token,
						patientid: patientID,
						type,
						page: page,
					},
				})
	
				console.log(`Application found ${data.data.length} medical document(s)`)
	
				console.log(`Application found in total of ${data.totalPages} page(s)`) 


				if (page === 1) {
					dispatch({
            			type: SET_MEDICAL_DOCUMENTS,
            			payload: data.data,
          			});
					dispatch({
            		  type: SET_MEDICAL_DOCUMENTS_TOTAL_PAGES,
            		  payload: data.totalPages,
            		});
				} else {
					const { medicalDocumentsReducer } = getState();
					const { medicalDocuments } = medicalDocumentsReducer
					dispatch({
						type: SET_MEDICAL_DOCUMENTS,
						payload: medicalDocuments.concat(data.data)
					})
				}
			}	
		} catch (error) {
			ToastAndroid.show('Gagal memuat dokumen, silahkan coba kembali', ToastAndroid.LONG);
			dispatch({
				type: SET_MEDICAL_DOCUMENTS_ERROR,
				payload: error
			})
		} finally {
			dispatch({
				type: SET_MEDICAL_DOCUMENTS_LOADING,
				payload: false
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
				url: 'documents/addDokumen',
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
				url: 'documents/renameDocument',
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
				url: `documents/deleteDocument`,
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
