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
  FlatList,
  LogBox,
  ToastAndroid
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
import QuantitySelector from '../../../components/reminder/QuantitySelector'


const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function AddReminderForm(props) {
	const { activeDrugs, webDrugs, isLoading } = props.drugReducer

	useEffect(() => {
		LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
	  }, [])

	const items = [
		 {
		  "id": 1,
		  "name": "Drug Name",
		},
	]

	const [errorDrugData, setErrorDrugData] = useState({
		itemName: false,
		dose: false,
		drugQuantity: false,
		ettquetteLength: false,
		quantityTotal: false,
	})

	const [drugData, setDrugData] = useState({
		dose: '',
		duration: '',
		notes: '',
		etiquette: [],
		information: 'Sebelum Makan',
		drugQuantity: 1,
		quantityTotal: 1,
		expiredDate: new Date(),
		patientID: props.userDataReducer.userData._id
	})

	const [selectedItem, setSelectedItem] = useState(null)

	const newDate = new Date()
	const formattedDate = getFormattedDate(newDate, true)
	const fullDateFormat = fullMonthFormat(formattedDate)
	const [displayDate, setDisplayDate] = useState(fullDateFormat)

	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('time');
	const [show, setShow] = useState(false);

	const [etiquetteList, setEtiquetteList] = useState([
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
		const formattedDate = getFormattedDate(currentDate, true)
		const fullDateFormat = fullMonthFormat(formattedDate)
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
		setDisplayDate(fullDateFormat);
		setDrugData({
			...drugData,
			expiredDate: currentDate
		})
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
			if(!text){
				setSelectedItem({
					name: ''
				})
				return setDrugData({
					dose: drugData.dose,
					duration: drugData.duration,
					notes: drugData.notes,
					etiquette: drugData.etiquette,
					information: drugData.information,
					drugQuantity: drugData.drugQuantity,
					quantityTotal: drugData.quantityTotal,
				})
			}
			setSelectedItem({
				name: text
			})
			setDrugData({
				...drugData,
				itemName: text
			})
		} catch (error) {
			console.log(error.message)			
		}
	}

	function addEttiquete(value, index, list){
		const newArray = []

		if(list === 'etiquette'){
			const arrayOfEttiquetesList = etiquetteList.map((el, idx) => {
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
	
			setEtiquetteList(arrayOfEttiquetesList)
			setDrugData({
				...drugData,
				etiquette: newArray
			})
		} 
	}

	const Label = ({text}) => (
		<View style={styles.labelContainer}>
			<Text style={styles.labelText}>{text}</Text>
		</View>
	)

	const EttiqueteItem = ({ value, selected, index, id}) => (
		<TouchableOpacity 
			style={[{paddingLeft: index === 0 ? 0 : dimWidth * 0.009838, justifyContent: "space-between"}]}
			onPress={() => {
				setErrorDrugData({
					...errorDrugData,
					ettquetteLength: false
				})
				addEttiquete(value, index, 'etiquette')}
			}
		>
			<View style={errorDrugData.ettquetteLength ? styles.errorSelectedFlatListInput : (selected ? styles.selectedFlatListInput : styles.unselectedFlatListInput)}>
				<Text style={styles.inputText}>{value}</Text>
			</View>
		</TouchableOpacity>
	);
	
	const RenderEttiqueteItem = ({ item , index, id}) => (
		<EttiqueteItem key={index} value={item.value} selected={item.selected} index={index} id={id} />
	)
		
	async function createDrug(){
		try {
			const { dose, drugQuantity, etiquette, information, quantityTotal, patientID } = drugData
			if(dose && drugQuantity && etiquette.length > 0 && information && quantityTotal && patientID && drugData.itemName){
				await props.createNewDrugFromUser(drugData, activeDrugs)
				props.navigation.pop()			
			} else {
				setErrorDrugData({
					itemName: drugData.itemName ? false : true,
					dose: dose ? false: true,
					drugQuantity: drugQuantity ?  false: true,
					ettquetteLength: etiquette.length > 0 ? false: true,
					quantityTotal: quantityTotal ? false: true,
				})
				ToastAndroid.show('Mohon melengkapi semua data terlebih dahulu', ToastAndroid.SHORT)
			}
		} catch (error) {
			console.log(error)
		}
	}

	// console.log(Object.keys(webDrugs[0]));
  	return (
		<View style={styles.container}>
			<GreyHeader
				navigate={props.navigation.navigate}
				navigateBack="Reminder"
				title="Tambah Pengingat Obat"
				// hidden={false}
			/>
			<View style={styles.content}>
				<View>
					<View style={styles.inputFormContainer}>
						<View style={[styles.topLabelContainer]}>
							<Text style={styles.labelText}>Nama Obat</Text>
						</View>
						{/* Drug Name */}
						<SearchableDropdown
							onItemSelect={(item) => {
								setSelectedItem(item)
								setDrugData({
									...drugData,
									...item,
								})
							}}
							itemStyle={styles.itemStyle}
							itemTextStyle={{ color: '#222' }}
							itemsContainerStyle={{ maxHeight: 150 }}
							items={webDrugs}
							resetValue={true}
							textInputProps={
							{
								placeholder: "Nama obat",
								placeholderTextColor: '#8b8b8b',
								underlineColorAndroid: "transparent",
								value: selectedItem ? selectedItem.name : '',
								style: {
									...styles.input,
									borderColor: errorDrugData.itemName ? 'rgba(174, 45, 45, 1)' : 'rgba(84, 84, 84, 1)',
									color: 'white'
								},
								onTextChange: text => getDrugsByName(text)
							}
							}
							listProps={{
								nestedScrollEnabled: true,
							}}
						/>

						<ScrollView style={{height: "80%", }}>

						{/* Ettiquete */}
						<Label text={'Etiket Minum'}/>
						<View style={{flexDirection: "row"}}>
							{etiquetteList.map((el, index) => {
								return (
									<RenderEttiqueteItem key={index} item={el} index={index}/>
									)
								})}
						</View>

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
							labelStyle={{ paddingRight: 10, color: '#DDDDDD' }}
							style={styles.inputContainer}
							buttonOuterSize={20}
						/>

						{/* Quantity */}
						<Label text={'Jumlah Obat'}/>
						<QuantitySelector drugData={drugData} setDrugData={setDrugData}/>

						{/* Dose */}
						<Label text={'Dosis (Jumlah obat sekali makan)'}/>
						<View style={errorDrugData.dose ? styles.errorInput : styles.input}>
							<TextInput
								style={styles.inputText}
								autoCapitalize={'none'}
								autoFocus={false}
								placeholder={'Cth: 1'}
								keyboardType={'numeric'}
								placeholderTextColor="#8b8b8b" 
								onChangeText={number =>
									setDrugData({...drugData, dose: number})
								}
								value={(drugData.dose).toString()}
							/>
						</View>				
		
						{/* Expired Date */}
						<Label text={'Kadaluwarsa'}/>
						<View style={styles.input}>
							<TouchableOpacity 
								style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}
								onPress={() => showDatepicker()}
							>
								<Text style={styles.reminderTimeText}>{displayDate}</Text>
								<FontAwesome name="calendar" size={dimHeight * 0.02405} color="white" />
							</TouchableOpacity>
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
						<Label text={'Catatan (Opsional)'}/>
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

						</ScrollView>
					</View>
				</View>
				
				<View style={styles.buttonContainer}>	
					<TouchableOpacity
						onPress={() => createDrug()}
						disabled={isLoading}
						style={styles.button}
					>
						{isLoading ? (
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
		paddingVertical: dimHeight * 0.011025,
		paddingHorizontal: dimWidth * 0.033449,
		borderRadius: 3,
		marginVertical: 0.050117
	},

	container: {
		flex: 1,
		backgroundColor: "#1F1F1F",
	},
	
	content: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	inputFormContainer: {
		paddingVertical: dimHeight * 0.02452,
		width: dimWidth * 0.9,
	},

	topLabelContainer: {
		marginBottom: dimHeight * 0.006
	},

	labelContainer: {
		marginTop: dimHeight * 0.02,
		marginBottom: dimHeight * 0.006
	},

	inputContainer: {
		paddingTop: dimHeight * 0.03
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

	errorInput: {
		height: dimHeight * 0.06128,
        borderWidth: 2,
		borderColor: 'rgba(174, 45, 45, 1)',
        paddingHorizontal: dimWidth * 0.04,
        borderRadius: 3,
        backgroundColor: '#1F1F1F',
        justifyContent: 'center'
	},

	itemStyle: {
		padding: 10,
		marginTop: 2,
		backgroundColor: '#ddd',
		borderColor: '#bbb',
		borderWidth: 1,
		borderRadius: 5,
	},

	unselectedFlatListInput: {
        height: dimHeight * 0.06128,
		width: dimWidth * 0.9 * 0.25 - (dimWidth * 0.009838),
        borderWidth: 2,
		borderColor: 'rgba(84, 84, 84, 1)',
        borderRadius: 3,
        backgroundColor: '#1F1F1F',
        justifyContent: 'center',
		alignItems: "center",
    },
	
	errorSelectedFlatListInput: {
        height: dimHeight * 0.06128,
		width: dimWidth * 0.9 * 0.25 - (dimWidth * 0.009838),
        borderWidth: 2,
		borderColor: 'rgba(174, 45, 45, 1)',
        borderRadius: 3,
		backgroundColor: '#1F1F1F',
        justifyContent: 'center',
		alignItems: "center",
    },

	selectedFlatListInput: {
        height: dimHeight * 0.06128,
		width: dimWidth * 0.9 * 0.25 - (dimWidth * 0.009838),
        borderWidth: 2,
		borderColor: '#77BFF4',
        borderRadius: 3,
        backgroundColor: '#212D3D',
        justifyContent: 'center',
		alignItems: "center",
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

	reminderFormContainer: {
		paddingTop: dimHeight * 0.0160377,
		width: dimWidth * 0.9
	},

	reminderTitle: {
		alignSelf: "flex-start",
	},

	reminderTimeContainer: {
		borderBottomWidth: 2,
		borderBottomColor: 'rgba(71, 71, 71, 1)',
		paddingBottom: dimHeight * 0.0100235
	},

	reminderTopContainer: {
		alignSelf: "flex-start",
		backgroundColor: 'rgba(47, 47, 47, 1)',
		paddingVertical: dimHeight * 0.004009,
		paddingHorizontal: dimWidth * 0.0118
	},

	reminderLowerContainer: {
		flexDirection: "row",
		width: '100%',
		justifyContent: "space-between",
		paddingTop: dimHeight * 0.0100235
	},

	reminderTimeText: {
		color: '#DDDDDD',
		fontWeight: '500',
	},
	
	
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: dimHeight * 0.0150353
	},

	button: {
		height: dimHeight * 0.05,
		width: dimWidth * 0.9,
		backgroundColor: "#005ea2",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},

	buttonText: {
		color: 'rgba(221, 221, 221, 1)',
		fontWeight: '500',
	},
	
	lightText: {
		color: 'rgba(181, 181, 181, 1)'	
	},

	labelText: {
		color: '#B5B5B5'
	}
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