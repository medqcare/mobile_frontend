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
    SET_SIGNUP_IS_REGISTERED,
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

// Not yet used
export function SignInGoogle(token, navigation, navigateTo) {
    console.log('ini di panggi diaction');
    return (dispatch) => {
      // console.log(navigation, 'ini navigationnya')
      instance({
        url: 'signinGoogle',
        method: 'POST',
        data: { token },
      })
        .then(({ data }) => {
          console.log('ini datanya dari backend', data);
          if (data.token == null) {
            dispatch({
              type: 'TOGGLE_LOADING',
              payload: false,
            });
            alert(data.message);
          } else {
            storeToken({ token: data.token });
            return instance({
              url: 'dataLogged',
              method: 'GET',
              headers: {
                Authorization: data.token,
              },
            });
          }
        })
        .then(async ({ data }) => {
          console.log(data, 'ini yang kedua');
          try {
            if (data.data === null) {
              console.log('masuk if yg ini');
              navigation.navigate('UserDataCompletion');
            } else {
              console.log('masuk else');
              await dispatch({
                type: 'AFTER_SIGNIN',
                payload: data.data,
              });
              await dispatch({
                type: 'SET_MY_LOCATION',
                payload: {
                  lat: data.data.location.coordinates[1],
                  lng: data.data.location.coordinates[0],
                },
              });
              navigation.pop();
              navigateTo
                ? navigation.navigate(navigateTo)
                : navigation.navigate('Home');
            }
          } catch (error) {
            dispatch({
              type: 'TOGGLE_LOADING',
              payload: false,
            });
            ToastAndroid.show(
              `${error.response.data.errors}`,
              ToastAndroid.SHORT
            );
          }
        })
        .catch((err) => {
          dispatch({
            type: 'TOGGLE_LOADING',
            payload: false,
          });
          console.log('idihhh kenapa nihhhh');
          console.log(err);
          // ToastAndroid.show(`${err.response.data.errors}`, ToastAndroid.SHORT)
          // console.log(err.response.data)
        });
    };
}

export function credentialCheck(payload){
    return async dispatch => {
        try {
            dispatch({
                type: SET_SIGNUP_LOADING,
                payload: true
            })

            const { data } = await instance({
                method: 'POST',
                url: 'check/phone/email',
                data: payload
            })

            return data
        } catch (error) {
            dispatch({
                type: SET_SIGNUP_ERROR,
                payload: error.message
            })
        } finally {
            dispatch({
                type: SET_SIGNUP_LOADING,
                payload: false
            })
        }
    }
}

export function addNewUser(payload, navigation){
    return async dispatch => {
        try {
            const { data } = await instance({
                method: 'POST',
                url: 'users',
                data: payload
            })

            const { token } = data.data
            await storeToken({ token })
            await dispatch({
                type: SET_SIGNUP_LOADING,
                payload: false
            })

            if(token){
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

                if (!userData.data){
                    navigation.navigate('UserDataCompletion', {
                        phoneNumber: payload.phoneNumber,
                    });
                } else {
                    navigation.navigate('Home');
                }

                await dispatch({
                    type: SET_SIGNIN_LOADING,
                    payload: false
                })
            }
            
            await dispatch({
                type: SET_SIGNUP_LOADING,
                payload: false
            })
        } catch (error) {
            
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
            
            ToastAndroid.show(`Logout success`, ToastAndroid.SHORT);
        } catch (error) {
            
        }
    }
}