import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
} from "react-native";
import { connect } from "react-redux";
import Header from "../../../components/headers/GradientHeader";
import { getAllPrescriptions } from '../../../stores/action'

const dimension = Dimensions.get('window')
const dimHeight = dimension.height;
const dimWidth = dimension.width;

function Prescription({navigation, userData, getAllPrescriptions}) {
	useEffect(async () => {
		const token = JSON.parse(await AsyncStorage.getItem('token')).token
		const patientID = userData._id
		await getAllPrescriptions(patientID, token)
	}, [])
	
  	const [prescriptions, setPrescriptions] = useState(userData.prescriptions)
  
	return (
		<View style={styles.container}>
			<Header title="Resep" navigate={navigation.navigate} />
			<View style={styles.content}>
				{
					prescriptions ? (  
						<Text style={styles.textItem}>Ini datanya </Text>
					) : (
						<Text style={styles.textItem}>Belum Ada Resep</Text>
					)
				}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#181818",
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
 	getAllPrescriptions
}

export default connect(mapStateToProps, mapDispatchToProps)(Prescription)
