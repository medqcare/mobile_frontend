import { instance } from '../../config';
import keys from '../keys';
import getToken from '../../helpers/localStorage/token';
import withZero from '../../helpers/withZero';
import { ToastAndroid } from 'react-native';

const { 
    SET_DOCTORS,
    SET_CURRENT_PAGE,
    SET_DOCTORS_LOADING,
    SET_DOCTORS_ERROR
} = keys.doctorKeys

export function searchAllDoctors(currentPage, location, doctors){
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_DOCTORS_LOADING,
                payload: true
            })
            // const token = await getToken()
            
            const lat = location?.lat
            const lng = location?.lng
            const { data } = await instance({
                method: 'POST',
                url: `searchDoctor?page=${currentPage}`,
                data: {
                    lat: lat ? lat : -6.268809,
                    lon: lng ? lng : 106.974705,
                    maxDistance: 1000000
                },
                timeout: 4000
            })

            if(currentPage == 0 ) {
                await dispatch({
                    type: SET_DOCTORS,
                    payload: data.data
                })
            } else {
                await dispatch({
                    type: SET_DOCTORS,
                    payload: [...doctors, ...data.data]
                })
            }

            const nextPage = currentPage + 1

            await dispatch({
                type: SET_CURRENT_PAGE,
                payload: nextPage
            })

            await dispatch({
                type: SET_DOCTORS_LOADING,
                payload: false
            })
        } catch (error) {
            console.log(error, 'Error search all doctors')
            await dispatch({
                type: SET_DOCTORS_ERROR,
                payload: error.message
            })
        }
    }
}

export function searchDoctorBySpecialist(currentPage, specialist, doctors){
    return async (dispatch) => {
        try {
            console.log(specialist)
            await dispatch({
                type: SET_DOCTORS_LOADING,
                payload: true
            })

            const { data } = await instance({
                method: 'POST',
                url: `searchDoctor?page=${currentPage}`,
                data: {
                    maxDistance: 1000000,
                    specialist
                },
                timeout: 4000
            })

            if(currentPage == 0 ) {
                await dispatch({
                    type: SET_DOCTORS,
                    payload: data.data
                })
            } else {
                await dispatch({
                    type: SET_DOCTORS,
                    payload: [...doctors, ...data.data]
                })
            }

            await dispatch({
                type: SET_DOCTORS_LOADING,
                payload: false
            })
        } catch (error) {
            console.log(error)
            await dispatch({
                type: SET_DOCTORS_ERROR,
                payload: error.message
            })
        }
    }
}

export function searchDoctorByName(currentPage, searchQuery, location, specialist, doctors){
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_DOCTORS_LOADING,
                payload: true
            })
            const token = await getToken(token)
            console.log(specialist, searchQuery)
            const lat = location?.lat
            const lng = location?.lng
            const { data } = await instance({
                method: 'POST',
                url: `searchDoctor?page=0`,
                data: {
                    lat: lat ? lat : -6.268809,
                    lon: lng ? lng : 106.974705,
                    maxDistance: 1000000,
                    name: searchQuery,
                    specialist
                }
            })

            if(currentPage == 0 ) {
                await dispatch({
                    type: SET_DOCTORS,
                    payload: data.data
                })
            } else {
                await dispatch({
                    type: SET_DOCTORS,
                    payload: [...doctors, ...data.data]
                })
            }

            await dispatch({
                type: SET_DOCTORS_LOADING,
                payload: false
            })
        } catch (error) {
            console.log(error)
            await dispatch({
                type: SET_DOCTORS_ERROR,
                payload: error.message
            })
        }
    }
}

export function makeReservation(reservationData, setModal){
    return async (dispatch) => {
        try {
            console.log('Application is trying to create reservation')
            await dispatch({
                type: SET_DOCTORS_LOADING,
                payload: true
            })

            const date = new Date(reservationData.bookingSchedule)
            const month = withZero(date.getMonth() + 1)
            const day = withZero(date.getDate())
            const year = date.getFullYear()
            reservationData.bookingSchedule = `${day}/${month}/${year}`

            const token = await getToken()

            const { data } = await instance({
                method: 'POST',
                url: 'makeReservation',
                data: reservationData,
                headers: {
                    Authorization: token
                }
            })

            if(data.message === 'already reserve for that patient'){
                ToastAndroid.show(data.message, ToastAndroid.LONG);
            } 
            else if(data.message === 'fail'){
                ToastAndroid.show(data.message, ToastAndroid.LONG);
            } else {
                setModal(true)
            }

            await dispatch({
                type: SET_DOCTORS_LOADING,
                payload: false
            })
        } catch(error){
            if(error?.response?.data){
                console.log(error.response.data)
                await dispatch({
                    type: SET_DOCTORS_ERROR,
                    payload: error.response.data
                })
            } else {
                console.log(error.message)
                await dispatch({
                    type: SET_DOCTORS_ERROR,
                    payload: error.message
                })
            }
        }
    }
}
