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
	getAllNotifications,
	patchNotificationAsViewed,
	patchNotificationAsDeleted
} from './notifications'

export {
	getAllNotifications,
	patchNotificationAsViewed,
	patchNotificationAsDeleted
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