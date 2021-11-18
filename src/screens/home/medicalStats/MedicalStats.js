import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Picker,
  RefreshControl,
  BackHandler,
  StyleSheet,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import axios from 'axios';
import {baseURL} from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import ArrowBack from '../../../assets/svg/ArrowBack'

import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import ListMedStats from '../../../components/home/medicalStats/listMedicalStats';
import LottieLoader from 'lottie-react-native';

const MedicalStats = props => {
  const [Load, setLoad] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [medicalStats, setMedStats] = useState(null);
  const [family, setFamily] = useState([]);
  const [patient, setPatient] = useState({
    patientID: props.userData ? props.userData._id : '',
    patientName: props.userData ? props.userData.firstName : '',
    dob: props.userData ? props.userData.dob : '',
  });

  const [isShow, setShow] = React.useState(false);
  const [isOpen, setOpen] = React.useState(false);
  const [isBuka, setBuka] = React.useState(false);

  const [vitalSign, setVitalSign] = useState(false);
  const [exam, setExam] = useState(false);
  const [soap, setSoap] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    _fetchDataMedrec(patient.patientID);
    setRefreshing(false);
  }, [refreshing]);

  const _fetchDataMedrec = async patientID => {
    setLoad(true);
    let token = await AsyncStorage.getItem('token');
    console.log('masuk sini ', patientID);
    try {
      let {data, status} = await axios({
        url: `${baseURL}/api/v1/members/getMedicalResume`,
        method: 'POST',
        headers: {Authorization: JSON.parse(token).token},
        data: {patientID: patientID},
      });
      console.log(data.data, 'Ini data yang ');
      if (data.data) {
        setMedStats(data.data.reverse());
        setLoad(false);
      } else {
        setMedStats(null);
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  function getFamily() {
    let dataUser = {
      _id: props.userData._id,
      firstName: props.userData.lastName
        ? props.userData.firstName + ' ' + props.userData.lastName
        : props.userData.firstName,
    };
    const temp = [dataUser];
    props.userData.family.forEach(el => {
      temp.push({
        _id: el._id,
        firstName: el.lastName
          ? el.firstName + ' ' + el.lastName
          : el.firstName,
      });
    });
    setFamily(temp);
  }

  useEffect(() => {
    getFamily();
    _fetchDataMedrec(patient.patientID);
  }, []);

  useEffect(() => {
    _fetchDataMedrec(patient.patientID);
  }, [patient]);

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (props.navigation.state.params) {
      let back = props.navigation.state.params.goback
        ? props.navigation.state.params.goback
        : 'Home';
      props.navigation.navigate('Home');
      props.navigation.navigate(back);
    }
    return true;
  });
  console.log(props.navigation.state, 'ini nav');

  return (
    <View style={{backgroundColor: '#1F1F1F', flex: 1}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#073B88', '#048FBB']}
        style={{height: 85}}>
        <View
          style={{
            flex: 1,
            marginTop: 32,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.state.params.goback !== 'Home'
                ? (props.navigation.navigate('Home'),
                  props.navigation.navigate(
                    props.navigation.state.params.goback,
                  ))
                : props.navigation.navigate('Home')
            }>
            <View style={{flexDirection: 'row'}}>
              <ArrowBack
              />
              <Text
                style={{
                  paddingHorizontal: 12,
                  fontSize: 16,
                  top: 2,
                  color: '#ffff',
                  
                  position: 'relative',
                }}>
                Resume Medis
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>Gunawan Irawan</Text>
        <TouchableOpacity>
          <Text style={{...styles.nameText, color: '#F37335'}}>Ubah</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.menuContainer}>
          <View style={styles.card}>
            <Text style={styles.textinnerCardDate}>
              Taken Date : 05/11/2021
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.textinnerCardDescription}>Vital Sign</Text>
              {vitalSign ? (
                <TouchableOpacity onPress={() => setVitalSign(false)}>
                  <MaterialIcon
                    name="keyboard-arrow-up"
                    size={26}
                    color="#f1f1f1"
                    style={{marginHorizontal: -7}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setVitalSign(true)}>
                  <MaterialIcon
                    name="keyboard-arrow-down"
                    size={26}
                    color="#f1f1f1"
                    style={{marginHorizontal: -7}}
                  />
                </TouchableOpacity>
              )}
            </View>
            {vitalSign ? (
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 12,
                  }}>
                  <Text style={styles.textdetail}>Syastole</Text>
                  <Text style={styles.textdetail}>1</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 12,
                  }}>
                  <Text style={styles.textdetail}>Diastole</Text>
                  <Text style={styles.textdetail}>10</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 12,
                  }}>
                  <Text style={styles.textdetail}>Temperature</Text>
                  <Text style={styles.textdetail}>36</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 12,
                  }}>
                  <Text style={styles.textdetail}>Heart rate</Text>
                  <Text style={styles.textdetail}>40</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 12,
                  }}>
                  <Text style={styles.textdetail}>Weight</Text>
                  <Text style={styles.textdetail}>50</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 12,
                  }}>
                  <Text style={styles.textdetail}>Height</Text>
                  <Text style={styles.textdetail}>150</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 12,
                  }}>
                  <Text style={styles.textdetail}>BMI</Text>
                  <Text style={styles.textdetail}>22</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 12,
                  }}>
                  <Text style={styles.textdetail}>Nutrition State</Text>
                  <Text style={styles.textdetail}>Normal</Text>
                </View>
              </View>
            ) : null}
          </View>

          <View style={styles.card}>
            <Text style={styles.textinnerCardDate}>
              Taken Date : 05/11/2021
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: '#DDDDDD'}}>Exam</Text>
              {exam ? (
                <TouchableOpacity onPress={() => setExam(false)}>
                  <MaterialIcon
                    name="keyboard-arrow-up"
                    size={26}
                    color="#f1f1f1"
                    style={{marginHorizontal: -7}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setExam(true)}>
                  <MaterialIcon
                    name="keyboard-arrow-down"
                    size={26}
                    color="#f1f1f1"
                    style={{marginHorizontal: -7}}
                  />
                </TouchableOpacity>
              )}
            </View>
            {
                exam ? (
                    <View style={{marginBottom: 20}}>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginTop: 12,
                    height: 30,
                  }}>
                  <Text style={{color: '#B5B5B5'}}>Anamnesa</Text>
                  <Text style={{color: '#DDDDDD', marginTop: 10}}>
                    Batuk, Pilek, Pusing
                  </Text>
                </View>
              </View>
              <View style={{marginTop: 15}}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginTop: 12,
                    height: 30,
                  }}>
                  <Text style={{color: '#B5B5B5'}}>Physical Exam</Text>
                  <Text style={{color: '#DDDDDD', marginTop: 10}}>
                    Benjolan kecil di kepala
                  </Text>
                </View>
              </View>
              <View style={{marginTop: 15}}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginTop: 12,
                    height: 30,
                  }}>
                  <Text style={{color: '#B5B5B5'}}>Allergy</Text>
                  <Text style={{color: '#DDDDDD', marginTop: 10}}>Debu</Text>
                </View>
              </View>

              <View style={{marginTop: 15}}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginTop: 12,
                    height: 30,
                  }}>
                  <Text style={{color: '#B5B5B5'}}>Dx</Text>
                  <Text style={{color: '#DDDDDD', marginTop: 10}}>Vertigo</Text>
                </View>
              </View>

              <View style={{marginTop: 15}}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginTop: 12,
                    height: 30,
                  }}>
                  <Text style={{color: '#B5B5B5'}}>ICD</Text>
                  <Text style={{color: '#DDDDDD', marginTop: 10}}>H81.4</Text>
                </View>
              </View>
            </View>
                ) : null
            }
            
          </View>

          <View style={styles.card}>
            <Text style={styles.textinnerCardDate}>
              Taken Date : 05/11/2021
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: '#DDDDDD'}}>Soap</Text>
              {soap ? (
                <TouchableOpacity onPress={() => setSoap(false)}>
                  <MaterialIcon
                    name="keyboard-arrow-up"
                    size={26}
                    color="#f1f1f1"
                    style={{marginHorizontal: -7}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setSoap(true)}>
                  <MaterialIcon
                    name="keyboard-arrow-down"
                    size={26}
                    color="#f1f1f1"
                    style={{marginHorizontal: -7}}
                  />
                </TouchableOpacity>
              )}
            </View>
            {
                soap ? (
                    <View style={{marginBottom: 20}}>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginTop: 12,
                    height: 30,
                  }}>
                  <Text style={{color: '#B5B5B5'}}>Subjective</Text>
                  <Text style={{color: '#DDDDDD', marginTop: 10}}>
                    Pandangan kunang-kunang, kepala serasa membesar
                  </Text>
                </View>
              </View>
              <View style={{marginTop: 15}}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginTop: 12,
                    height: 30,
                  }}>
                  <Text style={{color: '#B5B5B5'}}>Objective</Text>
                  <Text style={{color: '#DDDDDD', marginTop: 10}}>
                    Tensi normal, benjolan kecil di kepala sebelah kiri
                  </Text>
                </View>
              </View>
              <View style={{marginTop: 15}}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginTop: 12,
                    height: 30,
                  }}>
                  <Text style={{color: '#B5B5B5'}}>Assesment</Text>
                  <Text style={{color: '#DDDDDD', marginTop: 10}}>Disarankan untuk test kolesterol</Text>
                </View>
              </View>

              <View style={{marginTop: 15}}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginTop: 12,
                    height: 30,
                  }}>
                  <Text style={{color: '#B5B5B5'}}>Planning</Text>
                  <Text style={{color: '#DDDDDD', marginTop: 10}}>R/ Candesartan</Text>
                </View>
              </View>

            </View>
                ) : null
            }
            
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    width: '90%',
    height: 45,
    marginTop: '6%',
    backgroundColor: '#2F2F2F',
    marginHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  nameText: {
    fontSize: 14,
    color: 'white',
    marginHorizontal: 15,
  },
  menuContainer: {
    // height: '50%',
  },
  card: {
    marginTop: '3%',
    backgroundColor: '#2F2F2F',
    borderRadius: 5,
    padding: 15,
    marginHorizontal: 20,
  },
  wrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '75%',
  },
  textinnerCardDate: {
    color: '#A87F0B',
    marginBottom: '4%',
    fontSize: 14,
  },

  textinnerCardDescription: {
    color: 'white',
    fontSize: 14,
  },

  textdetail: {
    color: '#B5B5B5',
    fontSize: 14,
  },
});

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(MedicalStats);
