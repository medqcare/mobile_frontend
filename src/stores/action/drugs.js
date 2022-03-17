import axios from 'axios';
import { instance } from '../../config';
import keys from '../keys';
import getToken from '../../helpers/localStorage/token';
import { ToastAndroid } from 'react-native';

const { 
    SET_DRUGS,
    SET_WEB_DRUGS,
    SET_ACTIVE_DRUGS,
    SET_FINISHED_DRUGS,
    SET_DRUGS_LOADING,
    SET_WEB_DRUGS_LOADING,
    SET_DRUGS_ERROR,
    SET_WEB_DRUGS_ERROR,
    DELETE_DRUGS
} = keys.drugKeys

export function getDrugs(patientID){
    return async dispatch => {
        try {
            await dispatch({
                type: SET_DRUGS_LOADING,
                payload: true
            })

            const token = await getToken()
            let { data } = await instance({
                method: 'GET',
                url: `/getAllDrugs/${patientID}`,
                headers: {
                    authorization: token
                },
            })

            const revised = data.data.map(el => {
                el.name = el.itemName
                return el
            })

            const activeDrugs = []
            const finishedDrugs = []
            for(let i = 0; i < revised.length; i++){
                if(revised[i].isFinished) finishedDrugs.push(revised[i])
                else activeDrugs.push(revised[i])
            }

            await dispatch({
                type: SET_DRUGS,
                payload: {
                    activeDrugs,
                    finishedDrugs
                }
            })
        } catch (error) {
            console.log(error, 'error di action drugs')
        }
    }
}

export function searchDrugByName(query){
    return async dispatch => {
        try {
            let { data } = await instance({
                method: 'GET',
                url: `/drugs?name=${query}`,
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
            console.log('Application is trying to find all drugs from web')
            await dispatch({
                type: SET_WEB_DRUGS_LOADING,
                payload: true
            })
            let { data } = await instance({
                method: 'GET',
                url: `/drugs`,
            })

            console.log(`Application found ${data.data.length} drugs from web`)

            const revised = data.data.map(el => {
                el.name = el.itemName
                return el
            })

            await dispatch({
                type: SET_WEB_DRUGS,
                payload: revised
            })

            await dispatch({
                type: SET_WEB_DRUGS_LOADING,
                payload: false
            })
        } catch (error) {
            await dispatch({
                type: SET_WEB_DRUGS_ERROR,
                payload: error.message
            })
            console.log(error, 'error at web drugs')
        }
    }
}

export function createNewDrugFromUser(newDrug, activeDrugs){
    return async dispatch => {
        try {
            await dispatch({
                type: SET_DRUGS_LOADING,
                payload: true
            })

            const token = await getToken()
            let { data } = await instance({
                method: 'POST',
                url: `/createNewDrugFromUser`,
                headers: {
                    authorization: token
                },
                data: newDrug
            })

            const newActiveDrugs = [...activeDrugs, data.data]

            await dispatch({
                type: SET_ACTIVE_DRUGS,
                payload: newActiveDrugs
            })

            await dispatch({
                type: SET_DRUGS_LOADING,
                payload: false
            })
        } catch (error) {
            console.log(error.message, 'error at create new Drug')
        }
    }
}

export function changeDrugNotes(drugID, notes, activeDrugs){
    return async dispatch => {
        try {
            const token = await getToken()
            let { data } = await instance({
                method: 'PATCH',
                url: `changeDrugNotes/${drugID}`,
                headers: {
                    authorization: token
                },
                data: { notes },
            })
            const { message, data: result } = data
            const newActiveDrugs = activeDrugs.map(el => {
                if(el._id === drugID){
                    el.notes = result
                }
                return el
            })
            await dispatch({
                type: SET_ACTIVE_DRUGS,
                payload: newActiveDrugs
            })
            ToastAndroid.show(message, ToastAndroid.SHORT)
        } catch (error) {
            return error.message
        }
    }
}

export function changeAlarmBoolean(drugID){
    return async dispatch => {
        try {
            const token = await getToken()
            let { data } = await instance({
                method: 'PATCH',
                url: `changeAlarmBoolean/${drugID}`,
                headers: {
                    authorization: token
                },
            })
            ToastAndroid.show(data.message, ToastAndroid.SHORT)
        } catch (error) {
            console.log(error.message, 'error at change alarm boolean')
        }
    }
}

export function updateDrugImageUrl(drugID, fileToUpload, navigateTo, destination, activeDrugs){
    return async dispatch => {
        try {
            await dispatch({
                type: SET_DRUGS_LOADING,
                payload: true
            })
            const token = await getToken()
            let { data } = await instance({
                method: 'PATCH',
                url: `updateDrugImageUrl/${drugID}`,
                headers: {
                    Accept: 'application/json',
                    Authorization: token,
                    'content-type': 'multipart/form-data',
                },
                data: fileToUpload
            })

            const newActiveDrugs = activeDrugs.map(el => {
                if(el._id === drugID){
                    el.imageUrl = data.newImageUrl
                }
                return el
            })

            await dispatch({
                type: SET_ACTIVE_DRUGS,
                payload: newActiveDrugs
            })
            
            await dispatch({
                type: SET_DRUGS_LOADING,
                payload: false
            })
            navigateTo(destination)
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export function deleteDrugImageUrl(drugID, activeDrugs){
    return async dispatch => {
        try {
            const token = await getToken()
            let { data } = await instance({
                method: 'PATCH',
                url: `deleteDrugImageUrl/${drugID}`,
                headers: {
                    authorization: token,
                },
                data: {
                    key: drugID
                }
            })
            const newActiveDrugs = activeDrugs.map(el => {
                el.imageUrl = ''
                return el
            })

            await dispatch({
                type: SET_ACTIVE_DRUGS,
                payload: newActiveDrugs
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function updateFinishStatus(drugID, activeDrugs, finishedDrug, finishedDrugs){
    return async dispatch => {
        try {
            await dispatch({
                type: SET_DRUGS_LOADING,
                payload: true
            })
            const token = await getToken()
            let { data } = await instance({
                method: 'PATCH',
                url: `/updateFinishStatus/${drugID}`,
                headers: {
                    authorization: token
                },
            })

            const newActiveList = activeDrugs.filter(el => el._id !== drugID)
            const newFinishedList = [...finishedDrugs, finishedDrug]

            await dispatch({
                type: SET_DRUGS,
                payload: {
                    activeDrugs: newActiveList,
                    finishedDrugs: newFinishedList
                }
            })

            ToastAndroid.show(data.message, ToastAndroid.SHORT)
        } catch (error) {
            console.log(error.message, 'error at update finish status')
        }
    }
}