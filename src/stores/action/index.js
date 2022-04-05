import axios from 'axios';

import {
    getPatientAllergies,
    createAllergy,
    editSelectedAllergy,
    deleteSelectedAllergy
} from './allergies'

export {
	getPatientAllergies,
	createAllergy,
	editSelectedAllergy,
	deleteSelectedAllergy
}


import {
	searchAllReservations,
	setHealthFacility,
	checkIn,
	cancelSelectedReservation
} from './appointment'

export {
	searchAllReservations,
	setHealthFacility,
	checkIn,
	cancelSelectedReservation
}


import {
	searchAllClinics,
	searchClinicByName
} from './clinic'

export {
	searchAllClinics,
	searchClinicByName
}


import {
	searchAllDoctors,
	searchDoctorBySpecialist,
	searchDoctorByName,
	makeReservation
} from './doctor'

export {
	searchAllDoctors,
	searchDoctorBySpecialist,
	searchDoctorByName,
	makeReservation,
}


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


import {
	signIn,
	SignInGoogle,
	credentialCheck,
	addNewUser,
	signUp,
	logout
} from './entry'

export { 
	signIn,
	SignInGoogle,
	credentialCheck,
	addNewUser,
	signUp,
	logout,
}


import {
	getAllOrderHistory,
	getAllTransactionHistory,
} from './histories'

export { 
	getAllOrderHistory, 
	getAllTransactionHistory
}


import {
	getDocumentByPatient,
	uploadDocument,
	renameDocument,
	deleteDocument,
} from './medicalDocuments';

export { 
	getDocumentByPatient, 
	uploadDocument, 
	renameDocument, 
	deleteDocument 
};


import {
	getMedicalServices,
	createMedicalServiceReservation,
} from './medical_services';

export {
	getMedicalServices,
	createMedicalServiceReservation,
}


import {
	getAllPrescriptions,
	getTodaysPrescriptions,
	getPrescriptionHistory,
} from './prescription';

export { 
	getAllPrescriptions, 
	getTodaysPrescriptions, 
	getPrescriptionHistory 
};


import {
	getTodaysRegistration,
	fetchCurrentQueueingNumber,
} from './queues'

export { 
	getTodaysRegistration, 
	fetchCurrentQueueingNumber, 
}


import {
	getReminders,
	changeReminderAlarmTime,
	changeReminderStatus,
} from './reminders';

export { 
	getReminders, 
	changeReminderAlarmTime, 
	changeReminderStatus };

import {
  	setShowInstruction
} from './showInstruction'

export { 
	setShowInstruction 
}


import {
	getAllTransactions
} from './transactions'

export {
  getAllTransactions
}


import {
	createPatientAsUser,
	getLoggedData,
	updateProfilePicture,
	deleteProfileImage,
	updateProfileData,
	verirfyPassword,
	resetAccountPassword,
	changeAccountPassword,
	createNewFamily,
	deleteFamilyData,
	addFavoriteDoctor,
	removeFavoriteDoctor,
	deleteUserData,
} from './userData'

export { 
	createPatientAsUser, 
	getLoggedData, 
	updateProfilePicture, 
	deleteProfileImage, 
	updateProfileData, 
	verirfyPassword, 
	resetAccountPassword, 
	changeAccountPassword, 
	createNewFamily, 
	deleteFamilyData, 
	addFavoriteDoctor, 
	removeFavoriteDoctor, 
	deleteUserData 
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid, Alert } from 'react-native';
import { baseURL } from '../../config';

const instance = axios.create({
  baseURL: `${baseURL}/api`,
});

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