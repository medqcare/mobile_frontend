import axios from 'axios';
import { baseURL, webBaseURL } from '../../config';

const drugInstance = axios.create({
  baseURL: `${baseURL}/api/v1/members`,
  headers: {
    'x-secret': 123456 
  }
});

const webDrugInstance = axios.create({
    baseURL: `${webBaseURL}/api/v1/drug/materials/`,
    headers: {
        'x-secret': 123456,
        'Service': 'drugList'
    }
})

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
            return data.data
        } catch (error) {
            console.log(error, 'error di action drugs')
        }
    }
}

export function searchDrugByName(query){
    return async dispatch => {
        try {
            let { data } = await webDrugInstance({
                method: 'GET',
                url: `/listdrugs?name=${query}`,
            })
            return data.data
        } catch (error) {
            console.log(error, 'error di action get drugs by name')
        }
    }
}

export function searchAllDrugs(){
    return async dispatch => {
        try {
            let { data } = await webDrugInstance({
                method: 'GET',
                url: `/listdrugs`,
            })
            await dispatch({
                type: 'SEARCH_ALL_DRUGS',
                payload: data.data
            })
            return data.data
        } catch (error) {
            console.log(error.message)
        }
    }
}

export function createNewDrugFromUser(newDrug, token){
    return async dispatch => {
        try {
            let { data } = await drugInstance({
                method: 'POST',
                url: `/createNewDrugFromUser`,
                headers: {
                    authorization: token
                },
                data: newDrug
            })
            return data.data
        } catch (error) {
            console.log(error.message, 'error at create new Drug')
        }
    }
}

export function changeDrugNotes(drugID, token, notes){
    return async dispatch => {
        try {
            let { data } = await drugInstance({
                method: 'PATCH',
                url: `/changeDrugNotes/${drugID}`,
                headers: {
                    authorization: token
                },
                data: { notes },
            })
            return data
        } catch (error) {
            return error.message
        }
    }
}

export function changeAlarmBoolean(drugID, token){
    return async dispatch => {
        try {
            let { data } = await drugInstance({
                method: 'PATCH',
                url: `/changeAlarmBoolean/${drugID}`,
                headers: {
                    authorization: token
                },
            })
            return data.message
        } catch (error) {
            console.log(error.message, 'error at change alarm boolean')
        }
    }
}

export function updateDrugImageUrl(drugID, fileToUpload, token, navigateTo, destination, setDrugImage){
    return async dispatch => {
        try {
            let { data } = await drugInstance({
                method: 'PATCH',
                url: `/updateDrugImageUrl/${drugID}`,
                headers: {
                    Accept: 'application/json',
                    authorization: token,
                    'content-type': 'multipart/form-data',
                },
                data: fileToUpload
            })
            navigateTo(destination)
        } catch (error) {
            console.log(error)
        }
    }
}

export function deleteDrugImageUrl(drugID, token){
    return async dispatch => {
        console.log('masuk ke action')
        try {
            let { data } = await drugInstance({
                method: 'PATCH',
                url: `/deleteDrugImageUrl/${drugID}`,
                headers: {
                    authorization: token,
                },
                data: {
                    key: drugID
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function updateFinishStatus(drugID, token){
    return async dispatch => {
        try {
            let { data } = await drugInstance({
                method: 'PATCH',
                url: `/updateFinishStatus/${drugID}`,
                headers: {
                    authorization: token
                },
            })
            return data.message
        } catch (error) {
            console.log(error.message, 'error at update finish status')
        }
    }
}