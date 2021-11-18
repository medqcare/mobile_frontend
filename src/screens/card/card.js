import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Picker,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RadioForm from 'react-native-radio-form'
// { RadioButton, RadioButtonInput, RadioButtonLabel } 

import { connect } from 'react-redux';
import axios from 'axios';
import { baseURL } from '../../config';

import { setLoading } from '../../stores/action';

import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'
import IconFA from 'react-native-vector-icons/FontAwesome';
import LottieLoader from 'lottie-react-native'
import {LinearGradient} from 'expo-linear-gradient'
import Modal from 'react-native-modal';
import ArrowBack from '../../assets/svg/ArrowBack'


const card = props => {
  const [hospital, setHospital] = useState(null);
  const [book, setBook] = useState({
    _id: null,
    firstName: 'Name', 
  });
  const [family, setFamily] = useState([]);

  const [facility, setFacility] = useState(null)
  const [aktif, setAktif] = useState('Hospital')
  const facilityName = [
    { label: 'Hospital', value: 'Hospital' },
    { label: 'Clinic', value: 'Clinic' },
    { label: 'Private', value: 'Private' },
  ]

  const [load, setLoad] = useState(false)
  const [modalPatient, setModalPatient] = useState(false)
  const [selectedValue, setSelectedValue] = useState(props.userData.lastName? props.userData.firstName + " " + props.userData.lastName : props.userData.firstName)

  useEffect(() => {
    setLoad(true)
    if (props.userData) {
      getFamily();
      setBook({
        _id: props.userData._id,
        firstName: props.userData.firstName,
      });
      getDataHospital(props.userData._id);
      setFacility(facilityName[0].value)
    } else {
      props.navigation.navigate('ProfileSwitch')
    }

  }, [])

  const getDataHospital = async _id => {
    let token = await AsyncStorage.getItem('token');
    return new Promise(async (resolve, reject) => {
      try {
        let { data, status } = await axios({
          method: 'POST',
          url: `${baseURL}/api/v1/members/patientFacility`,
          headers: { Authorization: JSON.parse(token).token },
          data: { patientID: _id },
        });
        if (status == 204) {
          setHospital(null);
          setLoad(false);
        } else {
          setHospital(data.data);
          resolve(data);
          setLoad(false)
        }
      } catch (error) {
        reject(error);
        setLoad(false)
      }
    });
  };

  function getFamily() {
    if (props.userData !== null) {
      let dataFamily = {
        ...props.userData,
      };
      delete dataFamily.family;
      const temp = [dataFamily];
      props.userData.family.forEach(el => {
        temp.push(el);
      });
      setFamily(family.concat(temp))
    }
  }

  const [showCard, setShow] = useState([])

  useEffect(() => {
    let temp = []
    {
      hospital &&
        hospital.map(item => {
          if (item.facilityID.facilityMainType == facility) {
            setAktif(item.facilityID.facilityMainType)
            temp.push(item)
          }
        })
      setShow(temp)
    }
  }, [hospital, facility])

  return (
    <View style={styles.container}>
     	<LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#073B88",  "#048FBB"]} style={style.content}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => props.navigation.navigate('Home')}>
					<View style={{ flexDirection: 'row', marginBottom: 15}} >
						<ArrowBack />
						<Text style={{ fontSize: 20, color: '#ffff', position: 'relative', }}>Digital Card</Text>
					</View>
				</TouchableOpacity>
			</View>
		</LinearGradient>
      	<View 
		  	style={{
				backgroundColor: '#2F2F2F',
				padding: 10,
				flexDirection: 'row',
				justifyContent: 'center',
				shadowColor: '#C2C2C2',
				shadowOffset: { height: 5, width: 5 },
				shadowOpacity: 0.61,
				shadowRadius: 9.11,
				elevation: 9
			}}>

          	

			{/* Picker for family members */}
			<TouchableOpacity 
				onPress={() => setModalPatient(true)}
				style={styles.button}
			>
				<View style={{ padding: 5, justifyContent: 'center' }}>
					<IconFA name='user-o' size={25} color='#fff' />
				</View>
				<View style={{paddingLeft: 15}}>
					<Text style={styles.buttonText}>{selectedValue}</Text>
				</View>
			</TouchableOpacity>
			<Modal
          		isVisible={modalPatient}
				swipeDirection={'down'}
				onSwipeComplete={() => setModalPatient(false)}
				style={{
					justifyContent: 'flex-end',
					margin: 0,
				}}
				animationType="slide"
				onRequestClose={() => setModalPatient(false)}
			>
				<View style={viewModalP.container}>
					<View style={viewModalP.header}>
						<View style={viewModalP.toogle} />
						<Text style={viewModalP.title}>
							Siapa yang ingin anda periksa kartunya?
						</Text>
					</View>
					<View style={viewModalP.patient}>
						<Text style={viewModalP.titleP}>MySelf</Text>
						<TouchableOpacity
							onPress={() => {
								setSelectedValue(props.userData.lastName ? props.userData.firstName + " " + props.userData.lastName : props.userData.firstName)
								setBook({
									...book,
									_id: book._id,
									firstName: selectedValue,
								});
								setLoad(true);
								setModalPatient(false)
								getDataHospital(props.userData._id)
									.then(async data => {
										// console.log(data, 'datanya');
										setHospital(data.data);
										setLoad(false);
									})
									.catch(err => {
										console.log(err);
										setHospital(null);
										setLoad(false);
									});
							}}>
							<View style={viewModalP.cardName}>
								<View style={viewModalP.familyName}>
									<Image
										style={viewModalP.photo}
										source={{
											uri:
											'https://www.mbrsg.ae/MBRSG/media/Images/no-image-icon-6.png',
										}}
									/>
									<Text style={viewModalP.name}>
										{props.userData.lastName ? props.userData.firstName + " " + props.userData.lastName : props.userData.firstName}
									</Text>
								</View>
								<View style={viewModalP.vector}>
									{/* <SvgUri
										width="10"
										height="10"
										source={require('../../assets/svg/Vector.svg')}
									/> */}
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={viewModalP.patient}>
						<Text style={viewModalP.titleP}>
							My Family ({family.length - 1})
						</Text>
						<SafeAreaView>
							<ScrollView>
								<TouchableHighlight>
									<TouchableWithoutFeedback>
										<View>
											{family.map((lang, itemIndex) => {
												return (
													<View key={itemIndex}>
														{itemIndex !== 0 ? (
															<TouchableOpacity
																onPress={() => {
																	setSelectedValue(lang.lastName ? lang.firstName + " " + lang.lastName : lang.firstName)
																	setBook({
																		...book,
																		_id: family[itemIndex]._id,
																		firstName: lang.lastName ? lang.firstName + " " + lang.lastName : lang.firstName,
																	});
																	setModalPatient(false)
																	setLoad(true);
																	getDataHospital(family[itemIndex]._id)
																		.then(async data => {
																			// console.log(data, 'datanya');
																			setHospital(data.data);
																			setLoad(false);
																		})
																		.catch(err => {
																			console.log(err);
																			setHospital(null);
																			setLoad(false);
																		});
																}}
															>
																<View style={viewModalP.cardName}>
																	<View style={viewModalP.familyName}>
																		<Image
																			style={viewModalP.photo}
																			source={{
																			uri:
																				'https://www.mbrsg.ae/MBRSG/media/Images/no-image-icon-6.png',
																			}}
																		/>
																		<Text style={viewModalP.name}>
																			{lang.lastName
																			? lang.firstName + ' ' + lang.lastName
																			: lang.firstName}
																		</Text>
																	</View>
																	<View style={viewModalP.vector}>
																		{/* <SvgUri
																			width="10"
																			height="10"
																			source={require('../../assets/svg/Vector.svg')}
																		/> */}
																	</View>
																</View>
															</TouchableOpacity>
														) : null}
													</View>
												);
											})}

											<View style={viewModalP.buttonAdd}>
												<View style={viewModalP.vectorPlus}>
													{/* <SvgUri
														width="10"
														height="10"
														source={require('../../assets/svg/VectorPlus.svg')}
													/> */}
												</View>
												<Text style={viewModalP.addTitle}>
													Tambah Keluarga
												</Text>
											</View>
										</View>
									</TouchableWithoutFeedback>
								</TouchableHighlight>
							</ScrollView>
						</SafeAreaView>
					</View>
				</View>
        	</Modal>
            {/* <Picker
				mode={'dropdown'}
				selectedValue={book.firstName}
				style={{ flex:1}}
				onValueChange={(itemValue, itemIndex) => {
				// console.log(itemValue, 'ini valuenya');
                setBook({
					...book,
					_id: family[itemIndex]._id,
					firstName: itemValue,
                });
                setLoad(true);
                getDataHospital(family[itemIndex]._id)
					.then(async data => {
						// console.log(data, 'datanya');
						setHospital(data.data);
						setLoad(false);
					})
					.catch(err => {
						console.log(err);
						setHospital(null);
						setLoad(false);
					});
			}}>
				{family.map((el, i) => {
					return (
						<Picker.Item
							key={i}
							label={el.lastName ? el.firstName + " " + el.lastName : el.firstName}
							value={el.lastName ? el.firstName + " " + el.lastName : el.firstName}
						/>
					);
				})}
            </Picker> */}
		</View>

		{/* Choose which institute to look from */}
		<View style={styles.instituteContainer}>
            <TouchableOpacity 
				onPress={() => setFacility('Hospital')} 
				style={{...styles.instituteTouchable, backgroundColor: (facility == 'Hospital' ? '#005ea2' : '#FFF')
            }}>
              	<Text style={{ color: (facility == 'Hospital' ? '#FFF' : '#000') }}>Hospital</Text>
            </TouchableOpacity>

            <TouchableOpacity 
				onPress={() => setFacility('Clinic')} 
				style={{...styles.instituteTouchable, backgroundColor: (facility == 'Clinic' ? '#005ea2' : '#FFF')
            }}>
              	<Text style={{ color: (facility == 'Clinic' ? '#FFF' : '#000') }}>Clinic</Text>
            </TouchableOpacity>

            <TouchableOpacity 
				onPress={() => setFacility('Private')} 
				style={{...styles.instituteTouchable, backgroundColor: (facility == 'Private' ? '#005ea2' : '#FFF')
            }}>
              	<Text style={{ color: (facility == 'Private' ? '#FFF' : '#000') }}>Private</Text>
            </TouchableOpacity>
          </View>
          
		{/* Card components */}
      	<View style={styles.cardContainer}>
			{load ? (
				<LottieLoader
					source={require('../animation/loading.json')}
					autoPlay
					loop
				/>
			) : (
				showCard.length ? (
					<ScrollView style={styles.innerCardContainer}>
						{showCard.map((regHos, index) => {
							return (
								<TouchableOpacity
									activeOpacity={0.7}
									key={index}
									style={styles.cardTouchable}
								>
									<View style={styles.card}>
										<View style={{ position: 'absolute', width: '100%', }}>
											<View style={styles.cardHeader}>
												<Text style={styles.cardHospitalName}>
													{regHos.facilityID.facilityName}
												</Text>
												<Text style={styles.cardHospitalAddress}>
													{regHos.facilityID.address}
												</Text>
											</View>
											<View style={{ height: '100%', padding: 10 }}>
												<Text style={styles.cardPatientName}>{regHos.patient.patientName}</Text>
												{regHos.medrecNumber ? (
													<Text style={styles.cardNumberText}>MR Number : {regHos.medrecNumber}</Text>
													) : (
														<View
														style={{
															flexDirection: 'row',
															justifyContent: 'space-between',
															alignItems: 'center'
														}}>
														<Text style={styles.cardNumberText}>MR Number : -</Text>
														<IconFA
															name="warning"
															size={15}
															color="red"
															style={{ marginRight: 10 }}
														/>
														</View>
													)
												}
											</View>
										</View>
									</View>
								</TouchableOpacity>
							)
							})}
					</ScrollView>
				) : (
					<View style={styles.noData}>
								<Text style={styles.noDataText}>You don't have a card yet</Text>
					</View>
				)
			)}
      	</View>

    </View>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1F1F1F'
	},
	header: {
        flexDirection: 'row',
        height: 75,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
	button: {
		flexDirection: 'row',
		width: '100%',
		height: 50,
		backgroundColor: '#005EA2',
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		fontSize: 15,
		color: '#DDDDDD',
	},
	instituteContainer: { 
		justifyContent: 'space-between', 
		width: '100%', 
		flexDirection: 'row' 
	},
	instituteTouchable: {
		flex: 1,
		borderColor: '#C2C2C2',
		borderWidth: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 15,
	},
	cardContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
	},
	innerCardContainer: {
		flex: 1,
		width:'100%',
		height: '100%'
	},
	noData: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	noDataText: {
		alignItems:'center', 
		justifyContent: 'center', 
		color: '#fff'
	},
	cardTouchable: {
		backgroundColor: '#2f2f2f',
		width: '100%',
		overflow: 'hidden',
		flexShrink: 1,
		borderRadius: 10,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#8D8D8D',
		maxHeight: Dimensions.get('screen').height * 0.23,
	  },
	card: {
		width: '100%',
		minHeight: Dimensions.get('screen').height * 0.23,
	},
	cardHeader: { 
		maxHeight: 80, 
		backgroundColor: '#005ea2', 
		padding: 10 
	},
	cardHospitalName: {
		fontWeight: 'bold',
		color: '#FFF'
	},
	cardHospitalAddress: {
		color: '#FFF',
		fontSize: 10
	},
	cardPatientName: { 
		fontWeight: 'bold', 
		fontSize: 16, 
		color: '#DDDDDD' 
	},
	cardNumberText: { 
		color: '#DDDDDD' 
	}
})

const viewModalP = StyleSheet.create({
	container: {
	  maxHeight: '100%',
	  backgroundColor: '#2F2F2F',
	  borderTopLeftRadius: 20,
	  borderTopRightRadius: 20,
	},
	header: {
	  marginTop: 20,
	  flexDirection: 'row',
	  justifyContent: 'center',
	  marginBottom: 20,
	},
	toogle: {
	  position: 'absolute',
	  borderWidth: 2,
	  width: 50,
	  borderColor: '#6C6C6C',
	  alignContent: 'center',
	  marginBottom: 20,
	},
	title: {
	  color: 'white',
	  fontSize: 13,
	  textAlign: 'center',
	  marginTop: 20,
	},
	patient: {
	  marginHorizontal: 15,
	  marginBottom: 20,
	},
	titleP: {
	  color: 'white',
	  fontSize: 12,
	},
	cardName: {
	  marginTop: 10,
	  borderColor: '#757575',
	  borderWidth: 1,
	  borderRadius: 3,
	  minHeight: 50,
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  paddingHorizontal: 10,
	},
	familyName: {
	  flexDirection: 'row',
	},
	photo: {
	  marginVertical: 7,
	  width: 35,
	  height: 35,
	  borderRadius: 50,
	  borderWidth: 1,
	  borderColor: '#4fe39b',
	},
	name: {
	  marginTop: 15,
	  marginLeft: 15,
	  color: '#DDDDDD',
	},
	vector: {
	  marginVertical: 20,
	},
	buttonAdd: {
	  marginTop: 20,
	  flexDirection: 'row',
	  justifyContent: 'center',
	},
	vectorPlus: {
	  marginTop: 5,
	  marginRight: 5,
	},
	addTitle: {
	  color: '#4398D1',
	},
  });

const viewStyle = StyleSheet.create({
  outer: {
    width:'100%'
    // backgroundColor: '#ACF9AE'
  },
  facility: {
    flex: 1,
    borderColor: '#C2C2C2',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  }
});

const style = StyleSheet.create({
  container: {
    // backgroundColor: '#CACEEA',
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: 'pink',
    width: 250,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#FFF',
    width: '100%',
    overflow: 'hidden',
    flexShrink: 1,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#8D8D8D',
    maxHeight: Dimensions.get('screen').height * 0.23,
  },
  hospital_image: {
    width: '100%',
    minHeight: Dimensions.get('screen').height * 0.23,
    opacity: 0.1,
    // overflow: 'hidden',
  },
  hospital_description: {
    width: '70%',
    padding: 10,
  },
  hospitalName: {
    fontWeight: 'bold',
    // color: '#042E00',
    color: '#FFF'
  },
  hospitalAddress: {
    // color: '#042E00',
    color: '#FFF',
    fontSize: 10
  },
});

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = {
  setLoading,
};
export default connect(mapStateToProps, mapDispatchToProps)(card);
