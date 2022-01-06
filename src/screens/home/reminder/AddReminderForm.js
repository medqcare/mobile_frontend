import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  NativeModules,
  ActivityIndicator,
  Button,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import GreyHeader from '../../../components/headers/GreyHeader'
import { MaterialCommunityIcons, MaterialIcons, FontAwesome  } from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import withZero from '../../../helpers/withZero'
import { ScrollView } from "react-native-gesture-handler";
import { getFormattedDate, fullMonthFormat} from '../../../helpers/dateFormat'
import { searchDrugByName, createNewDrugFromUser } from '../../../stores/action'
import AsyncStorage from '@react-native-async-storage/async-storage'


const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function AddReminderForm(props) {
	const { activeDrugs, setActiveDrugs } = props.navigation.state.params

	const [drugData, setDrugData] = useState({
		drugName: '',
		dose: '',
		duration: '',
		notes: '',
		ettiquete: [],
		information: '',
		drugQuantity: 0,
		quantityTotal: 0,
		expiredDate: ''
	})

	const [filteredDrugs, setFilteredDrugs] = useState([])

	const newDate = new Date()
	const formattedDate = getFormattedDate(newDate)
	const fullDateFormat = fullMonthFormat(formattedDate)
	const [displayDate, setDisplayDate] = useState(fullDateFormat)
	
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('time');
	const [show, setShow] = useState(false);

	const [ettiqueteList, setEttiqueteList] = useState([
		{
			id: 1,
			value: 'Pagi',
			selected: false
		},
		{
			id: 2,
			value: 'Siang',
			selected: false,
		},
		{
			id: 3,
			value: 'Sore',
			selected: false
		},
		{
			id: 4,
			value: 'Malam',
			selected: false
		},
	])

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		const hours = currentDate.getHours()
		const minutes = currentDate.getMinutes()
		const formattedDate = getFormattedDate(currentDate)
		const fullDateFormat = fullMonthFormat(formattedDate)
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
		setDisplayDate(fullDateFormat);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');
	};

	const [load, setLoad] = useState(false)
	const [time, setTime] = useState({time: ''})

	function getDrugsByName(text){
		setDrugData({...drugData, drugName: text})
		// const result = await props.searchDrugByName(text)
		// setFilteredDrugs(result)
		
		console.log(text)
	}

	function addEttiquete(value, index, id){
		const newArray = []

		const arrayOfEttiquetesList = ettiqueteList.map((el, idx) => {
			if(el.selected === true && idx !== index){
				newArray.push(el.value)
			}
			if(idx == index){
				if(!el.selected){
					newArray.push(value)
				} 
				el.selected = !el.selected
			}
			return el
		})

		setEttiqueteList(arrayOfEttiquetesList)
		setDrugData({
			...drugData,
			ettiquete: newArray
		})
		
	}

	const Item = ({ value, selected, index, id}) => (
		<TouchableOpacity 
			style={styles.inputContainer}
			onPress={() => addEttiquete(value, index, id)}
		>
			<View style={selected ? styles.selectedFlatListInput : styles.unselectedFlatListInput}>
				<Text style={styles.inputText}>{value}</Text>
			</View>
		</TouchableOpacity>
	);

	const renderItem = ({ item , index, id}) => (
		<Item value={item.value} selected={item.selected} index={index} id={id} />
	)

	async function createDrug(){
		const data = drugData
		const token = JSON.parse(await AsyncStorage.getItem('token')).token
		// const newDrug = await props.createNewDrugFromUser(data, token)
		
		// const newDrugs = [...activeDrugs, newDrug]
		// setActiveDrugs(newDrugs)
		props.navigation.pop()

	}

	
  	return (
		<View style={styles.container}>
			<GreyHeader
				navigate={props.navigation.navigate}
				navigateBack="Reminder"
				title="Tambah Pengingat Obat"
				// hidden={false}
			/>
			<View style={styles.content}>
				<View style={styles.inputFormContainer}>
					{/* Drug Name */}
					<View style={styles.inputContainer}>
						<View style={styles.input}>
							<TextInput
								style={styles.inputText}
								autoCapitalize={'none'}
								autoFocus={false}
								placeholder={'Nama Obat'}
								keyboardType={'default'}
								placeholderTextColor="#8b8b8b" 
								onChangeText={text => 
									getDrugsByName(text)
								}
								value={drugData.drugName}
							/>
						</View>
					</View>

					{/* Frequency */}
					<FlatList
						data={ettiqueteList}
						renderItem={renderItem}
						keyExtractor={item => item.id}
						horizontal={false}
						numColumns={3}
					/>

					<View style={styles.inputContainer}>
						<View style={styles.input}>
						<TouchableOpacity 
							style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}
							onPress={() => showDatepicker()}
						>
							<Text style={styles.reminderTimeText}>{displayDate}</Text>
							<FontAwesome name="calendar" size={24} color="white" />
						</TouchableOpacity>
						</View>
					</View>

					{show && (
						<DateTimePicker
							testID="dateTimePicker"
							value={date}
							mode={mode}
							is24Hour={true}
							display="default"
							onChange={onChange}
							minimumDate={new Date()}

						/>
            		)}

					{/* Dose */}
					<View style={styles.inputContainer}>
						<View style={styles.input}>
							<TextInput
								style={styles.inputText}
								autoCapitalize={'none'}
								autoFocus={false}
								placeholder={'Dosis'}
								keyboardType={'numeric'}
								placeholderTextColor="#8b8b8b" 
								onChangeText={number =>
									setDrugData({...drugData, dose: number})
								}
								value={drugData.dose}
							/>
						</View>
					</View>


					{/* Quantity */}
					<View style={styles.inputContainer}>
						<View style={styles.input}>
							<TextInput
									style={styles.inputText}
									autoCapitalize={'none'}
									autoFocus={false}
									placeholder={'Jumlah obat'}
									keyboardType={'numeric'}
									placeholderTextColor="#8b8b8b" 
									onChangeText={number =>
										setDrugData({...drugData, quantityTotal: number, drugQuantity: number})
									}
									value={drugData.drugQuantity}
								/>
						</View>
					</View>

					{/* Optional Notes */}
					<View style={styles.inputContainer}>
						<View style={styles.input}>
							<TextInput
									style={styles.inputText}
									autoCapitalize={'none'}
									autoFocus={false}
									placeholder={'Contoh: Minum dengan air putih setelah makan'}
									keyboardType={'default'}
									placeholderTextColor="#8b8b8b" 
									onChangeText={text =>
										setDrugData({...drugData, notes: text})
									}
									value={drugData.notes}
								/>
						</View>
					</View>
				</View>
				
				<View style={styles.buttonContainer}>	
					<TouchableOpacity
						onPress={() => createDrug()}
						style={styles.button}
					>
						{load ? (
						<ActivityIndicator size={"small"} color="#FFF" />
						) : (
						<Text style={styles.buttonText}>Simpan Pengingat</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</View>
  	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#4EB151",
		paddingVertical: 11,
		paddingHorizontal: 17,
		borderRadius: 3,
		marginVertical: 50
	},

	container: {
		flex: 1,
		backgroundColor: "#1F1F1F",
	},
	
	content: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		// height: 
	},

	inputFormContainer: {
		paddingVertical: dimHeight * 0.02452,
		width: dimWidth * 0.9,
	},

	inputContainer: {
		paddingTop: 10
	},

	input: {
        height: dimHeight * 0.06128,
        borderWidth: 2,
		borderColor: 'rgba(84, 84, 84, 1)',
        paddingHorizontal: dimWidth * 0.04,
        borderRadius: 3,
        backgroundColor: '#1F1F1F',
        justifyContent: 'center'
    },

	unselectedFlatListInput: {
        height: dimHeight * 0.06128,
        borderWidth: 2,
		borderColor: 'rgba(84, 84, 84, 1)',
        paddingHorizontal: dimWidth * 0.04,
        borderRadius: 3,
        backgroundColor: '#1F1F1F',
        justifyContent: 'center',
		alignItems: "center",
		width: (dimWidth * 0.9) * (1/3),
    },
	
	selectedFlatListInput: {
        height: dimHeight * 0.06128,
        borderWidth: 2,
		borderColor: 'rgba(84, 84, 84, 1)',
        paddingHorizontal: dimWidth * 0.04,
        borderRadius: 3,
        backgroundColor: 'blue',
        justifyContent: 'center',
		alignItems: "center",
		width: (dimWidth * 0.9) * 0.333,
    },

	inputText: {
		color: '#DDDDDD'
	},

	// SET ALL NUMBER TO DIMWIDTH OR DIMHEIGHT
	reminderFormContainer: {
		paddingTop: 16,
		width: dimWidth * 0.9
	},

	reminderTitle: {
		alignSelf: "flex-start",
	},

	reminderTimeContainer: {
		borderBottomWidth: 2,
		borderBottomColor: 'rgba(71, 71, 71, 1)',
		paddingBottom: 10
		// backgroundColor: 'red'
	},

	reminderTopContainer: {
		alignSelf: "flex-start",
		backgroundColor: 'rgba(47, 47, 47, 1)',
		paddingVertical: 4,
		paddingHorizontal: 6
	},

	reminderLowerContainer: {
		flexDirection: "row",
		width: '100%',
		justifyContent: "space-between",
		paddingTop: 10
	},

	reminderTimeText: {
		color: 'rgba(181, 181, 181, 1)',
		fontWeight: '500',
	},
	
	
	// SET ALL NUMBER TO DIMWIDTH OR DIMHEIGHT

	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 15
	},

	button: {
		height: dimHeight * 0.05,
		width: dimWidth * 0.9,
		backgroundColor: "#005ea2",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		// marginVertical: dimHeight * 0.012256,
	},

	buttonText: {
		color: 'rgba(221, 221, 221, 1)',
		fontWeight: '500',
		fontSize: 18
	},
	
	lightText: {
		color: 'rgba(181, 181, 181, 1)'	
	},
});




const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
	searchDrugByName,
	createNewDrugFromUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReminderForm)