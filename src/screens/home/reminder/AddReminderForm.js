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
import { searchDrugByName, searchAllDrugs, createNewDrugFromUser, getDrugs } from '../../../stores/action'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SearchableDropdown from 'react-native-searchable-dropdown';
import RadioForm from 'react-native-simple-radio-button';


const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function AddReminderForm(props) {

	const items = [
		 {
		  "id": 1,
		  "name": "Drug Name",
		},
	]

	const { activeDrugs, setActiveDrugs, allDrugs } = props.navigation.state.params

	const [drugData, setDrugData] = useState({
		dose: '',
		duration: '',
		notes: '',
		ettiquete: [],
		information: '',
		drugQuantity: '',
		quantityTotal: '',
		expiredDate: '',
		patientID: props.userData._id
	})

	const [selectedItem, setSelectedItem] = useState({
		id: 1,
		name: 'loading...'
	})

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

	const infromationList = [
		{ label: 'Sebelum Makan', value: 'Sebelum Makan' },
		{ label: 'Sesudah Makan', value: 'Sesudah Makan' },
	];

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

	const [load, setLoad] = useState(false)

	

	async function getDrugsByName(text){
		try {
		} catch (error) {
			console.log(error.message)			
		}
	}

	function addEttiquete(value, index, list){
		const newArray = []

		if(list === 'ettiquete'){
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
	}

	const EttiqueteItem = ({ value, selected, index, id}) => (
		<TouchableOpacity 
			style={[styles.inputContainer, {paddingLeft: index === 0 ? 0 : 5, justifyContent: "space-between"}]}
			onPress={() => addEttiquete(value, index, 'ettiquete')}
		>
			<View style={selected ? styles.selectedFlatListInput : styles.unselectedFlatListInput}>
				<Text style={styles.inputText}>{value}</Text>
			</View>
		</TouchableOpacity>
	);
	
	const renderEttiqueteItem = ({ item , index, id}) => (
		<EttiqueteItem value={item.value} selected={item.selected} index={index} id={id} />
	)
		
	async function createDrug(){
		try {
			const token = JSON.parse(await AsyncStorage.getItem('token')).token
			const newDrug = await props.createNewDrugFromUser(drugData, token)

			const newDrugs = [...activeDrugs, newDrug]
			setActiveDrugs(newDrugs)

			props.navigation.pop()			
		} catch (error) {
			console.log(error)
		}

	}

	// console.log(filteredDrugs.length, 'length')

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
					<SearchableDropdown
						onItemSelect={(item) => {
							setSelectedItem(item)
							setDrugData({
								...drugData,
								...item,
							})
						}}
						itemStyle={{
							padding: 10,
							marginTop: 2,
							backgroundColor: '#ddd',
							borderColor: '#bbb',
							borderWidth: 1,
							borderRadius: 5,
						}}
						itemTextStyle={{ color: '#222' }}
						itemsContainerStyle={{ maxHeight: 150 }}
						items={allDrugs}
						resetValue={true}
						textInputProps={
						{
							placeholder: "Nama obat",
							placeholderTextColor: '#8b8b8b',
							underlineColorAndroid: "transparent",
							value: selectedItem.name,
							style: {
								...styles.input,
								color: 'white'
							},
							onTextChange: text => getDrugsByName(text)
						}
						}
						listProps={{
							nestedScrollEnabled: true,
						}}
					/>

					{/* Frequency */}
					<FlatList
						data={ettiqueteList}
						renderItem={renderEttiqueteItem}
						keyExtractor={item => item.id}
						horizontal={false}
						numColumns={4}
					/>

					{/* Information */}
					<RadioForm
						radio_props={infromationList}
						initial={0}
						onPress={(value) => {
							setDrugData({ ...drugData, information: value });
						}}
						formHorizontal={true}
						labelHorizontal={true}
						animation={false}
						labelStyle={{ paddingRight: 10, fontSize: 14, color: '#DDDDDD' }}
						style={styles.inputContainer}
						buttonOuterSize={20}
					/>

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
								value={(drugData.dose).toString()}
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
									value={(drugData.drugQuantity).toString()}
								/>
						</View>
					</View>

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
		width: (dimWidth * 0.9) * 0.24,
    },
	
	selectedFlatListInput: {
        height: dimHeight * 0.06128,
        borderWidth: 2,
		borderColor: '#77BFF4',
        paddingHorizontal: dimWidth * 0.04,
        borderRadius: 3,
        backgroundColor: '#212D3D',
        justifyContent: 'center',
		alignItems: "center",
		width: (dimWidth * 0.9) * 0.24,
    },

	unselectedFlatListInformationInput: {
        height: dimHeight * 0.06128,
        borderWidth: 2,
		borderColor: 'rgba(84, 84, 84, 1)',
        paddingHorizontal: dimWidth * 0.04,
        borderRadius: 3,
        backgroundColor: '#1F1F1F',
        justifyContent: 'center',
		alignItems: "center",
		width: (dimWidth * 0.9) * 0.5,
    },
	
	selectedFlatListInformationInput: {
        height: dimHeight * 0.06128,
        borderWidth: 2,
		borderColor: 'rgba(84, 84, 84, 1)',
        paddingHorizontal: dimWidth * 0.04,
        borderRadius: 3,
        backgroundColor: 'blue',
        justifyContent: 'center',
		alignItems: "center",
		width: (dimWidth * 0.9) * 0.5,
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
	searchAllDrugs,
	createNewDrugFromUser,
	getDrugs
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReminderForm)