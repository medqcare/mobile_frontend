import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import IcPatient from '../../assets/svg/ic_pasien';
import { baseURL } from '../../config';
import { connect } from 'react-redux';
import { fetchCurrentQueueingNumber } from '../../stores/action'
import { ActivityIndicator } from 'react-native-paper';

const activeActivity = (props) => {
	let { queuingNumber, queueID } = props.data
	queueID = JSON.stringify(queueID)
	const { 
		data, 
	} = props

	const [currentQueueingNumber, setCurrentQueueingNumber] = useState(0)
	const [currentQueueingNumberLoading, setCurrentQueueingNumberLoading ] = useState(false)

	async function checkAsync(){
		try {
        	setCurrentQueueingNumberLoading(true)
			await props.fetchCurrentQueueingNumber(queueID, setCurrentQueueingNumber);
            setCurrentQueueingNumberLoading(false)
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		let socketer = socketers();
		checkAsync()

		return () => {
			setCurrentQueueingNumberLoading(false)
			socketer.close();
			console.log('Socket turned off');
		};
	}, []);

	function socketers() {
		console.log(`Socket turned on for queueID ${queueID}`)
		let socketIO = `${baseURL}`;
		let socket = io(socketIO);

		socket.on(`que-${JSON.parse(queueID)}`, (data) => {
			console.log('Data logged from socket: ', `que-${queueID}`);
			console.log(data);
			setCurrentQueueingNumber(data);
		});
		return socket;
	}

  	return (
		<View style={Styles.containerComponent}>
			<View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
				<Text style={{ color: '#B5B5B5' }}>Pasien </Text>
				<View style={{ flexDirection: 'row', marginTop: 10 }}>
					<View style={{ marginTop: 2 }}>
						<IcPatient />
					</View>
					<Text style={{ color: '#FFF', fontSize: 14, marginLeft: 10 }}>
						{data.patient.patientName}
					</Text>
				</View>
			</View>

			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<View
					style={{
						minWidth: '42%',
						margin: '2%',
						marginLeft: '4%',
						alignItems: 'center',
					}}
				>
					<Text style={{ color: '#B5B5B5' }}>Antrian Saat Ini</Text>
					<Text style={{ fontSize: 55, color: '#B5B5B5', fontWeight: 'bold' }}>
						{' '}
						{currentQueueingNumberLoading ? 
							<ActivityIndicator size={'small'} color={ '#B5B5B5'}/> : 
							currentQueueingNumber
						}
						{' '}
					</Text>
				</View>

				<View
					style={{
						width: 1,
						height: '80%',
						backgroundColor: '#757575',
					}}
				/>
					<View
						style={{
							minWidth: '42%',
							margin: '2%',
							marginRight: '4%',
							alignItems: 'center',
						}}
					>
						<Text style={{ color: '#FFBD00' }}>Antrian Saya</Text>
						<Text style={{ fontSize: 55, color: '#FFBD00', fontWeight: 'bold' }}>
							{' '}
							{queuingNumber}{' '}
						</Text>
					</View>

				</View>
				{/* <View style={Styles.bookingCodeBox}>
					<Text style={{color: '#DDDDDD', paddingHorizontal: 5, fontSize: 13}}>
					{props.data.registration.bookingCode}
					</Text>
					<Text
					style={{
						color: '#fff',
						paddingHorizontal: 5,
						fontSize: 13,
						fontWeight: 'bold',
					}}>
					{props.data.registration.bookingTime}
					</Text>
				</View> */}
		</View>
  	);
};
const Styles = StyleSheet.create({
  containerComponent: {
    // height: 150,
    width: '100%',
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: '#2F2F2F',
    // alignSelf: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  bookingCodeBox: {
    // paddingHorizontal: 25,
    width: '50%',
    paddingVertical: 10,
    backgroundColor: '#067019',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 8,
  },
  clockBox: {
    width: '90%',
    borderRadius: 6,
    backgroundColor: '#00b386',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});

const mapStateToProps = (state) => {
	return state;
  };
  
  const mapDispatchToProps = {
	fetchCurrentQueueingNumber
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(activeActivity);
