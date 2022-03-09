import { instance } from '../../config';
import keys from '../keys';
import getToken from '../../helpers/localStorage/token';

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
                url: `searchDoctor?page=${currentPage}`,
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
