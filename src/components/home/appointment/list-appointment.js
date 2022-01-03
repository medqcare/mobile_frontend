import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  ToastAndroid,
} from 'react-native';
import Iconclose from 'react-native-vector-icons/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from '../../../config';
import QRCode from 'react-native-qrcode-svg';
import io from 'socket.io-client';
import { computeDestinationPoint } from 'geolib';
import ButtonMap from '../../../assets/svg/buttonMap';
import CloseButton from '../../../assets/svg/CloseButton';
import axios from 'axios';
import openMap from '../../../helpers/openMap';
import Qrcode from '../../../assets/svg/Qrcode';

const ListApointment = (props) => {
  const [address, setAddres] = useState(false);
  const [dataPatient, setPatient] = useState(null);
  const [modal, setmodal] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  var moment = require('moment');

  useEffect(() => {
    setPatient(props.data);
  }, [props.data]);

  useEffect(() => {
    if (modal) {
      socketConnection();
    }
  }, [modal]);

  useEffect(() => {
    setPatient(props.data);
  }, []);

  const openMapHandler = () => {
    (async () => {
      setLoadingLocation(true);
      try {
        const { data: response } = await axios({
          method: 'POST',
          url: `${baseURL}/api/v1/members/detailFacility/${dataPatient.healthFacility.facilityID}`,
        });
        const { location } = response.data;
        const [lng, lat] = location.coordinates;
        openMap(lat, lng);
      } catch (error) {
        console.log(error, 'this is error from list-appointment');
      } finally {
        setLoadingLocation(false);
      }
    })();
  };

  //   <TouchableOpacity
  //   style={{ alignSelf: 'flex-start' }}
  //   onPress={() => {
  //     openMapHandler();
  //   }}
  // >
  //   <View
  //     style={{
  //       alignItems: 'center',
  //       height: 40,
  //       width: 40,
  //       borderRadius: 40,
  //       borderColor: '#7D7D7D',
  //       borderWidth: 1,
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //     }}
  //   >
  //     <ButtonMap />
  //   </View>
  // </TouchableOpacity>

  //function
  function socketConnection() {
    let socketIO = `${baseURL}`; //use this for production
    // let socketIO = `http://192.168.43.100:3004` // only development
    let socket = io(socketIO);

    socket.on(`regP-${dataPatient._id}`, async (data) => {
      setmodal(false);

      await AsyncStorage.setItem(
        `flag-async-"${dataPatient.bookingCode}"-"${dataPatient._id}"`,
        JSON.stringify(data)
      );
      await AsyncStorage.setItem(
        `${dataPatient._id}`,
        JSON.stringify(data.queueID)
      );

      props.route.navigate('ActivityStack');
      // props.route.navigate('Home')
      // props.route.navigate('Activity_landing', { flag: dataPatient._id, bookingID: dataPatient.bookingCode, reservationID: dataPatient._id })
      socket.close();
    });
  }

  return (
    <View>
      {dataPatient && dataPatient.status !== 'canceled' && (
        <>
          <TouchableOpacity
            onPress={() => {
              setmodal(true);
            }}
            style={styles.container}
          >
            <View
              style={{
                height: 30,
                backgroundColor: '#005EA2',
                alignItems: 'center',
                borderTopEndRadius: 5,
                borderTopStartRadius: 5,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: '#DDDDDD',
                  fontStyle: 'italic',
                  fontSize: 12,
                }}
              >
                Telah dipesan
              </Text>
              {dataPatient.status !== 'canceled' && (
                <TouchableOpacity
                  style={styles.deleteContainer}
                  onPress={() => {
                    props.setModalDelete(true);
                    props.function();
                  }}
                >
                  <CloseButton />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#2F2F2F',
                padding: 14,
                borderBottomStartRadius: 5,
                borderBottomEndRadius: 5,
              }}
            >
              <View style={styles.borderImage}>
                <Image
                  style={styles.image}
                  source={
                    dataPatient.doctor.doctorPhoto
                      ? { uri: dataPatient.doctor.doctorPhoto }
                      : {
                          uri: 'https://www.isteducation.com/wp-content/plugins/learnpress/assets/images/no-image.png',
                        }
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View>
                    <Text style={styles.name}>
                      {dataPatient.doctor.title} {dataPatient.doctor.doctorName}{' '}
                    </Text>
                    <Text style={styles.poli}>
                      {dataPatient.doctor.doctorSpecialist}
                    </Text>
                    <Text style={{ fontWeight: 'bold', color: '#DDDDDD' }}>
                      {dataPatient.healthFacility.facilityName}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      openMapHandler();
                    }}
                  >
                    <View
                      style={{
                        alignItems: 'center',
                        height: 25,
                        width: 25,
                        borderRadius: 40,
                        borderColor: '#7D7D7D',
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ButtonMap />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.line}></View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View>
                    <View style={styles.time}>
                      <Text style={{ color: '#B5B5B5' }}>Patient Name : </Text>
                      <Text style={{ color: '#DDDDDD' }}>
                        {dataPatient.patient.patientName}
                      </Text>
                    </View>
                    <View style={styles.time}>
                      <Text style={styles.date}>
                        {dataPatient.bookingSchedule}
                      </Text>
                      <Text> - </Text>
                      <Text style={styles.clock}>
                        {dataPatient.bookingTime}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </>
      )}

      <Modal
        visible={modal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setmodal(false)}
      >
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            flex: 1,
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <View
            style={{
              maxHeight: '60%',
              minHeight: '50%',
              padding: 10,
              borderRadius: 5,
              backgroundColor: '#2F2F2F',
            }}
          >
            {/* {dataPatient && dataPatient.status == 'need confirmation' ? <Text>need</Text> : dataPatient.status == "cenceled" ? <Text>cenceled</Text> : <Text>booked</Text> } */}
            {dataPatient && (
              <>
                {dataPatient.status == 'need confirmation' ? (
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#B5B5B5',
                        textAlign: 'center',
                      }}
                    >
                      Please check your email for confirmation
                    </Text>
                  </View>
                ) : dataPatient.status == 'booked' &&
                  dataPatient.bookingSchedule !==
                    moment().format('DD/MM/YYYY') ? (
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#B5B5B5',
                        textAlign: 'center',
                      }}
                    >
                      QR codes only appear on the day you make a doctor's
                      appointment
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      margin: 5,
                    }}
                  >
                    <View
                      style={{
                        padding: 3,
                        borderRadius: 10,
                        marginTop: 20,
                        borderColor: '#fff',
                        borderWidth: 5,
                      }}
                    >
                      <QRCode size={180} value={dataPatient._id} />
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        marginTop: 12,
                        justifyContent: 'space-between',
                        height: '30%',
                      }}
                    >
                      <Text
                        style={{
                          color: '#B5B5B5',
                          textAlign: 'center',
                        }}
                      >
                        Show the QR to the registration section when you arrive
                        and get the queue number{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#B5B5B5',
                        }}
                      >
                        OR
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setmodal(false);
                          props.route.navigate('Scanner', { props });
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#B5B5B5',
                          }}
                        >
                          SCAN QR CODE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </>
            )}
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#2F2F2F',
                padding: 7,
                borderRadius: 20,
                marginTop: 10,
              }}
              onPress={() => setmodal(false)}
            >
              <Iconclose name="close" color="#FFFFFF" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'row',
    // backgroundColor: '#2F2F2F',
    margin: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 7,
    },
    shadowOpacity: 0.61,
    shadowRadius: 9.11,
    elevation: 14,
  },
  borderImage: {
    height: 55,
    width: 55,
    borderRadius: 55,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#33E204',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'transparent',
  },
  line: {
    backgroundColor: '#515151',
    height: 1,
    marginVertical: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 15,
    color: '#DDDDDD',
  },
  hospital: {
    fontSize: 16,
    color: '#DDDDDD',
  },
  address: {
    color: '#B2BABB',
    fontSize: 14,
  },
  poli: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B5B5B5',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  date: {
    fontSize: 14,
    color: '#B5B5B5',
  },
  clock: {
    fontSize: 14,
    color: '#B5B5B5',
  },
  dot: {
    backgroundColor: '#33E204',
    height: 10,
    width: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  deleteContainer: {
    right: 14,
    position: 'absolute',
  },
  delete: {},
  status: {
    flexGrow: 1,
  },
});

export default ListApointment;
