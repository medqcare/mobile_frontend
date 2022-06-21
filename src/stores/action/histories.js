import keys from "../keys";
import { instance } from '../../config'
import getToken from "../../helpers/localStorage/token";
import { ToastAndroid } from 'react-native'

const { 
    SET_ORDER_HISTORY,
    SET_ORDER_HISTORY_LOADING,
    SET_ORDER_HISTORY_ERROR,
    SET_TRANSACTION_HISTORY,
    SET_TRANSACTION_HISTORY_LOADING,
    SET_TRANSACTION_HISTORY_ERROR
} = keys.historyKeys

export function getAllOrderHistory(){
    return async dispatch => {
        try {
            console.log(`Application is trying to find patient's order history`)

            await dispatch({
                type: SET_ORDER_HISTORY_LOADING,
                payload: true
            })

            const token = await getToken()
            const { data } = await instance({
                method: 'GET',
                url: 'reservations/user?type=doctor',
                headers: {
                    Authorization: token
                },
            })

            const reversedData = data.reservations.reverse()
            let newOrderHistoryList = []

            for(let i = 0; i < reversedData.length; i++){
                const item = reversedData[i]
                if(item.status != 'booked') newOrderHistoryList.push(item)
            }

            console.log(`Application found ${newOrderHistoryList.length} orders`)

            await dispatch({
                type: SET_ORDER_HISTORY,
                payload: newOrderHistoryList
            })
        } catch (error) {
            console.log(error.message)
            await dispatch({
                type: SET_ORDER_HISTORY_ERROR,
                payload: error.message
            })
        }
    }
}

export function getAllTransactionHistory(patientID, IDs){
    return async dispatch => {
        try {
            console.log(`Application is trying to find patient's transaction history`)

            await dispatch({
                type: SET_TRANSACTION_HISTORY_LOADING,
                payload: true
            })

            const token = await getToken()
            const { data } = await instance({
                method: 'GET',
                url: `transactions/${patientID}`,
                headers: {
                    Authorization: token,
                    ids: IDs
                }
            })

            const { transactions } = data.data
            console.log(`Application found ${transactions.length} transaction(s)`)
            
            await dispatch({
                type: SET_TRANSACTION_HISTORY,
                payload: transactions
            })
        } catch (error) {
            console.log(error.message)
            await dispatch({
                type: SET_TRANSACTION_HISTORY_ERROR,
                payload: error.message
            })
        }
    }
}