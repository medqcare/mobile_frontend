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
  Button
} from "react-native";
import { connect } from "react-redux";
import GreyHeader from '../../../components/headers/GreyHeader'
import { MaterialCommunityIcons, MaterialIcons  } from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import withZero from '../../../helpers/withZero'

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function AddReminderForm(props) {

	const [drugData, setDrugData] = useState({
		drugName: '',
		frequency: '',
		dose: '',
		duration: '',
		notes: '',
	})

	

	const newDate = new Date()
	const hours = newDate.getHours()
	const minutes = newDate.getMinutes()
	const [displayDate, setDisplayDate] = useState(`${withZero(hours)}:${withZero(minutes)}`)
	
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('time');
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		const hours = currentDate.getHours()
		const minutes = currentDate.getMinutes()
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
		setDisplayDate(`${withZero(hours)}:${withZero(minutes)}`);
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
									keyboardType={'numeric'}
									placeholderTextColor="#8b8b8b" 
									onChangeText={text =>
										setDrugData({...drugData, drugName: text})
									}
									value={drugData.drugName}
								/>
						</View>
					</View>

					{/* Frequency */}
					<View style={styles.inputContainer}>
						<View style={styles.input}>
							<Text style={styles.inputText}>Seharusnya ini modal picker</Text>
						</View>
					</View>

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
									onChangeText={text =>
										setDrugData({...drugData, drugName: text})
									}
									value={drugData.dose}
								/>
						</View>
					</View>

					{/* Duration */}
					<View style={styles.inputContainer}>
						<View style={styles.input}>
							<TextInput
									style={styles.inputText}
									autoCapitalize={'none'}
									autoFocus={false}
									placeholder={'Berapa lama dikonsumsi'}
									keyboardType={'numeric'}
									placeholderTextColor="#8b8b8b" 
									onChangeText={text =>
										setDrugData({...drugData, drugName: text})
									}
									value={drugData.duration}
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
									keyboardType={'numeric'}
									placeholderTextColor="#8b8b8b" 
									onChangeText={text =>
										setDrugData({...drugData, drugName: text})
									}
									value={drugData.notes}
								/>
						</View>
					</View>
				</View>
				<View style={styles.reminderFormContainer}>
					{/* Title */}
					<View style={styles.reminderTitle}>
						<Text style={styles.lightText}>Atur waktu pengingat</Text>
					</View>

					{/* Reminder time */}
					<View style={{paddingTop: 14,}}>
						<View style={styles.reminderTimeContainer}>
							<View style={{paddingHorizontal: 10}}>
								<View style={styles.reminderTopContainer}>
									<Text style={styles.lightText}>Jam pertama</Text>
								</View>
								<View style={styles.reminderLowerContainer}>
									<View style={{flexDirection: "row"}}>
										<MaterialIcons name="access-alarm" size={24} color="rgba(128, 128, 128, 1)" />
										<Text style={styles.reminderTimeText}>{displayDate}</Text>
									</View>
									<TouchableOpacity 
											onPress={showTimepicker} 
											// onPress={() => createCalendar()} 
											title="Show time picker!" 
										>
										<MaterialCommunityIcons name="pencil" size={24} color="rgba(128, 128, 128, 1)" />
									</TouchableOpacity>
									{show && (
										<DateTimePicker
											testID="dateTimePicker"
											value={date}
											mode={mode}
											is24Hour={true}
											display="default"
											onChange={onChange}
										/>
									)}
								</View>
							</View>
						</View>
					</View>
					{/* <View style={{paddingTop: 14}}>
						<View style={styles.reminderTimeContainer}>
							<View style={{paddingHorizontal: 10}}>
								<View style={styles.reminderTopContainer}>
									<Text style={styles.lightText}>Jam kedua</Text>
								</View>
								<View style={styles.reminderLowerContainer}>
									<View style={{flexDirection: "row"}}>
										<MaterialIcons name="access-alarm" size={24} color="rgba(128, 128, 128, 1)" />
										<Text style={styles.reminderTimeText}>13:00</Text>
									</View>
									<TouchableOpacity
										onPress={() => create()}
									>
										<MaterialCommunityIcons name="pencil" size={24} color="rgba(128, 128, 128, 1)" />
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
					<View style={{paddingTop: 14}}>
						<View style={styles.reminderTimeContainer}>
							<View style={{paddingHorizontal: 10}}>
								<View style={styles.reminderTopContainer}>
									<Text style={styles.lightText}>Jam ketiga</Text>
								</View>
								<View style={styles.reminderLowerContainer}>
									<View style={{flexDirection: "row"}}>
										<MaterialIcons name="access-alarm" size={24} color="rgba(128, 128, 128, 1)" />
										<Text style={styles.reminderTimeText}>18:00</Text>
									</View>
									<TouchableOpacity
										onPress={() => create()}
									>
										<MaterialCommunityIcons name="pencil" size={24} color="rgba(128, 128, 128, 1)" />
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View> */}
				</View>
				<View style={styles.buttonContainer}>
					
					<TouchableOpacity
						onPress={() => console.log('add reminder')}
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
		height: dimHeight * 0.88,
		justifyContent: "flex-start",
		alignItems: 'center',
	},

	inputFormContainer: {
		paddingVertical: dimHeight * 0.02452,
		width: dimWidth * 0.9
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
		fontSize: 20,
		fontWeight: '500',
		paddingLeft: 5
	},
	
	
	// SET ALL NUMBER TO DIMWIDTH OR DIMHEIGHT

	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: dimHeight * 0.07353,
	},

	button: {
		height: dimHeight * 0.05,
		width: dimWidth * 0.9,
		backgroundColor: "#005ea2",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		marginVertical: dimHeight * 0.012256,
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

export default connect(mapStateToProps)(AddReminderForm)