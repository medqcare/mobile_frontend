import { instance } from '../../config';
import keys from '../keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getToken from '../../helpers/localStorage/token';


const {
    SET_ALLERGIES,
    SET_NEED_INFO,
    SET_ALLERGIES_LOADING,
    SET_ALLERGIES_ERROR,
    DELETE_ALLERGIES
} = keys.allergyKeys

// Belum selesai
export function getPatientAllergies(patientID){
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_ALLERGIES_LOADING,
                payload: true
            })

            console.log(`Application is trying to find patient's allergies`)
            const token = await getToken()
            const { data } = await instance({
                method: 'GET',
                url: `allergies/${patientID}`,
                headers: { 
                    Authorization: token
                }
            })

            const allergyList = data.data
            const allergyCount = allergyList.length
            let activeAllergyList = []
            let fromPatient = false
            let fromDokter = false

            if(allergyCount > 1){
                console.log(`Application found ${allergyCount} allergies for the selected patient`)
            } else {
                console.log(`Application found ${allergyCount} allergy for the selected patient`)
            }

            for(let i = 0; i < allergyCount; i++){
                const allergy = allergyList[i]
                if(allergy.status === 'Active'){
                    if(el.createBy === 'Patient'){ fromPatient = true}
                    if(el.createBy === 'Dokter'){ fromDokter = true}
                }
            }

            if(fromPatient && fromDokter) {
                await dispatch({
                    type: SET_NEED_INFO,
                    payload: true
                })
            }

            await dispatch({
                type: SET_ALLERGIES,
                payload: data.data
            })

            await dispatch({
                type: SET_ALLERGIES_LOADING,
                payload: false
            })
        } catch (error) {
            console.log(error.response.status, `Error found when trying to get patient's allergy`)
            await dispatch({
                type: SET_ALLERGIES_ERROR,
                payload: error.response.status
            })
        }
    }
}

export function createAllergy(){
    return async (dispatch) => {
        try {
            
        } catch (error) {
            
        }
    }
}

export function deleteSelectedAllergy(allergyID, allergies){
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_ALLERGIES_LOADING,
                payload: true
            })

            console.log(`Application is trying to delete selected allergy`)
            const token = await getToken()

            const { data } = await instance({
                method: 'PUT',
                url: `allergies/${allergyID}`,
                headers: {
                    Authorization: token
                }
            })

            const newAllergies = allergies.filter(el => el._id !== allergyID)

            await dispatch({
                type: SET_ALLERGIES,
                payload: newAllergies
            })

            await dispatch({
                type: SET_ALLERGIES_LOADING,
                payload: false
            })
        } catch (error) {
            console.log(error.response.status, `Error found when trying to get patient's allergy`)
            await dispatch({
                type: SET_ALLERGIES_ERROR,
                payload: error.response.status
            })
        }
    }
}
