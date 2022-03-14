import { instance } from '../../config';
import keys from '../keys';
import getToken from '../../helpers/localStorage/token';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid, Alert, ShadowPropTypesIOS } from 'react-native';

const { 
    SET_USER_DATA,
    SET_USER_DATA_LOADING,
    SET_USER_DATA_ERROR,
    DELETE_USER_DATA
} = keys.userDataKeys

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

export function updateProfilePicture(patientId, fileToUpload, navigateTo, destination, userData) {
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
            userData.imageUrl = avatarLink

            await dispatch({
                type: SET_USER_DATA,
                payload: userData
            })

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

export function updateProfileData(updateData, navigate, navigateTo, userData){
    console.log('Sending data to server...')
    return async (dispatch) => {
        try {
            await dispatch({
                type: SET_USER_DATA_LOADING,
                payload: true
            })
            const { _id } = userData 
            const token = await getToken()
            const { data } = await instance({
                method: 'PATCH',
                url: `editProfile/${_id}`,
                headers: {
                    Authorization: token
                },
                data: updateData
            })
            const newUserData = {
                ...userData,
                ...updateData
            }
            await dispatch({
                type: SET_USER_DATA,
                payload: newUserData
            })

            await dispatch({
                type: SET_USER_DATA_LOADING,
                payload: false
            })

            ToastAndroid.show(data.message, ToastAndroid.SHORT);

            navigate(navigateTo)

        } catch (error) {
            console.log(error)
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
                // await AsyncStorage.removeItem('secretCode');
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

                const newUserData = {
                    ...userData,
                    family: userData.family.concat(newPatientData)
                }

                await dispatch({
                    type: SET_USER_DATA,
                    payload: newUserData
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

export function removeFavoriteDoctor(patientID, doctorID, changedStatus, setThisFavorite){
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
            setThisFavorite(changedStatus)
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