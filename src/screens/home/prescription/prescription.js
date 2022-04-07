import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	ScrollView,
	BackHandler
} from "react-native";
import { connect, useDispatch } from "react-redux";
import Header from "../../../components/headers/GradientHeader";
import { 
	getAllPrescriptions,
	getTodaysPrescriptions,
	getPrescriptionHistory  
} from '../../../stores/action'
import SelectPatient from '../../../components/modals/selectPatient';
import PrescriptionTodaysList from '../../../components/prescription/PrescriptionTodaysList'
import PrescriptionHistory from '../../../components/prescription/PrescriptionHistory'
import Swiper from 'react-native-swiper'
import LottieLoader from 'lottie-react-native';
import keys from "../../../stores/keys";

const {
    SET_PRESCRIPTIONS_LOADING,
} = keys.prescrptionKeys

const dimension = Dimensions.get('window')
const dimHeight = dimension.height;
const dimWidth = dimension.width;

function Prescription(props) {
	const { userData, isLoading: userDataLoading, error: userDataError } = props.userDataReducer
	const dispatch = useDispatch()
	const [patientID, setPatientID] = useState(userData._id)
	const swiper = useRef(null)

	useEffect(async () => {
		try {
			await props.getTodaysPrescriptions(patientID)
			await props.getPrescriptionHistory(patientID)
		} catch (error) {
			console.log(error)
		}
	}, [patientID])
	
  	const [prescriptions, setPrescriptions] = useState(userData.prescriptions)
	  const [index, setIndex] = useState(0)

	const [displayName, setDisplayName] = useState(userData.lastName? userData.firstName + " " + userData.lastName : userData.firstName)
	const [modalPatient, setModalPatient] = useState(false);
	const [accountOwner, setAccountOwner] = useState(userData);
	const [family, setFamily] = useState([]);

	useEffect(() => {
		getFamily();
	}, []);

	function getFamily() {
		let dataUser = {
		  _id: userData._id,
		  firstName: userData.lastName
			? userData.firstName + ' ' + userData.lastName
			: userData.firstName,
		};
		const temp = [dataUser];
		userData.family.forEach(el => {
		  temp.push({
			_id: el._id,
			firstName: el.lastName
			  ? el.firstName + ' ' + el.lastName
			  : el.firstName,
		  });
		});
		setFamily(temp);
	}


	function setSelectedValue(data) {
		const fullName = data.lastName ? data.firstName + " " + data.lastName : data.firstName
		const _id = data._id
		setDisplayName(fullName)
		setPatientID(data._id)
	}

	BackHandler.addEventListener('hardwareBackPress', () => {
    	return props.navigation.pop();
  	});
  
	return (
		<View style={styles.container}>
			<Header title="Resep Obat" navigate={props.navigation.navigate} />
			
			<View style={styles.boxContainer}>
				<TouchableOpacity
					onPress={() => setModalPatient(true)}
					style={{...styles.box, height: 50}}>
					<Text style={styles.inputText}>{displayName}</Text>
					<Text style={styles.changePatientOptionText}>Ubah</Text>
				</TouchableOpacity>

				<SelectPatient
					modal={modalPatient}
					setModal={setModalPatient}
					accountOwner={accountOwner}
					family={family}
					title="Siapa yang ingin anda check?"
					setSelectedValue={setSelectedValue}
					navigateTo={props.navigation.navigate}
				/>
			</View>

			<View style={{flexDirection: 'row', width: dimWidth, justifyContent: "space-between"}}>
				<TouchableOpacity 
					onPress={() => {
						if(index === 1){
							swiper.current.scrollBy(-1)}
						}
					}
					style={index === 0 ? styles.selectedSwiperOptions : styles.unSelectedSwiperOption}>
					<Text style={styles.textItem}>Sedang Berlangsung</Text>
				</TouchableOpacity>

				<TouchableOpacity 
					onPress={() => {
						if(index === 0){
							swiper.current.scrollBy(1)}
						}
					}
					style={index === 1 ? styles.selectedSwiperOptions : styles.unSelectedSwiperOption}>
					<Text style={styles.textItem}>Riwayat</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.content}>
			{/* {isLoading ? 
				<LottieLoader
					source={require('../../animation/loading.json')}
					autoPlay
					loop
				/> : */}
				<Swiper
					showsButtons={false} 
					ref={swiper}
					showsPagination={false} 
					loop={false}
					onIndexChanged={(index) => setIndex(index)}
				>
					<ScrollView bounces={true}>
						<PrescriptionTodaysList props={props}/>
					</ScrollView>
					<ScrollView>
						<PrescriptionHistory props={props}/>
					</ScrollView>
				</Swiper>
			{/* } */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#181818",
	},

	boxContainer: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		shadowColor: '#C2C2C2',
		shadowOffset: {height: 5, width: 5},
		shadowOpacity: 0.61,
		shadowRadius: 9.11,
		elevation: 9,
		width: dimWidth,
	},

	box: {
		width: dimWidth * 0.95,
		borderWidth: 1,
		paddingHorizontal: 20,
		borderRadius: 3,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#2F2F2F',
	},

	inputText: {
		color: '#DDDDDD',
	},

	changePatientOptionText: {
		color: 'rgba(243, 115, 53, 1)'
	},

	selectedSwiperOptions: {
		justifyContent: "center",
		alignItems: "center",
		width: '50%',
		borderBottomWidth: 1,
		borderBottomColor: '#77BFF4',
		paddingTop: dimHeight * 0.00854,
		paddingBottom: dimHeight * 0.01828
	},

	unSelectedSwiperOption: {
		justifyContent: "center",
		alignItems: "center",
		width: '50%',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(84, 84, 84, 1)',
		paddingTop: dimHeight * 0.00854,
		paddingBottom: dimHeight * 0.01828
	},

	content: {
		height: dimHeight * 0.88,
		justifyContent: "space-between",
		alignItems: 'center',
		padding: 20,
	},

	textItem: {
		color: "#B5B5B5",
	}
});

const mapStateToProps = state => {
  	return state
}

const mapDispatchToProps = {
 	getAllPrescriptions,
	getTodaysPrescriptions,
 	getPrescriptionHistory 
}

export default connect(mapStateToProps, mapDispatchToProps)(Prescription)
