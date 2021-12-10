import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import Header from "../../../components/headers/ReminderHeader";
import ReminderActiveList from "../../../components/reminder/ReminderActiveList";
import ReminderFinishedList from "../../../components/reminder/ReminderFinishedList";
import ReminderAddButton from '../../../assets/svg/ReminderAddButton'

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
  
  	return (
		<View style={styles.container}>
			<Header
				navigate={props.navigation.navigate}
				name={firstName()}
			/>
			<View style={styles.content}>
				<View style={styles.options}>
					<View style={styles.statusContainer}>
						<TouchableOpacity
							activeOpacity={1}
							style={selectedStatus === 'Active' ? styles.selectedStatusInnerContainer: styles.unSelectedStatusInnerContainer}
							onPress={() => changeStatus('Active')}
						>
							<Text style={selectedStatus === 'Active' ? styles.selectedStatusText: styles.unSelectedStatusText}>Aktif</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={1}
							onPress={() => changeStatus('Finished')}
							style={selectedStatus === 'Finished' ? styles.selectedStatusInnerContainer: styles.unSelectedStatusInnerContainer}
						>
							<Text style={selectedStatus === 'Finished' ? styles.selectedStatusText: styles.unSelectedStatusText}>Selesai</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity 
						style={styles.optionAdd}
						onPress={() => console.log('Add button')}
					>
						<ReminderAddButton/>
					</TouchableOpacity>
				</View>
				{selectedStatus === 'Active' ? 
					<ReminderActiveList/> :
					<ReminderFinishedList/>
				}
			</View>
		</View>
  	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1F1F1F",
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