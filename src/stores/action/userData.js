import { instance } from '../../config';
import keys from '../keys';
import getToken from '../../helpers/localStorage/token';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid, Alert, ShadowPropTypesIOS } from 'react-native';
import { useSelector } from 'react-redux';

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
                return null
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
            console.log('Error found in function getLoggedData ==>', error.message);
        }
    }
}

export function updateProfilePicture(patientId, fileToUpload, navigateTo, destination, userData) {
    return async (dispatch) => {
        try {
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
                id: patientId,
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