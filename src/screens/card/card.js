import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { baseURL } from '../../config';
import { setLoading } from '../../stores/action';
import AsyncStorage from '@react-native-async-storage/async-storage'
import LottieLoader from 'lottie-react-native'
import { LinearGradient } from 'expo-linear-gradient'
import SelectPatient from '../../components/modals/selectPatient';
import GradientHeader from '../../components/home/headers/GradientHeader';


const card = props => {
  const [hospital, setHospital] = useState(null);
  const [book, setBook] = useState({
    _id: null,
    fullName: 'Name', 
  });
  const [family, setFamily] = useState([]);
  const [accountOwner, setAccountOwner] = useState(props.userData);

  const [facility, setFacility] = useState(null)
  const [aktif, setAktif] = useState('Hospital')
  const facilityName = [
    { label: 'Hospital', value: 'Hospital' },
    { label: 'Clinic', value: 'Clinic' },
    { label: 'Private', value: 'Private' },
  ]

  const [load, setLoad] = useState(false)
  const [modalPatient, setModalPatient] = useState(false)
  const [displayName, setDisplayName] = useState(props.userData?.lastName? props.userData?.firstName + " " + props.userData?.lastName : props.userData?.firstName)

  function setSelectedValue(data){
	const fullName = data.lastName ? data.firstName + " " + data.lastName : data.firstName
	const _id = data._id
	setDisplayName(fullName)
	setBook({
		_id,
		fullName
	});
	setLoad(true);
	getDataHospital(_id)
		.then(async data => {
			setHospital(data.data);
			setLoad(false);
		})
		.catch(err => {
			setHospital(null);
			setLoad(false);
		});
  }

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
		<GradientHeader
			navigate={props.navigation.navigate}
			navigateBack={'Home'}
			title='Digital Card'    
		/>
      	<View 
		  	style={{
				backgroundColor: '#1F1F1F',
				padding: 10,
				flexDirection: 'row',
				justifyContent: 'center',
			}}>
          	
			{/* Picker for family members */}
			<View style={styles.boxContainer}>
				<TouchableOpacity
					onPress={() => setModalPatient(true)}
					style={{...styles.box, height: 50}}>
					<Text style={styles.inputText}>{displayName}</Text>
					<Image source={require('../../assets/png/ArrowDown.png')} />
				</TouchableOpacity>

				<SelectPatient
					modal={modalPatient}
					setModal={setModalPatient}
					accountOwner={accountOwner}
					family={family}
					title="Siapa yang ingin anda periksa kartunya?"
					setSelectedValue={setSelectedValue}
				/>
			</View>
		</View>

		{/* Choose which institute to look from */}
		{/* <View style={styles.instituteContainer}>
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
          </View> */}
          
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
							const fullName = regHos.patient.patientName || 'John Doe'
							const RM = regHos.medrecNumber || 'P00000052'
							const dob = regHos.patient.dob || '27 Oktober 1964'
							return (
								<TouchableOpacity
									activeOpacity={0.7}
									key={index}
									style={styles.cardTouchable}
								>
									<View style={styles.card}>
											<View style={styles.cardHeader}>
												<Text style={styles.cardHospitalName}>
													{regHos.facilityID.facilityName}
												</Text>
												<Text style={styles.cardHospitalAddress}>
													{regHos.facilityID.address}
												</Text>
											</View>
											<View style={styles.cardContent}>
													<ImageBackground
														source={require('../../assets/png/DoctorImage.png')} 
														resizeMode='cover'
														style={{ height: '100%', width: '100%' }}
													>
														<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#696B6C",  "#696B6C00"]} style={{height: '100%'}}>
															<View style={styles.cardContentText}>
																<View>
																	<Text style={{...styles.cardText, fontWeight: 'bold', fontSize: 17}}>{fullName}</Text>
																</View>
																<View style={{paddingTop: 7}}>
																	<Text style={styles.cardText}>Nomor RM</Text>
																	<Text style={{...styles.cardText, fontSize: 17, fontWeight: 'bold', paddingTop: 2.5}}>{RM}</Text>
																</View>
																<View style={{paddingTop: 7}}>
																	<Text style={styles.cardText}>Tanggal Lahir</Text>
																	<Text style={{...styles.cardText, paddingTop: 2.5}}>{dob}</Text>
																</View>
																<View style={{paddingTop: 7}}>
																	<Text style={{...styles.cardText, paddingTop: 2.5}}>QR COde</Text>
																</View>
															</View>
														</LinearGradient>
													</ImageBackground>
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
	boxContainer: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		shadowColor: '#C2C2C2',
		shadowOffset: {height: 5, width: 5},
		shadowOpacity: 0.61,
		shadowRadius: 9.11,
		elevation: 9,
		width: '100%',
	},
	box: {
		width: '100%',
		borderWidth: 1,
		paddingHorizontal: 20,
		borderRadius: 3,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#2F2F2F',
	},
	inputText: {
		color: '#DDDDDD',
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
		// maxHeight: Dimensions.get('screen').height * 0.23,
	  },
	card: {
		width: '100%',
		height: '100%',
	},
	cardHeader: { 
		maxHeight: 80, 
		backgroundColor: '#484848', 
		padding: 10 
	},
	cardHospitalName: {
		fontWeight: 'bold',
		color: '#F37335'
	},
	cardHospitalAddress: {
		color: '#B5B5B5',
		fontSize: 10
	},
	cardContent: {
		height: '100%',
	},
	cardContentText: {
		paddingLeft: 20.,
		paddingVertical: 14
	},
	cardText: { 
		color: '#DDDDDD' 
	},
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
