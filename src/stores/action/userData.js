import { instance } from '../../config';
import keys from '../keys';
import getToken from '../../helpers/localStorage/token';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid, Alert, ShadowPropTypesIOS } from 'react-native';

const { 
    SET_USER_DATA,
    SET_USER_DATA_LOADING,
    SET_USER_DATA_ERROR,
    DELETE_USER_DATA,
    SET_DARKMODE
} = keys.userDataKeys

const { 
    SET_SIGNUP_LOADING,
    SET_SIGNUP_ERROR
} = keys.entryKeys

export function setUserData(payload) {
    return {
        type: SET_USER_DATA,
        payload: payload
    }
}

export function setDarkMode(payload) {
    return {
        type: SET_DARKMODE,
        payload
    }
}

export function createPatientAsUser(payload, modalSuccess, modalFailed, navigateTo){
    return async dispatch => {
        try {
            console.log('Application is trying to send patient data to server')

            await dispatch({
                type: SET_USER_DATA_LOADING,
                payload: true
            })

            const token = await getToken()
            const { data: response } = await instance({
                method: 'POST',
                url: 'createProfile',
                headers: {
                    Authorization: token,
                },
                data: payload
            })

            console.log('Application received data from server')

            const { data, message } = response
            if(data !== null){
                if(message === 'NIK already registered'){
                    ToastAndroid.show(message, ToastAndroid.LONG)
                } else {
                    await dispatch({
                        type: SET_USER_DATA,
                        payload: data,
                    });

                    ToastAndroid.show(
                        'Data saved, redirecting you to our home screen...',
                        ToastAndroid.SHORT
                    );

                    modalSuccess(message)
                    navigateTo('Home', { from: 'registration' });
                }
            }
        } catch(error){
            modalFailed(error);
            console.log(error.message)
            await dispatch({
                type: SET_USER_DATA_ERROR,
                payload: error.message
            })
        }
    }
}

export function getLoggedData(navigation){
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_USER_DATA_LOADING,
                payload: true
            })
            
            const token = await getToken()
            if(!token){
                return await dispatch({
                    type: SET_USER_DATA_LOADING,
                    payload: false
                })
            }
            console.log(token);
            console.log('Above is the token that is already in AsyncStorage');
            console.log('Application is trying to GET dataLogged');

            const { data } = await instance({
                method: 'GET',
                url: 'dataLogged',
                headers: { Authorization: token}
            })

            if(data.data) {
                console.log('Application Found dataLogged');
                // await AsyncStorage.setItem('userData', JSON.stringify(data.data));
                
                await dispatch({
                    type: SET_USER_DATA,
                    payload: data.data,
                });

                await dispatch({
                    type: SET_USER_DATA_LOADING,
                    payload: false
                })
            } else {
                console.log(`Application didn't find dataLogged`);
                await dispatch({
                    type: SET_USER_DATA_LOADING,
                    payload: false
                })
                navigation.navigate('UserDataCompletion')
            }

        } catch (error) {
            ToastAndroid.show(
                `Please check your internet connection`,
                ToastAndroid.LONG
            );
            await dispatch({
                type: SET_USER_DATA_LOADING,
                payload: false
            })
            console.log('Error found in function getLoggedData ==>', error.message);
        }
    }
}

export function updateProfilePicture(patientId, fileToUpload, navigateTo, destination, patientData) {
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_USER_DATA_LOADING,
                payload: true
            })
            console.log('Application is trying to upload the image...')
            console.log(fileToUpload)
            const token = await getToken()
            const { data } = await instance({
                method: 'PATCH',
                url: 'updateAvatar',
                data: fileToUpload,
                headers: {
                    Accept: 'application/json',
                    authorization: token,
                    id: 
                    patientId,
                    'content-type': 'multipart/form-data',
                },
            })

            console.log('server has successfully updated Image Url')

            const { message, avatarLink } = data
            patientData.imageUrl = avatarLink

            // await dispatch({
            //     type: SET_USER_DATA,
            //     payload: userData
            // })

            await dispatch({
                type: SET_USER_DATA_LOADING,
                payload: false
            })

            ToastAndroid.show(message, ToastAndroid.SHORT);
            navigateTo(destination);
        } catch (error) {
            console.log(error.response || error, 'Error found when trying to upload avatar');
        }
    }
}

export function deleteProfileImage(patientID, userData){
    return async dispatch => {
        try {
            await dispatch({
                type: SET_USER_DATA_LOADING,
                payload: true
            })

            console.log('Application is trying to delete profile image....');

            const token = await getToken()
            const { data } = await instance({
                method: 'PATCH',
                url: 'deleteAvatar',
                headers: {
                    id: patientID,
                    Authorization: token
                }
            })

            userData.imageUrl = ''

            await dispatch({
                type: SET_USER_DATA,
                payload: userData
            })

            console.log('Server has successfully deleted imageUrl');
            ToastAndroid.show(data.message, ToastAndroid.SHORT)
        } catch (error) {
            console.log(error.message)
        }
    }
}

export function updateProfileData(updateData, patientID, parentID, navigate, navigateTo, userData){
    console.log('Sending data to server...')
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_USER_DATA_LOADING,
                payload: true
            })
            
            const token = await getToken()
            const { data } = await instance({
                method: 'PATCH',
                url: `editProfile/${patientID}`,
                headers: { 
                    Authorization: token,
                    parentID: parentID
                },
                data: updateData
            })
            await dispatch({
                type: SET_USER_DATA_LOADING,
                payload: false
            })

            await dispatch({
                type: SET_USER_DATA,
                payload: data.data
            })

            ToastAndroid.show(data.message, ToastAndroid.SHORT);

            navigate(navigateTo)
        } catch (error) {
            console.log(error)
        }
    }
}

export function verirfyPassword(payload, onSuccess){
    return async dispatch => {
        try {
            console.log('Application is trying to verify your password')

            await dispatch({
                type: SET_USER_DATA_LOADING,
                payload: true
            })

            const token = await getToken()
            const { data } = await instance({
                method: 'POST',
                url: `verify/password`,
                headers: {
                    Authorization: token
                },
                data: payload
            })

            if(typeof onSuccess === 'function'){
                console.log('Application succesfully verified the password')

                ToastAndroid.show('Verifikasi Berhasil', ToastAndroid.LONG);
                await dispatch({
                    type: SET_USER_DATA_ERROR,
                    payload: null
                })

                await dispatch({
                    type: SET_USER_DATA_LOADING,
                    payload: false
                })

                onSuccess();
            }
        } catch (error) {
            ToastAndroid.show(
                'Verifikasi gagal, silahkan coba lagi',
                ToastAndroid.LONG
            );

            await dispatch({
                type: SET_USER_DATA_LOADING,
                payload: false
            })

            await dispatch({
                type: SET_USER_DATA_ERROR,
                payload: error.response.data.message
            })

            console.log(error.response.data.message)
        }
    }
}

export function resetAccountPassword(payload, navigateTo, destination){
    return async dispatch => {
        try {
            console.log('Application is sending data to reset your password')

            await dispatch({
                type: SET_SIGNUP_LOADING,
                payload: true
            })

            const { data } = await instance({
                method: 'PATCH',
                url: `user/password`,

                data: payload
            })

            console.log('Password succesfully changed')

            await dispatch({
                type: SET_SIGNUP_LOADING,
                payload: true
            })

            ToastAndroid.show(
                'Sukses atur ulang sandi, silahkan login',
                ToastAndroid.LONG
            );
            navigateTo(destination)
        } catch (error) {
            console.log(error.response.data)

            await dispatch({
                type: SET_SIGNUP_LOADING,
                payload: true
            })

            await dispatch({
                type: SET_SIGNUP_ERROR,
                payload: error.response.data.message
            })

            ToastAndroid.show(
                `Atur ulang sandi gagal: ${error.response.data.message}`,
                ToastAndroid.LONG
            );
        }
    }
}

export function changeAccountPassword(email, password, navigate, navigateTo){
    return async (dispatch) => {
        try {
            console.log('Application is sending request to change password...');
            const { data } = await instance({
                method: 'POST',
                url: `changePassword`,
                data: {
                  email,
                  password,
                },
            });
            if (data.message) {
                console.log(data.message);
                ToastAndroid.show(data.message, ToastAndroid.SHORT);
                navigate(navigateTo);
              } else {
                ToastAndroid.show(data.error, ToastAndroid.SHORT);
              }
        } catch(error) {
            console.log(error)
        }
    }
}

export function createNewFamily(newPatientData, navigation, navigateTo, userData){
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_USER_DATA_LOADING,
                payload: true
            })
            const token = await getToken()
            const { data: result } = await instance({
                method: 'POST',
                url: 'addFamily',
                data: newPatientData,
                headers: {
                    Authorization: token
                }
            })
            const { message, data , error} = result
            const alreadyRegistered = 'NIK sudah didaftarkan'
            const cantAddTwice = 'cannot add same family twice'
            const unauthorizedNIK = `NIK tidak boleh sama dengan pemilik akun`
            const errorMessage = 'NIK sudah terdaftar, Berhasi menambahkan data sebelumnya'
            const successMessage = 'Berhasil menambahkan keluarga'

            if(data === cantAddTwice){
                await dispatch({
                    type: SET_USER_DATA_LOADING,
                    payload: false
                })
                ToastAndroid.show(alreadyRegistered, ToastAndroid.SHORT)
                // if(data === cantAddTwice){
                    
                // } else {
                //     const newUserData = {
                //         ...userData,
                //         family: userData.family.concat(newPatientData)
                //     }

                //     await dispatch({
                //         type: SET_USER_DATA,
                //         payload: newUserData
                //     })

                //     navigation.navigate('FamilyList');

                //     ToastAndroid.show(errorMessage, ToastAndroid.LONG);
                // }
            } else if(message === 'Family NIK same as Parent NIK') {
                await dispatch({
                    type: SET_USER_DATA_LOADING,
                    payload: false
                })
                ToastAndroid.show(unauthorizedNIK, ToastAndroid.SHORT);
            } else {
                console.log('Successfully added family member');
                console.log('Navigating back to family list...');

                await dispatch({
                    type: SET_USER_DATA,
                    payload: data
                })

                await dispatch({
                    type: SET_USER_DATA_LOADING,
                    payload: false
                })

                navigation.navigate('FamilyList');

                ToastAndroid.show(successMessage, ToastAndroid.SHORT)
            }
            
        } catch (error) {
            console.log(error, 'Error found when adding a new family')
            ToastAndroid.show(`${error.response.data.errors[0]}`, ToastAndroid.LONG)
        }
    }
}

export function deleteFamilyData(userData, patientId){
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_USER_DATA_LOADING,
                payload: true
            })

            const token = await getToken()
            const { data } = await instance({
                method: 'PUT',
                url: 'deleteFamily',
                headers: {
                    Authorization: token
                }, 
                data: {
                    patientId
                }
            })
            ToastAndroid.show(data.message, ToastAndroid.SHORT);
            const newFamilyList = userData.family.filter(el => el._id !== patientId)
            const newUserData = {
                ...userData,
                family: newFamilyList
            }

            await dispatch({
                type: SET_USER_DATA,
                payload: newUserData
            })

            await dispatch({
                type: SET_USER_DATA_LOADING,
                payload: false
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export function addFavoriteDoctor(patientID, doctorData, changedStatus, setThisFavorite){
    return async dispatch => {
        try {
            const token = await getToken()
            const { data } = await instance({
                method: 'PATCH',
                url: `addFavoriteDoctor/${patientID}`,
                headers: {
                    Authorization: token
                },
                data: {
                    favoriteDoctor: doctorData
                }
            })
            await dispatch({
                type: SET_USER_DATA,
                payload: data.data
            })
            ToastAndroid.show(data.message, ToastAndroid.SHORT);
            setThisFavorite(changedStatus)
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export function removeFavoriteDoctor(patientID, doctorID, changedStatus, setThisFavorite, newData, setFavorit){
    return async dispatch => {
        try {
            const token = await getToken()
            const { data } = await instance({
                method: 'PATCH',
                url: `removeFavoriteDoctor/${patientID}`,
                headers: {
                    Authorization: token
                },
                data: {
                    doctorID
                }
            })
            await dispatch({
                type: SET_USER_DATA,
                payload: data.data
            })
            ToastAndroid.show(data.message, ToastAndroid.SHORT);
            if(setThisFavorite) setThisFavorite(changedStatus)
            if(newData) setFavorit(newData)
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export function deleteUserData(navigation){
    return async (dispatch) => {
        try {
            await navigation.pop();
            await navigation.navigate('Sign');
            await AsyncStorage.removeItem('docterFavorite');
            // await AsyncStorage.removeItem('token');
            await dispatch({
                type: DELETE_USER_DATA,
            });
            ToastAndroid.show(`Logout success`, ToastAndroid.SHORT);
        } catch (error) {
            console.log(error);
        }
    };
}