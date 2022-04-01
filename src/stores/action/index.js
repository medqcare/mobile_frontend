import axios from 'axios';
import {
  getPatientAllergies,
  createAllergy,
  editSelectedAllergy,
  deleteSelectedAllergy
} from './allergies'
import {
  searchAllReservations,
  setHealthFacility,
  checkIn,
  cancelSelectedReservation
} from './appointment'
import {
  getAllTransactions
} from './transactions'
import {
  searchAllClinics,
  searchClinicByName
} from './clinic'
import {
  searchAllDoctors,
  searchDoctorBySpecialist,
  searchDoctorByName,
  makeReservation
} from './doctor'
import {
  getDrugs,
  searchAllDrugs,
  searchDrugByName,
  createNewDrugFromUser,
  changeDrugNotes,
  changeAlarmBoolean,
  updateDrugImageUrl,
  deleteDrugImageUrl,
  updateFinishStatus,
} from './drugs';
import {
  signIn,
  credentialCheck,
  addNewUser,
  signUp,
  logout
} from './entry'
import {
  getDocumentByPatient,
  uploadDocument,
  renameDocument,
  deleteDocument,
} from './medicalDocuments';
import {
  getAllPrescriptions,
  getTodaysPrescriptions,
  getPrescriptionHistory,
} from './prescription';
import {
  getAllOrderHistory,
  getAllTransactionHistory,
} from './histories'
import {
  getTodaysRegistration,
  fetchCurrentQueueingNumber,
} from './queues'
import {
  getReminders,
  changeReminderAlarmTime,
  changeReminderStatus,
} from './reminders';
import {
  setShowInstruction
} from './showInstruction'
import {
  createPatientAsUser,
  getLoggedData,
  updateProfilePicture,
  deleteProfileImage,
  updateProfileData,
  changeAccountPassword,
  createNewFamily,
  deleteFamilyData,
  addFavoriteDoctor,
  removeFavoriteDoctor,
  deleteUserData,
} from './userData'
import {
  getMedicalServices,
  createMedicalServiceReservation,
} from './medical_services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid, Alert, ShadowPropTypesIOS } from 'react-native';
import { baseURL } from '../../config';

const instance = axios.create({
  baseURL: `${baseURL}/api`,
});

const _storeData = async (data) => {
  console.log(data, 'This is the token after signing in');
  try {
    await AsyncStorage.setItem('token', JSON.stringify(data));
    console.log(
      await AsyncStorage.getItem('token'),
      'This is the token in AsyncStorage'
    );
  } catch (error) {
    // Error saving data
    console.log(error);
  }
};

export function resendConfirmationEmail(email) {
  console.log('Application is sending request to resend confirmation email');
  return async (dispatch) => {
    try {
      const { data } = await instance({
        method: 'POST',
        url: '/v1/members/resendVerificationCode',
        data: {
          email,
        },
      });
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
    } catch (error) {
      const { message } = error.response.data.err;
      console.log(
        message,
        'Error found when trying to resend confirmation email'
      );
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };
}

export function SignInGoogle(token, navigation, navigateTo) {
  console.log('ini di panggi diaction');
  return (dispatch) => {
    // console.log(navigation, 'ini navigationnya')
    instance({
      url: '/v1/members/signinGoogle',
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
          _storeData({ token: data.token });
          return instance({
            url: '/v1/members/dataLogged',
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

export function resetPasswordEmail(email, navigate, navigateTo, isResend) {
  console.log(
    'Application is sending request to reset password and send email'
  );
  return async (dispatch) => {
    try {
      const { data } = await instance({
        method: 'POST',
        url: '/v1/members/resetPasswordEmail',
        data: {
          email,
        },
      });
      const storedSecretCode = data.secretCode;
      await AsyncStorage.setItem('storedSecretCode', storedSecretCode);
      console.log('Email sent to', email);
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      if (!isResend) {
        navigate(navigateTo, { email });
      }
    } catch (error) {
      console.log(
        error.message,
        'Error found when trying to reset password and send email'
      );
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };
}

export function resetPasswordPhone(
  phoneNumber,
  navigate,
  navigateTo,
  isResend
) {
  console.log('Application is sending request to reset password and send SMS');
  return async (dispatch) => {
    try {
      const { data } = await instance({
        method: 'POST',
        url: '/v1/members/resetPasswordOTP',
        data: {
          phoneNumber,
        },
      });
      const { email, secretCode } = data;
      await AsyncStorage.setItem('storedSecretCode', secretCode);
      console.log('SMS sent to', phoneNumber);
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      if (!isResend) {
        navigate(navigateTo, { phoneNumber, email });
      }
    } catch (error) {
      console.log(
        error.message,
        'Error found when trying to reset password and send email'
      );
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };
}

export function validateSecretCode(
  secretCode,
  storedSecretCode,
  navigate,
  navigateTo,
  email
) {
  console.log(
    `Application is sending request to validate user's input code...`
  );
  return async (dispatch) => {
    try {
      let { data } = await instance({
        method: 'POST',
        url: `/v1/members/validateSecretCode`,
        data: {
          secretCode,
        },
        headers: {
          storedSecretCode,
        },
      });
      if (data.message) {
        console.log(data.message);
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        navigate(navigateTo, { email, destination: 'SignIn' });
      } else {
        ToastAndroid.show(data.error, ToastAndroid.SHORT);
      }
    } catch (error) {
      const { message } = error.response.data.err;
      console.log(
        message,
        'Error found when trying to reset password and send email'
      );
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };
}

export function changePassword(email, password, navigate, destination) {
  console.log('Application is sending request to change password...');
  return async (dispatch) => {
    try {
      let { data } = await instance({
        method: 'POST',
        url: `/v1/members/changePassword`,
        data: {
          email,
          password,
        },
      });
      if (data.message) {
        console.log(data.message);
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        await AsyncStorage.removeItem('secretCode');
        navigate(destination);
      } else {
        ToastAndroid.show(data.error, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      // const { message } = error.response.data.err
      // console.log(message, 'Error found when trying to reset password and send email')
      // ToastAndroid.show(message, ToastAndroid.SHORT)
    }
  };
}

export function addFamily(dataFamily, navigation, loadFalse) {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem('token');
    try {
      let { data } = await instance({
        url: '/v1/members/addFamily',
        method: 'POST',
        data: dataFamily,
        headers: { Authorization: JSON.parse(token).token },
      });
      if (
        data &&
        data.message &&
        data.message.includes('family NIK already registered')
      ) {
        if (data.data == 'cannot add same family twice') {
          ToastAndroid.show(
            'This NIK has already been registered!',
            ToastAndroid.SHORT
          );
          loadFalse(false);
        } else {
          let { data } = await instance({
            url: '/v1/members/dataLogged',
            method: 'GET',
            headers: { Authorization: JSON.parse(token).token },
          });

          await dispatch({
            type: 'GET_USER_DATA',
            payload: data.data,
          });
          navigation.navigate('FamilyList');
          ToastAndroid.show(
            'NIK sudah terdaftar, Berhasil menambahkan data sebelumnya',
            ToastAndroid.LONG
          );
        }
      } else if (data && data.error) {
        if (data.error.message.includes('Request failed with status code')) {
          loadFalse();
          ToastAndroid.show(
            `This NIK is the same as the account owner's !`,
            ToastAndroid.SHORT
          );
        }
      } else {
        console.log('Successfully added family member');
        console.log('Navigating back to family list...');
        const successAddFamilyMessage = data.message;
        let result = await instance({
          url: '/v1/members/dataLogged',
          method: 'GET',
          headers: { Authorization: JSON.parse(token).token },
        });
        await dispatch({
          type: 'GET_USER_DATA',
          payload: result.data.data,
        });
        loadFalse();
        navigation.navigate('FamilyList');
        ToastAndroid.show(successAddFamilyMessage, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error, 'Error found when adding a new family');
      loadFalse();
      ToastAndroid.show(`${error.response.data.errors[0]}`, ToastAndroid.LONG);
    }
  };
}

export function deleteFamily(userId, { token }, modalF) {
  // console.log(userId, "<===== ini userID, token ini ====>", token)
  return async (dispatch) => {
    try {
      let Data = await instance({
        url: `/v1/members/deleteFamily`,
        method: 'PUT',
        headers: {
          Authorization: token,
        },
        data: {
          patientId: userId,
        },
      });
      ToastAndroid.show(Data.data.message, ToastAndroid.SHORT);
      let newUserData = await instance({
        url: `/v1/members/dataLogged`,
        method: 'GET',
        headers: { Authorization: token },
      });
      dispatch({
        type: 'GET_USER_DATA',
        payload: newUserData.data.data,
      });
    } catch (error) {
      console.log(error);
      // modalF(error.message)
    }
  };
}

export function edit_profile(userData, userID, token, navigateTo) {
  console.log('Sending data to server...');
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log(userID, 'ini userIDnya');
        let data = await instance({
          url: `/v1/members/editProfile/${userID}`,
          method: 'PATCH',
          data: userData,
          headers: { Authorization: token },
        });
        let dataUpdate = await instance({
          url: '/v1/members/dataLogged',
          method: 'GET',
          headers: { Authorization: token },
        });
        resolve({ ...dataUpdate, message: 'success' });
        dispatch({
          type: 'GET_USER_DATA',
          payload: dataUpdate.data.data,
        });
        ToastAndroid.show(data.data.message, ToastAndroid.SHORT);
        return data.data;
      } catch (error) {
        // console.log(error);
        reject(error);
      }
    });
  };
}

export function bookDoctor(bookData, token) {
  return (dispatch) => {
    // console.log(bookData, 'ini book datanya di action')
    dispatch({
      type: 'TOGGLE_LOADING',
      payload: true,
    });
    let d2ate = new Date(bookData.bookingSchedule);
    let month = '' + (d2ate.getMonth() + 1),
      day = '' + d2ate.getDate(),
      year = d2ate.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    bookData.bookingSchedule = `${day}/${month}/${year}`;
    return new Promise(async (resolve, reject) => {
      try {
        console.log('masuk sini dari book dokter');
        // console.log(bookData);
        // console.log(token);
        let data = await instance({
          url: '/v1/members/makeReservation',
          method: 'POST',
          data: bookData,
          headers: { Authorization: token },
        });
        console.log(data, 'ini datanya mmmmmmmmmmmmmmmmmmm');
        resolve({ message: data.data.message, status: data.data.status });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };
}

export function findPatientFacility(dataPatient, token, createPatient) {
  // console.log(createPatient, 'ini createPatient untuk find')
  // console.log(dataPatient, 'ini datapatient untuk find')
  // console.log(token, "ini token find")
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { data, status } = await instance({
          url: '/v1/members/facilityMedrec',
          method: 'POST',
          headers: { Authorization: token },
          data: dataPatient,
        });
        console.log(data, status, 'ini data hasil find');
        if (status === 204) {
          let { data } = await instance({
            url: '/v1/members/addPatientToFacility',
            method: 'POST',
            headers: { Authorization: token },
            data: createPatient,
          });
          console.log(data, 'ini data hasil create');
          resolve(data, status);
        } else {
          resolve(status);
        }
      } catch (error) {
        console.log(error, 'error di findPatientFaciity');
        reject(error);
      }
    });
  };
}

export function createPatientFacility(createPatient, token) {
  console.log(createPatient, 'ini datapatient untuk create');
  console.log(token, 'ini token create patientFacility');
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await instance({
        url: '/v1/members/addPatientToFacility',
        method: 'POST',
        headers: { Authorization: token },
        data: createPatient,
      });
      console.log(data, 'ini data hasil create');
      resolve(data);
    } catch (error) {
      console.log(error, 'error di findPatientFaciity');
      reject(error);
    }
  });
}

export function getCurrentQueueingNumber(queueId) {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        let token = await AsyncStorage.getItem('token');
        // console.log(JSON.parse(token).token,'ini token yang dari get current queue')
        // console.log('ini data queueID', JSON.parse(queueId), typeof queueId);
        let { data } = await instance({
          method: 'POST',
          url: '/v1/members/getQueueById',
          data: { queueID: JSON.parse(queueId) },
          headers: { Authorization: JSON.parse(token).token },
        });
        if (data) {
          resolve(data.data.currentQueueingNumber);
        } else {
          throw { error: 'no data' };
        }
      } catch (error) {
        reject(error);
      }
    });
  };
}

export function cancelRecervation(reservationID) {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem('token');
    try {
      let { data } = await instance({
        url: `/v1/members/cancelReservation`,
        method: 'PATCH',
        headers: {
          Authorization: JSON.parse(token).token,
        },
        data: {
          reservationID: reservationID,
        },
      });
      console.log(data);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };
}

export function getTodayRegistration(userID) {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        let access_token = await AsyncStorage.getItem('token');

        // console.log('ini userIDnya boss', userID)
        // console.log('ini tokennya boss', access_token)
        let { data } = await axios({
          method: 'POST',
          url: baseURL + '/api/v1/members/getTodayRegistration',
          data: {
            userID,
          },
          headers: {
            Authorization: JSON.parse(access_token).token,
          },
        });
        // console.log('ini hasil balikan dari get today registration',data)

        dispatch({
          type: 'SET_TODAY_ACTIVITY',
          payload: data ? data.data : [],
        });
        resolve(data);
      } catch (error) {
        console.log('gagal di get Today registration');
        console.log(error);
        reject(error);
        Alert.alert(error);
      }
    });
  };
}

export function setAlergie(patientId, alergie, token) {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await instance({
          url: `/v1/members/alergies/${patientId}`,
          method: 'POST',
          data: alergie,
          headers: { Authorization: token },
        });
        resolve(data.data);
      } catch (error) {
        console.log(error, 'ini kembalian data alergie');
        ToastAndroid.show('Gagal menambahkan alergi', ToastAndroid.SHORT);
        reject(error.message);
      }
    });
  };
}

export function editAlergi(id, alergie, alergieType, token) {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await instance({
          url: `/v1/members/editAlergi/${id}`,
          method: 'PUT',
          data: {
            alergie,
            alergieType,
          },
          headers: { Authorization: token },
        });
        resolve(data.data);
      } catch (error) {
        console.log(error, 'ini kembalian data alergie');
        ToastAndroid.show('Gagal menambahkan alergi', ToastAndroid.SHORT);
        reject(error.message);
      }
    });
  };
}

export function getAlergie(patientId, token) {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(`Application is trying to find patient's allergies`);
        let data = await instance({
          url: `/v1/members/alergies/${patientId}`,
          method: 'GET',
          headers: { Authorization: token },
        });
        resolve(data.data);
        if (data.data.data.length > 1)
          console.log(
            `Application found ${data.data.data.length} allergies for the selected patient`
          );
        else
          console.log(
            `Application found ${data.data.data.length} allergy for the selected patient`
          );
      } catch (err) {
        console.log(err.response.status, 'ini kembalian data get alergie');
        reject(err.response.status);
      }
    });
  };
}

export function deleteAlergie(_id, token) {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('kepanggil di try');
        let data = await instance({
          url: `/v1/members/alergies/${_id}`,
          method: 'PUT',
          headers: { Authorization: token },
        });
        resolve(data.data);
      } catch (error) {
        console.log(error, 'ini kembalian data delete alergie');
        // ToastAndroid.show('Gagal mengambil data alergi', ToastAndroid.SHORT)
        reject(error.message);
      }
    });
  };
}

export function getDataMedicine() {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await axios({
          url: `http://api-medqcare.applimetis.id:8888/api/v1/master/barangMedis/getAll`,
          method: 'GET',
        });
        resolve(data.data);
      } catch (error) {
        console.log(error, 'ini kembalian data Obat');
        // ToastAndroid.show('Gagal mengambil data alergi', ToastAndroid.SHORT)
        reject(error.message);
      }
    });
  };
}

export function uploadImage(
  patientId,
  fileToUpload,
  token,
  navigateTo,
  destination
) {
  return async (dispatch) => {
    console.log('Application is trying to upload the image...');
    try {
      console.log(fileToUpload);
      let { data } = await instance({
        url: `/v1/members/updateAvatar`,
        method: 'PATCH',
        data: fileToUpload,
        headers: {
          Accept: 'application/json',
          authorization: token,
          id: patientId,
          'content-type': 'multipart/form-data',
        },
      });
      console.log('server has successfully updated Image Url');
      let result = await instance({
        method: 'GET',
        url: `/v1/members/dataLogged`,
        headers: { Authorization: token },
      });
      if (result.data) {
        console.log('Application Found dataLogged');
        await dispatch({
          type: 'GET_USER_DATA',
          payload: result.data.data,
        });
      }
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      navigateTo(destination);
    } catch (error) {
      console.log(error.response, 'Error found when trying to upload avatar');
    }
  };
}

export {
  getPatientAllergies,
  createAllergy,
  editSelectedAllergy,
  deleteSelectedAllergy
}

export {
  searchAllReservations,
  setHealthFacility,
  checkIn,
  cancelSelectedReservation
}


export {
  getAllTransactions
}

export {
  searchAllClinics,
  searchClinicByName
}

export {
  searchAllDoctors,
  searchDoctorBySpecialist,
  searchDoctorByName,
  makeReservation,
}

export {
  getDrugs,
  searchAllDrugs,
  searchDrugByName,
  createNewDrugFromUser,
  changeDrugNotes,
  changeAlarmBoolean,
  updateDrugImageUrl,
  deleteDrugImageUrl,
  updateFinishStatus,
};

export { 
  signIn,
  credentialCheck,
  addNewUser,
  signUp,
  logout,
}

export { getDocumentByPatient, uploadDocument, renameDocument, deleteDocument };

export { getAllPrescriptions, getTodaysPrescriptions, getPrescriptionHistory };

export { getAllOrderHistory, getAllTransactionHistory}

export { getTodaysRegistration, fetchCurrentQueueingNumber, }

export {
  getMedicalServices,
  createMedicalServiceReservation,
}
export { setShowInstruction }

export { getReminders, changeReminderAlarmTime, changeReminderStatus };

export { createPatientAsUser, getLoggedData, updateProfilePicture, deleteProfileImage, updateProfileData, changeAccountPassword, createNewFamily, deleteFamilyData, addFavoriteDoctor, removeFavoriteDoctor, deleteUserData }
