import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import Header from "../../../components/headers/ReminderHeader";
import ReminderActiveList from "../../../components/reminder/ReminderActiveList";
import ReminderFinishedList from "../../../components/reminder/ReminderFinishedList";
import ReminderAddButton from '../../../assets/svg/ReminderAddButton'
import { ScrollView } from "react-native-gesture-handler";

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function Reminder(props) {

	const userData = props.userData
	function firstName(){
		return userData.firstName.split(' ')[0]
	}

	const [selectedStatus, setSelectedStatus] = useState('Active')

	async function changeStatus(status){
		setSelectedStatus(status)
	}

	const widthAdd = (dimWidth * 0.06945)
    const heightAdd = (dimHeight * 0.03677)
  
  	return (
		<View style={styles.container}>
			<Header
				navigate={props.navigation.navigate}
				name={firstName()}
			/>
			<View style={styles.options}>
				<View style={styles.statusContainer}>
					<TouchableOpacity
						activeOpacity={1}
						style={selectedStatus === 'Active' ? styles.selectedStatusInnerContainer: styles.unSelectedStatusInnerContainer}
						onPress={() => changeStatus('Active')}
					>
						<Text style={selectedStatus === 'Active' ? styles.selectedStatusText: styles.unSelectedStatusText}>AKTIF</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={1}
						onPress={() => changeStatus('Finished')}
						style={selectedStatus === 'Finished' ? styles.selectedStatusInnerContainer: styles.unSelectedStatusInnerContainer}
					>
						<Text style={selectedStatus === 'Finished' ? styles.selectedStatusText: styles.unSelectedStatusText}>SELESAI</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity 
					style={styles.optionAdd}
					onPress={() => props.navigation.navigate('AddReminderForm')}
				>
					<ReminderAddButton width={widthAdd} height={heightAdd}/>
				</TouchableOpacity>
			</View>
			{selectedStatus === 'Active' ? 
				<ReminderActiveList/> :
				<ReminderFinishedList/>
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

export default connect(mapStateToProps)(Reminder)