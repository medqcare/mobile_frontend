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
            if(error.message === 'Request failed with status code 404'){
                console.log("Web server is not connected, check your webBaseURL in config/index.js")
            } else {
                console.log(error.message)
            }
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