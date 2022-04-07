import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { connect } from "react-redux";
import { getDrugs, searchAllDrugs, changeAlarmBoolean, updateFinishStatus, getReminders, changeReminderAlarmTime, changeReminderStatus } from '../../../stores/action'
import Header from "../../../components/headers/ReminderHeader";
import ReminderActiveList from "../../../components/reminder/ReminderActiveList";
import ReminderFinishedList from "../../../components/reminder/ReminderFinishedList";
import ReminderAddButton from '../../../assets/svg/ReminderAddButton'
import { ScrollView } from "react-native-gesture-handler";
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieLoader from 'lottie-react-native';

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function Reminder(props) {
	const swiper = useRef(null)

	const { userData, isLoading, error } = props.userDataReducer
	const { activeDrugs, finishedDrugs, webDrugs, isLoading: drugLoading, isLoadingWebDrug, error: drugError } = props.drugReducer
	
	// const [userData, setUserData] = useState(props.userData)
	const [selectedPatient, setSelectedPatient] = useState(userData)
	// const [drugs, setDrugs] = useState([])

	const [load, setLoad] = useState(false)
	const [loadGetDrugs, setLoadGetDrugs] = useState(true)
	
	const [activeDrugsa, setActiveDrugs] = useState([])
	const [finishedDrugsa, setFinishedDrugs] = useState([])

	const [allDrugs, setAllDrugs] = useState([])
	const [loadSearchAllDrugs, setLoadSearchAllDrugs] = useState(true)


	useEffect( async () => {
		await props.searchAllDrugs()
	}, [])

	useEffect( async () => {
		try {
			const patientID = selectedPatient._id
			await props.getDrugs(patientID)
		} catch (error){
			console.log(error, 'error di Reminder Page')
		}
	}, [selectedPatient])

	function firstName(){
		return selectedPatient.firstName.split(' ')[0]
	}

	const widthAdd = (dimWidth * 0.06945)
    const heightAdd = (dimHeight * 0.03677)
	const [index, setIndex] = useState(0)
	
	BackHandler.addEventListener('hardwareBackPress', () => {
    	return props.navigation.pop();
  	});

  	return (
		<View style={styles.container}>
			<Header
				navigate={props.navigation.navigate}
				name={firstName()}
				imageURL={selectedPatient.imageUrl}
				family={[userData, ...userData.family]}
				setPatientID={setSelectedPatient}
				navigateTo={props.navigation.navigate}
			/>
			<View style={styles.options}>
				<View style={styles.statusContainer}>
					<TouchableOpacity
						activeOpacity={1}
						style={index === 0 ? styles.selectedStatusInnerContainer: styles.unSelectedStatusInnerContainer}
						onPress={() => {
							if(index === 1){
								swiper.current.scrollBy(-1)}
							}
						}
					>
						<Text style={index === 0 ? styles.selectedStatusText: styles.unSelectedStatusText}>AKTIF</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={1}
						onPress={() => {
							if(index === 0){
								swiper.current.scrollBy(1)}
							}
						}
						style={index === 1 ? styles.selectedStatusInnerContainer: styles.unSelectedStatusInnerContainer}
					>
						<Text style={index === 1 ? styles.selectedStatusText: styles.unSelectedStatusText}>SELESAI</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity 
					style={styles.optionAdd}
					disabled={isLoadingWebDrug}
					onPress={() => props.navigation.navigate('AddReminderForm')}
				>
					<ReminderAddButton width={widthAdd} height={heightAdd}/>
				</TouchableOpacity>
			</View>
			{drugLoading ? 
				<LottieLoader
					source={require('../../animation/loading.json')}
					autoPlay
					loop
				/> :
				<Swiper
					showsButtons={false} 
					ref={swiper}
					showsPagination={false} 
					loop={false}
					onIndexChanged={(index) => setIndex(index)}
				>
					<ScrollView bounces={true}>
						<ReminderActiveList props={props} selectedPatient={selectedPatient} updateFinishStatusFunction={props.updateFinishStatus}/>
					</ScrollView>
					<ScrollView>
						<ReminderFinishedList props={props} drugs={finishedDrugs}/>
					</ScrollView>
				</Swiper>
			}
		</View>
  	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1F1F1F",
		paddingBottom: dimHeight * 0.01226
	},
	
	content: {
		height: dimHeight * 0.88,
		justifyContent: "flex-start",
		alignItems: 'center',
	},

	options: {
		width: dimWidth,
		flexDirection: 'row',
		justifyContent: "space-between",
	},
	
	statusContainer: {
		flexDirection: "row",
		justifyContent: 'space-evenly',
		width: dimWidth * 0.55,
	},

	selectedStatusInnerContainer: {
		borderBottomWidth: 1,
		borderBottomColor: "rgba(119, 191, 244, 1)",
		paddingHorizontal: dimWidth * 0.024,
		paddingVertical: dimHeight * 0.0196
	},

	unSelectedStatusInnerContainer: {
		paddingHorizontal: dimWidth * 0.024,
		paddingVertical: dimHeight * 0.0196
	},

	selectedStatusText: {
		color: "rgba(119, 191, 244, 1)",
		fontSize: 12,
	},

	unSelectedStatusText: {
		color: "#B5B5B5",
		fontSize: 12,
	},

	optionAdd: {
		paddingTop: dimHeight * 0.0196,
		paddingRight: dimWidth * 0.04167
	},
});

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
	getDrugs,
	searchAllDrugs,
	changeAlarmBoolean,
		updateFinishStatus,
	getReminders,
	changeReminderAlarmTime,
	changeReminderStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(Reminder)