import { instance } from '../../config';
import keys from '../keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getToken from '../../helpers/localStorage/token';
import { ToastAndroid } from 'react-native';

const { 
    SET_USER_DATA,
    SET_USER_DATA_LOADING,
    SET_USER_DATA_ERROR,
    DELETE_USER_DATA
} = keys.userDataKeys

const {
    SET_SIGNIN_LOADING,
    SET_SIGNIN_ERROR,
    SET_SIGNUP_LOADING,
    SET_SIGNUP_ERROR,
} = keys.entryKeys

const { 
    SET_USER_LOCATION,
    SET_USER_LOCATION_LOADING,
    SET_USER_LOCATION_ERROR,
    DELETE_USER_LOCATION
} = keys.userLocationKeys

async function storeToken(data){
    console.log(data, 'This is the token after signing in');
    try {
      await AsyncStorage.setItem('token', JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
};

export function signIn(userData, navigation, modalF, navigateTo){
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_SIGNIN_LOADING,
                payload: true
            })

            console.log(userData, 'Email and password of the user trying to sign in');

            const { data } = await instance({
                method: 'POST',
                url: 'authentication',
                data: userData
            })

            const { token, message } = data.data

            if(token){
                await storeToken({ token })
                const { data: userData } = await instance({
                    method: 'GET',
                    url: 'dataLogged',
                    headers: {
                        Authorization: token
                    }
                })

                await dispatch({
                    type: SET_USER_DATA,
                    payload: userData.data
                })

                await dispatch({
                    type: SET_SIGNIN_LOADING,
                    payload: false
                })
                if(userData.data === null) {
                    navigation.navigate('UserDataCompletion');
                } else {
                    // const [lng, lat] = data.data.location.coordinates
                    // await dispatch({
                    //     type: SET_USER_LOCATION,
                    //     payload: {
                    //       lat,
                    //       lng,
                    //     },
                    // });
                    navigation.pop();
                    navigateTo
                    ? navigation.navigate(navigateTo)
                    : navigation.navigate('Home');
                }
            } else if(message){
                throw { message }
            }

            
        } catch (error) {
            const { response, message } = error
            if(response.data?.message){
                console.log(response.data.message, 'This is the response')
            }
            console.log(message, 'This is the error message')

            if(response){
                if(response.status == 401) {
                    modalF('Email and password not match')
                    return await dispatch({
                        type: SET_SIGNIN_ERROR,
                        payload: 'Email and password not match'
                    })
                }
                else {
                    return modalF(message)
                }
            } else modalF(message)

            await dispatch({
                type: SET_SIGNIN_ERROR,
                payload: message
            })
        }
    }
}

export function signUp(userData, navigation, modalFailed) {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_SIGNUP_LOADING,
                payload: true
            })
            const { email } = userData;
            console.log(email, 'is signing up')
            const { data } = await instance({
                url: 'signup',
                method: 'POST',
                data: userData,
            })
            const { message } = data
            console.log('Message from server:', message)
            dispatch({
                type: SET_SIGNUP_LOADING,
                payload: false
            })
            navigation.navigate('SuccessSignUp', { email });
        } catch (error) {
            const { response } = error
            const errorMessage = response ? response.data.err.message : error.message
            console.log('Error from server:', errorMessage)
            modalFailed(errorMessage)
            dispatch({
                type: SET_SIGNUP_ERROR,
                payload: errorMessage
            })
        }
    }
}

export function logout(navigation){
    return async dispatch => {
        try {
            const token = await getToken()
            const { data } = await instance({
                method: 'PATCH',
                url: `firebase/token`,
                headers: {
                    Authorization: token
                },
                data: {
                    token: ''
                }
            })

            await dispatch({
                type: SET_USER_DATA,
                payload: null
            })

            await AsyncStorage.removeItem('token');
            await navigation.pop();
            await navigation.navigate('Sign');
            
            ToastAndroid.show(`Logout success`, ToastAndroid.SHORT);
        } catch (error) {
            
        }
    }
}