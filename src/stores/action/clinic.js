import { instance } from '../../config';
import keys from '../keys';
import getToken from '../../helpers/localStorage/token';
import withZero from '../../helpers/withZero';
import { ToastAndroid } from 'react-native';
import latLongToKM from '../../helpers/latlongToKM'

const {
    SET_CLINIC,
    SET_CLINIC_LOADING,
    SET_CLINIC_ERROR
} = keys.clinicKeys 

export function searchAllClinics(location, setClinic){
    return async (dispatch) => {
        try {
            console.log(`Application is trying to find available clinis`)
            await dispatch({
                type: SET_CLINIC_LOADING,
                payload: true
            })

            const lat = location?.lat
            const lng = location?.lng
            const { data } = await instance({
                method: 'POST',
                url: `searchFacility`,
                data: {
                    lat: lat ? lat : -6.268809,
                    lon: lng ? lng : 106.974705,
                    maxDistance: 1000000000,
                }
            })

            console.log(`Application found ${data.data.length} avalailable clinics`)
            await dispatch({
                type: SET_CLINIC,
                payload: data.data
            })
            await setClinic(data.data)


        } catch (error) {
            console.log(error, 'Error when searching for clinics')
            await dispatch({
                type: SET_CLINIC_ERROR,
                payload: error
            })
        }
    }
}

export function searchClinicByName(name, mainType, location, setClinic) {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_CLINIC_LOADING,
                payload: true
            })

            const { data, status } = await instance({
                method: 'GET',
                url: `facilityByName?facilityName=${name}&facilityMainType=${mainType}`
            })
            if(status === 204){
                await dispatch({
                    type: SET_CLINIC_LOADING,
                    payload: false
                })
            } else {
                data.data.sort((a, b) => { 
                    const { coordinates: coordinatesA } = a.location
                    const [ lngA, latA ] = coordinatesA

                    const { coordinates: coordinatesB } = a.location
                    const [ lngB, latB ] = coordinatesB

                    const { lat: userLat, lng: userLng } = location 

                    const distanceA = latLongToKM(lngA, latA, userLat, userLng)
                    const distanceB = latLongToKM(lngB, latB, userLat, userLng)

                    return distanceA - distanceB
                })
                
                await dispatch({
                    type: SET_CLINIC_LOADING,
                    payload: false
                })
                await setClinic(data.data)
            } 
        } catch (error) {
            console.log(error)
            await dispatch({
                type: SET_CLINIC_ERROR,
                payload: error
            })
        }
    }
}