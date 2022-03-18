import { instance } from "../../config";
import getToken from "../../helpers/localStorage/token";
import keys from "../keys";

const {
    SET_QUEUES,
    SET_QUEUES_NUMBER,
    SET_QUEUES_LOADING,
    SET_QUEUES_ERROR,
} = keys.queueKeys

export function getTodaysRegistration(userID){
    return async dispatch => {
        try {
            console.log(`Application is trying to find today's registration`);
        
            await dispatch({
                type: SET_QUEUES_LOADING,
                payload: true
            })

            const token = await getToken()
            const { data } = await instance({
                method: 'POST',
                url: `getTodayRegistration`,
                headers: {
                    Authorization: token
                },
                data: {
                    userID
                }
            })

            const length = data ? data.data.length : 0

            console.log(`Application found ${length} queue(s) data`)

            dispatch({
                type: SET_QUEUES,
                payload: data ? data.data : []
            })
            
        } catch (error) {
            console.log(error)
        }
        
    }
}

export function fetchCurrentQueueingNumber(queueID) {
    return async dispatch => {
        try {
            await dispatch({
                type: SET_QUEUES_LOADING,
                payload: true
            })

            const token = await getToken()
            const { data } = await instance({
                method: 'POST',
                url: `getQueueId`,
                headers: {
                    Authorization: token
                },
                data: {
                    queueID
                }
            })

            await dispatch({
                type: SET_QUEUES_NUMBER,
                payload: data.data.currentQueueingNumber
            })
        } catch (error) {
            console.log(error)
        }
    }
}