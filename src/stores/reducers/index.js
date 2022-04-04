import { combineReducers } from "redux";
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
import historiesReducer from "./histories";

const reducer = combineReducers({
	allergiesReducer,
	doctorReducer,
	drugReducer,
	showInstructionReducer,
	userDataReducer,
	userLocationReducer,
	entryReducer,
	medicalServicesReducer,
	clinicReducer,
	appointmentsReducer,
	queuesReducer,
	prescriptionsReducer,
	medicalDocumentsReducer,
	transactionsReducer,
	historiesReducer,
})

export default reducer