const initState = {
  isLogin: false,
  isLoading: false,
  error: null,
  dataHospital: [],
  dataDoctors: [],
  myLocation: null,
  userData: null,
  activity: null,
  isPriority: true,
  RM_patient: null,
  todayActivity: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'FETCH_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'CHANGE_LOGIN':
      console.log(state.isLogin, 'ini isLogin dari reducer')
      console.log(action.payload, 'ini payload nya reducer')
      return {
        ...state,
        isLogin: action.payload
      }
    case 'FETCH_DATA_HOSPITAL':
      return {
        ...state,
        dataHospital: action.payload
      }
    case 'FETCH_DATA_DOCTOR':
      return {
        ...state,
        dataDoctors: action.payload
      }
    case 'SET_MY_LOCATION':
      return {
        ...state,
        myLocation: action.payload
      }
    case 'AFTER_SIGNIN':
      // console.log(action.payload,'ini payload data yang didapat dari server') 
      return {
        ...state,
        // isLogin: true,
        userData: action.payload,
      }
    case 'GET_USER_DATA':
      return {
        ...state,
        userData: action.payload
      }
    case 'GET_DRUGS_DATA':
      return {
        ...state,
        userData: {
          ...state.userData,
          drugs: action.payload
        }
      }
    case 'GET_REMINDER_DATA':
      return {
        ...state,
        userData: {
          ...state.userData,
          reminderDetails: action.payload
        }
      }
    case 'SET_TODAY_ACTIVITY':
      return {
        ...state,
        todayActivity: action.payload
      }
    // case 'REKAM_MEDIS_PASIEN': 
    //   return{
    //     ...state,
    //     RM_Patient: action.payload
    //   }
    default:
      return state
  }
}