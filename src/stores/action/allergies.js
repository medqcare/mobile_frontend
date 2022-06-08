import { instance } from '../../config';
import keys from '../keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getToken from '../../helpers/localStorage/token';


const {
    SET_ALLERGIES,
    SET_ALLERGIES_NEED_INFO,
    SET_ALLERGIES_KEY_SELECTION,
    SET_ALLERGIES_LOADING,
    SET_ALLERGIES_ERROR,
    DELETE_ALLERGIES
} = keys.allergyKeys

export function getPatientAllergies(patientID, isReservation){
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
                url: `alergies/${patientID}`,
                headers: { 
                    Authorization: token
                }
            })

            const allergyList = data.data.filter(el => el.status === 'Active')
            const allergyCount = allergyList.length
            
            if(allergyCount > 1){
                console.log(`Application found ${allergyCount} allergies for the selected patient`)
            } else {
                console.log(`Application found ${allergyCount} allergy for the selected patient`)
            }

            if(isReservation){
                // await dispatch({
                //     type: SET_ALLERGIES,
                //     payload: data.data
                // })

                await dispatch({
                    type: SET_ALLERGIES_LOADING,
                    payload: false
                })

                return data.data
            }

            let temp = {
                OBAT: [],
                MAKANAN: [],
                CUACA: [],
              };
            let fromPatient = false
            let fromDokter = false

            for(let i = 0; i < allergyCount; i++){
                const allergy = allergyList[i]
                if(allergy.createBy === 'Patient'){ fromPatient = true}
                if(allergy.createBy === 'Dokter'){ fromDokter = true}
                if (!temp[allergy.alergieType.toUpperCase()]) {
                    temp[allergy.alergieType.toUpperCase()] = [];
                }
                temp[allergy.alergieType.toUpperCase()].push({
                    id: allergy._id,
                    alergi: allergy.alergie,
                    createBy: allergy.createBy,
                });
            }

            const keySelection = Object.keys(temp);
            const index = keySelection.indexOf("");
            if (index !== -1) keySelection.splice(index, 1);

            await dispatch({
                type: SET_ALLERGIES_KEY_SELECTION,
                payload: keySelection
            })

            if (temp.OBAT.length === 0) delete temp.OBAT;
            if (temp.MAKANAN.length === 0) delete temp.MAKANAN;
            if (temp.CUACA.length === 0) delete temp.CUACA;

            if(fromPatient && fromDokter) {
                await dispatch({
                    type: SET_ALLERGIES_NEED_INFO,
                    payload: true
                })
            }
            
            await dispatch({
                type: SET_ALLERGIES,
                payload: temp
            })

            await dispatch({
                type: SET_ALLERGIES_LOADING,
                payload: false
            })
        } catch (error) {
            if(error?.response?.status){
                console.log(error?.response?.status, `Error found when trying to get patient's allergy`)
                await dispatch({
                    type: SET_ALLERGIES_ERROR,
                    payload: error.response.status
                })
            } else {
                console.log(error)
                await dispatch({
                    type: SET_ALLERGIES_ERROR,
                    payload: error
                })
            }
        }
    }
}

export function createAllergy(patientID, allergy, allergies, setInputAlergies){
    return async (dispatch) => {
        try {
            console.log('Application is trying to create a new allergy')

            await dispatch({
                type: SET_ALLERGIES_LOADING,
                payload: true
            })
            const token = await getToken()
            const { data } = await instance({
                method: 'POST',
                url: `alergies/${patientID}`,
                headers: {
                    Authorization: token
                },
                data: allergy,
            })

            const { _id: id, createBy, alergie: alergi, alergieType } = data.data
            const newAllergy = {
                id,
                alergi,
                createBy
            }

            const allergyType = alergieType.toUpperCase()
            let newAllergyList;
            if(Object.keys(allergies).length > 0){
                if(!allergies[allergyType]){
                    newAllergyList = {
                        ...allergies,
                        [allergyType]: [newAllergy]
                    }
                }
                else if(allergies[allergyType].length > 0){
                    const newAllergyTypes = [...allergies[allergyType], newAllergy]
                    newAllergyList = {
                        ...allergies,
                        [allergyType]: newAllergyTypes
                    }
                } 
            } else {
                newAllergyList = {
                    [allergyType]: [newAllergy]
                }
            }
            
            await dispatch({
                type: SET_ALLERGIES,
                payload: newAllergyList
            })

            await dispatch({
                type: SET_ALLERGIES_LOADING,
                payload: false
            })

            console.log('Application successfully created a new allergy')

            setInputAlergies("");
        } catch (error) {
            console.log(error)
            await dispatch({
                type: SET_ALLERGIES_ERROR,
                payload: error
            })
        }
    }
}

export function editSelectedAllergy(allergyID, allergy, allergyType, allergies, selected){
    return async dispatch => {
        try {
            console.log('Application is trying to edit selected allergy')

            await dispatch({
                type: SET_ALLERGIES_LOADING,
                payload: true
            })

            const token = await getToken()
            const { data } = await instance({
                method: 'PUT',
                url: `editAlergi/${allergyID}`,
                headers: {
                    Authorization: token
                },
                data: {
                    alergie: allergy,
                    alergieType: allergyType
                }
            })

            const { _id: id, createBy, alergie, alergieType } = data.data
            const editedAllergy = {
                id,
                alergi: alergie,
                createBy
            }

            let selectedAllergyTypes = []
            let newAllergyTypes

            if(selected === alergieType){
                // selectedAllergyTypes = [...allergies[allergyType], editedAllergy]
                selectedAllergyTypes = allergies[allergyType].map(el => {
                    if(id === el.id) el = editedAllergy
                    return el
                })

                const newAllergyList = {
                    ...allergies,
                    [allergyType]: selectedAllergyTypes
                }
    
                await dispatch({
                    type: SET_ALLERGIES,
                    payload: newAllergyList
                })
            } else {
                selectedAllergyTypes = allergies[selected].filter(el => el.id !== allergyID)
                if(!allergies[alergieType]) newAllergyTypes = [editedAllergy]
                else newAllergyTypes = [...allergies[alergieType], editedAllergy]

                const newAllergyList = {
                    ...allergies,
                    [selected]: selectedAllergyTypes,
                    [alergieType]: newAllergyTypes
                }

                if(newAllergyList[selected].length === 0) delete newAllergyList[selected]

                await dispatch({
                    type: SET_ALLERGIES,
                    payload: newAllergyList
                })
            }

            console.log('Application successfully edited the selected allergy')

            await dispatch({
                type: SET_ALLERGIES_LOADING,
                payload: false
            })
        } catch (error) {
            console.log(error, 'Error when trying to edit allergy') 
            await dispatch({
                type: SET_ALLERGIES_ERROR,
                payload: error
            })  
        }
    }
}

export function deleteSelectedAllergy(allergyID, allergies, allergyType){
    return async (dispatch) => {
        try {
            console.log(`Application is trying to delete selected allergy`)

            await dispatch({
                type: SET_ALLERGIES_LOADING,
                payload: true
            })

            const token = await getToken()
            const { data } = await instance({
                method: 'PUT',
                url: `alergies/${allergyID}`,
                headers: {
                    Authorization: token
                }
            })

            const newAllergyTypes = allergies[allergyType].filter(el => el.id !== allergyID)
            const newAllergyList = {
                ...allergies,
                [allergyType]: newAllergyTypes
            }

            if(newAllergyList[allergyType].length === 0) delete newAllergyList[allergyType]

            await dispatch({
                type: SET_ALLERGIES,
                payload: newAllergyList
            })

            await dispatch({
                type: SET_ALLERGIES_LOADING,
                payload: false
            })
        } catch (error) {
            console.log(error.response.message, `Error found when trying to get patient's allergy`)
            await dispatch({
                type: SET_ALLERGIES_ERROR,
                payload: error.response.status
            })
        }
    }
}
