import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  BackHandler,
} from 'react-native';
import Header from '../../components/headers/GradientHeader';
import Activity from './activity';
import LottieLoader from 'lottie-react-native';

//action
import {
  getTodayRegistration,
  getCurrentQueueingNumber,
  getTodaysRegistration,
} from '../../stores/action';

const activityList = (props) => {
	const [refresh, setRefresh] = useState(true)
	const { userData } = props.userDataReducer
	const { queues, isLoading, error } = props.queuesReducer

	useEffect(() => {
		fetchdata();
	}, [props.navigation.state.params]);

	async function fetchdata() {
		try {
			const userID = userData.userID._id
			await props.getTodaysRegistration(userID)
			setRefresh(false)
		} catch (error) {
			console.log(error);
		}
	}

	BackHandler.addEventListener('hardwareBackPress', () => {
		props.navigation.navigate('Home');
		return true;
	});

  	return (
    	<>
      		<Header title={'Antrian'} navigate={props.navigation.navigate} />
			<View style={styles.container}>
				{isLoading ? (
					<LottieLoader
						source={require('../animation/loading.json')}
						loop
						autoPlay
					/>
				) : (
					<View>
						{!queues?.length && (
							<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: 25,
							}}
							>
							<Text style={{ color: '#fff' }}>
								Tidak ada daftar antrian
							</Text>
							</View>
						)}
						{isLoading ? 
							<LottieLoader
							source={require('../animation/loading.json')}
							loop
							autoPlay
							/> : 
						queues && (
							<FlatList
								data={queues}
								showsVerticalScrollIndicator={false}
								renderItem={({ item: el }) => {
									return (
										<Activity
											navigation={props.navigation}
											data={el}
										/>
									);
								}}
								keyExtractor={(item) => item._id}
							/>
						)}
					</View>
				)}
			</View>
    	</>
  	);
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  getTodayRegistration,
  getCurrentQueueingNumber,
  getTodaysRegistration,
};
export default connect(mapStateToProps, mapDispatchToProps)(activityList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    padding: 14,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 20,
    paddingTop: StatusBar.currentHeight + 20,
    backgroundColor: 'teal',
    color: '#fff',
  },
  activityCard: {
    flexDirection: 'row',
    width: '95%',
    minHeight: 100,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 3,
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  leftActivityCard: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'limegreen',
    borderRadius: 3,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 9,
    padding: 10,
    width: '25%',
  },
  rightActivityCard: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '75%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 3,
  },
});
