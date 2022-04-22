import keys from "../keys";
import { instance } from '../../config'
import getToken from "../../helpers/localStorage/token";
import { ToastAndroid } from 'react-native'

const {
    SET_TRANSACTION,
    SET_TRANSACTION_LOADING,
    SET_TRANSACTION_ERROR
} = keys.transactionKeys

export function getAllTransactions(patientID){
    return async dispatch => {
        try {
            console.log(`Application is trying to find the latest bills`)

            await dispatch({
                type: SET_TRANSACTION_LOADING,
                payload: true
            })

            const token =  await getToken()
            const { data } = await instance({
                method: 'GET',
                url: `transactions/${patientID}/latest`,
                headers: {
                    Authorization: token
                }
            })

            console.log(`Application found the latest transaction`)

            await dispatch({
                type: SET_TRANSACTION,
                payload: data.data.transaction
            })
        } catch (error) {
            console.log(error.message)
            
            await dispatch({
                type: SET_TRANSACTION_ERROR,
                payload: error.message
            })
        }
    }
}
