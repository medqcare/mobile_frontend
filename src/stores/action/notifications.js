import { instance } from "../../config";
import getToken from "../../helpers/localStorage/token";
import keys from "../keys";

const { 
    SET_NOTIFICATIONS,
    SET_NOTIFICATIONS_COUNT,
    SET_NOTIFICATIONS_LOADING,
    SET_NOTIFICATIONS_ERROR,
} = keys.notificationKeys

export function getAllNotifications(patientID, parentID){
    return async dispatch => {
        try {
            console.log(`Application is trying to get all notifications`)

            await dispatch({
                type: SET_NOTIFICATIONS_LOADING,
                payload: true
            })

            const token = await getToken()
            const { data } = await instance({
                method: 'GET',
                url: `notifications/${patientID}/${parentID}`,
                headers: {
                    Authorization: token
                }
            })
            const { notifications } = data

            console.log(`Application found ${notifications.length} notifications`)
            
            await dispatch({
                type: SET_NOTIFICATIONS,
                payload: notifications
            })
        } catch (error) {
            console.log(error.message)

            await dispatch({
                type: SET_NOTIFICATIONS_ERROR,
                payload: error.message
            })
        }
    }
}

export function patchNotificationAsViewed(notificationID, notifications, notificationsCount){
    return async dispatch => {
        try {
            console.log(`Application is trying to patch notifications as viewed`)

            await dispatch({
                type: SET_NOTIFICATIONS_LOADING,
                payload: true
            })

            const token = await getToken()
            const { data } = await instance({
                method: 'PATCH',
                url: `notifications/${notificationID}`,
                headers: {
                    Authorization: token
                }
            })

            console.log(`Application patched notifications as viewed`)

            const newNotificationsList = notifications.filter(el => el._id !== notificationID)
            await dispatch({
                type: SET_NOTIFICATIONS,
                payload: newNotificationsList
            })

            const newNotificationsCount = notificationsCount - 1
            await dispatch({
                type: SET_NOTIFICATIONS_COUNT,
                payload: newNotificationsCount
            })
        } catch (error) {
            console.log(error.message)

            await dispatch({
                type: SET_NOTIFICATIONS_ERROR,
                payload: error.message
            })
        }
    }
}