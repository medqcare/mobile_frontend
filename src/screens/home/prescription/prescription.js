import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
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

const dimension = Dimensions.get('window')
const dimHeight = dimension.height;
const dimWidth = dimension.width;

function Prescription({navigation, userData, getAllPrescriptions, getTodaysPrescriptions, getPrescriptionHistory }) {
	const [load, setLoad] = useState(true)
	const [todaysPrescriptions, setTodaysPrescriptions] = useState(null)
	const [prescriptionHistory, setPrescriptionHistory] = useState(null)
	const swiper = useRef(null)

	useEffect(async () => {
		try {
			const token = JSON.parse(await AsyncStorage.getItem('token')).token
			const patientID = userData._id
			await getAllPrescriptions(patientID, token)
			const today = await getTodaysPrescriptions(patientID, token)
			setTodaysPrescriptions(today)
			const history = await getPrescriptionHistory(patientID, token)
			setPrescriptionHistory(history)
			setLoad(false)
		} catch (error) {
			console.log(error)
		}
	}, [])
	
  	const [prescriptions, setPrescriptions] = useState(userData.prescriptions)
	  const [index, setIndex] = useState(0)

	const [displayName, setDisplayName] = useState(userData.lastName? userData.firstName + " " + userData.lastName : userData.firstName)
  	const [idUser, setIduser] = useState({firstName: null, _id: null});
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
		setIduser(temp[0]);
		setFamily(temp);
	}


	function setSelectedValue(data) {
		const fullName = data.lastName ? data.firstName + " " + data.lastName : data.firstName
		const _id = data._id
		setDisplayName(fullName)
		setIduser({fullName, _id});
	}
	
  
	return (
		<View style={styles.container}>
			<Header title="Resep Obat" navigate={navigation.navigate} />
			
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
					navigateTo={navigation.navigate}
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
					<Text style={styles.textItem}>Saat Ini</Text>
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
			{load ? 
				<ActivityIndicator size={"small"} color={"blue"}/> :
				<Swiper
					showsButtons={false} 
					ref={swiper}
					showsPagination={false} 
					loop={false}
					onIndexChanged={(index) => setIndex(index)}
				>
					<ScrollView bounces={true}>
						<PrescriptionTodaysList props={userData, navigation} prescriptions={todaysPrescriptions}/>
					</ScrollView>
					<ScrollView>
						<PrescriptionHistory props={userData, navigation} prescriptions={prescriptionHistory}/>
					</ScrollView>
				</Swiper>
			}
				{/* {
					prescriptions ? (  
						<Text style={styles.textItem}>Ini datanya </Text>
					) : (
						<Text style={styles.textItem}>Belum Ada Resep</Text>
					)
				} */}
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
