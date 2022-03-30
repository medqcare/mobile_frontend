import { combineReducers } from "redux";
import todayActivityReducer from "./activity";
import allergiesReducer from "./allergies"
import doctorReducer from "./doctors";
import drugReducer from "./drugs";
import entryReducer from "./entry";
import showInstructionReducer from "./showInstruction";
import userDataReducer from "./userData";
import userLocationReducer from "./userLocation";
import medicalServicesReducer from "./medicalServices";
import clinicReducer from "./clinic";
import appointmentsReducer from "./appointment";
import queuesReducer from "./queues";
import prescriptionsReducer from "./prescriptions";
import medicalDocumentsReducer from "./medicalDocuments";
import transactionsReducer from "./transactions";

const reducer = combineReducers({
	allergiesReducer,
	doctorReducer,
	drugReducer,
	showInstructionReducer,
	userDataReducer,
	userLocationReducer,
	todayActivityReducer,
	entryReducer,
	medicalServicesReducer,
	clinicReducer,
	appointmentsReducer,
	queuesReducer,
	prescriptionsReducer,
	medicalDocumentsReducer,
	transactionsReducer
})

export default reducer

// const initState = {
//   isLogin: false,
//   isLoading: false,
//   error: null,
//   dataHospital: [],
//   dataDoctors: [],
//   myLocation: null,
//   userData: null,
//   allDrugs: [],
//   activity: null,
//   isPriority: true,
//   RM_patient: null,
//   todayActivity: null,
//   showInstruction: false
// }

// export default (state = initState, action) => {
//   switch (action.type) {
//     case 'TOGGLE_LOADING':
//       return {
//         ...state,
//         isLoading: action.payload
//       }
//     case 'FETCH_ERROR':
//       return {
//         ...state,
//         error: action.payload
//       }
//     case 'CHANGE_LOGIN':
//       console.log(state.isLogin, 'ini isLogin dari reducer')
//       console.log(action.payload, 'ini payload nya reducer')
//       return {
//         ...state,
//         isLogin: action.payload
//       }
//     case 'FETCH_DATA_HOSPITAL':
//       return {
//         ...state,
//         dataHospital: action.payload
//       }
//     case 'FETCH_DATA_DOCTOR':
//       return {
//         ...state,
//         dataDoctors: action.payload
//       }
//     case 'SET_MY_LOCATION':
//       return {
//         ...state,
//         myLocation: action.payload
//       }
//     case 'AFTER_SIGNIN':
//       // console.log(action.payload,'ini payload data yang didapat dari server') 
//       return {
//         ...state,
//         // isLogin: true,
//         userData: action.payload,
//       }
//     case 'GET_USER_DATA':
//       return {
//         ...state,
//         userData: action.payload
//       }
// 	case 'GET_PRESCRIPTION_DATA':
// 		return {
// 			...state,
// 			userData: {
// 				...state.userData,
// 				prescriptions: action.payload
// 			}
// 		}
//     case 'GET_DRUGS_DATA':
//       return {
//         ...state,
//         userData: {
//           ...state.userData,
//           drugs: action.payload
//         }
//       }

//     case 'SEARCH_ALL_DRUGS':
//       return {
//         ...state,
//         allDrugs: action.payload
//       }

//     case 'GET_REMINDER_DATA':
//       return {
//         ...state,
//         userData: {
//           ...state.userData,
//           reminderDetails: action.payload
//         }
//       }
//     case 'SET_TODAY_ACTIVITY':
//       return {
//         ...state,
//         todayActivity: action.payload
//       }
//     // case 'REKAM_MEDIS_PASIEN': 
//     //   return{
//     //     ...state,
//     //     RM_Patient: action.payload
//     //   }
//     case 'SHOW_INSTRUCTION':
//         return {
//           ...state,
//           showInstruction: action.payload
//         }
//     default:
//       return state
//   }
// }