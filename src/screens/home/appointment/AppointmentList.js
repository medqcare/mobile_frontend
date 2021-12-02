import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  Alert,
  StyleSheet,
  BackHandler,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import ListAppointment from '../../../components/home/appointment/list-appointment';
import axios from 'axios';
import {baseURL} from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../components/headers/GradientHeader'

import ArrowBack from '../../../assets/svg/ArrowBack'
import {cancelRecervation} from '../../../stores/action';
import SettingModal from '../../../components/modals/setModal';
import LottieLoader from 'lottie-react-native';

const Appointment = props => {
  const [appoinment, setAppoinment] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [cancelR, setCancelR] = useState(false);
  const [idpatient, setIdPatient] = useState(null);
  const [Load, setLoad] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const _getData = () => {
    return new Promise(async (resolve, reject) => {
      let token = await AsyncStorage.getItem('token');
      // console.log(token, 'ini tokennya')
      let {data} = await axios({
        url: `${baseURL}/api/v1/members/getReservation`,
        method: 'POST',
        headers: {Authorization: JSON.parse(token).token},
      });
      resolve(data);
    });
  };

  const _fetchDataAppoinment = async () => {
    _getData().then(data => {
      try {
        // console.log(appoinment, 'sebelum di set ==============<<<<')
        let datakebalik = data.data.reverse();
        let newAppoinment = [];
        datakebalik.map((item, index) => {
          if (item.status !== 'canceled' && item.status !== 'registered') {
            newAppoinment.push(item);
          }
        });
        setAppoinment(newAppoinment);
        setLoad(false);
        // console.log('ini abis nembak >>>>>>>>>>>', appoinment)
      } catch (error) {
        setRefreshing(false);
        setLoad(false);
        console.log(error);
      }
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    _fetchDataAppoinment();
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    setLoad(true);
    _fetchDataAppoinment();
  }, []);

  useEffect(() => {
    if (appoinment) {
      appoinment.sort(function(a, b) {
        var dateA = new Date(a.bookingSchedule);
        var dateB = new Date(b.bookingSchedule);
        return dateA - dateB;
      });
    }
  }, [appoinment]);

  BackHandler.addEventListener('hardwareBackPress', () => {
    return props.navigation.navigate('Home');
  });

  return (
    <View style={{flex: 1, backgroundColor: '#1F1F1F'}}>
      <Header title={'Daftar Janji'} navigate={props.navigation.navigate}/>
      {Load ? (
        <LottieLoader
          source={require('../../animation/loading.json')}
          autoPlay
          loop
        />
      ) : (
        <>
          {appoinment.length ? (
            <FlatList
              data={appoinment}
              keyExtractor={item => item._id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({item}) => (
                <ListAppointment
                  data={item}
                  route={props.navigation}
                  setModalDelete={setModalDelete}
                  function={() => {
                    setIdPatient(item._id);
                  }}
                />
              )}
            />
          ) : (
            <View style={{flex: 1, alignItems: 'center', padding: 20}}>
              <Text style={{color: '#FFFFFF'}}>Tidak ada Daftar Janji</Text>
            </View>
          )}
          {/* {cancelR && (
            <SettingModal
              _visible={cancelR}
              _navigationRight={() => {
                props.cancelRecervation(idpatient);
                onRefresh();
                setCancelR(false);
              }}
              _navigationLeft={() => setCancelR(false)}
              _textRight={'Yes'}
              _textLeft={'No'}
              _message={'Are you sure canceled this reservation ?'}
              _iconId={'warning'}
            />
          )} */}
        </>
      )}
      {
        <Modal
          isVisible={modalDelete}
          swipeDirection={'down'}
          onSwipeComplete={() => setModalDelete(false)}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
          animationType="slide"
          onRequestClose={() => setModalDelete(false)}>
          <View style={viewModalDelete.container}>
            <View style={viewModalDelete.header}>
              <View style={viewModalDelete.toogle} />
              <Text style={viewModalDelete.title}>Batalkan Konsultasi</Text>
            </View>
            <View style={viewModalDelete.header}>
              <Text style={viewModalDelete.subtitle}>
                Apakah anda yakin ingin membatalkan konsultasi ini?
              </Text>
            </View>
            <View style={viewModalDelete.option}>
              <TouchableOpacity
                onPress={() => {
                  setModalDelete(false);
                }}>
                <View style={viewModalDelete.lanjutkan}>
                    <Text style={viewModalDelete.name}>
                      Lanjutkan Konsultasi
                    </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log(idpatient);
                  props.cancelRecervation(idpatient);
                  setModalDelete(false);
                  onRefresh();
                }}>
                <View style={viewModalDelete.cardName}>
                    <Text style={viewModalDelete.name}>Batalkan Janji</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      }
    </View>
  );
};

const viewModalDelete = StyleSheet.create({
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
  option: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  titleP: {
    color: 'white',
    fontSize: 14,
  },
  subtitle: {
    color: '#B5B5B5',
    fontSize: 12,
  },
  cardName: {
    marginTop: 10,
    borderColor: '#757575',
    borderWidth: 1,
    borderRadius: 3,
    minHeight: 50,
    justifyContent: 'center',
  },
  lanjutkan: {
    marginTop: 10,
    backgroundColor: '#005EA2',
    borderRadius: 3,
    minHeight: 50,
    justifyContent: 'center'
  },
  name: {
    color: '#DDDDDD',
    textAlign: 'center'
  },
  buttonAdd: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addTitle: {
    color: '#4398D1',
  },
});

const mapDispatchToProps = {
  cancelRecervation,
};
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appointment);
