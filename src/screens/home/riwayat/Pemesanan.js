import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { baseURL } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieLoader from 'lottie-react-native';

export default function Pemesanan(props) {
  const [appoinment, setAppoinment] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [Load, setLoad] = useState(false);

  const _getData = async () => {
    let token = await AsyncStorage.getItem('token');
    return axios({
      url: `${baseURL}/api/v1/members/getReservation`,
      method: 'POST',
      headers: { Authorization: JSON.parse(token).token },
    });
  };

  const _fetchDataAppoinment = async () => {
    _getData().then(({ data }) => {
      try {
        console.log(data, 'sebelum di set ==============<<<<')
        let datakebalik = data.data.reverse();
        let newAppoinment = [];
        datakebalik.map((item, index) => {
          if (item.status !== 'booked') {
            newAppoinment.push(item);
          }
        });
        setAppoinment(newAppoinment);
        setLoad(false);
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
      appoinment.sort(function (a, b) {
        var dateA = new Date(a.bookingSchedule);
        var dateB = new Date(b.bookingSchedule);
        return dateA - dateB;
      });
    }
  }, [appoinment]);

  return (
    <View style={{ flex: 1, backgroundColor: '#181818', marginHorizontal: 5 }}>
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
              keyExtractor={(item) => item._id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.container}>
                  <View
                    style={{
                      height: 30,
                      backgroundColor: '#454545',
                      alignItems: 'center',
                      borderTopEndRadius: 5,
                      borderTopStartRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: item.status === 'canceled' ? '#EB5959' : item.status === 'Queueing' ? '#4BE395' : '#DDDDDD',
                        fontStyle: 'italic',
                        marginTop: 7,
                        fontSize: 12,
                      }}
                    >
                      {item.status === 'Report Done' ? 'Telah Selesai' : ''}
                      {item.status === 'Queueing' ? 'Dalam Pemeriksaan' : ''}
                      {item.status === 'canceled' ? 'Dibatalkan' : ''}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#2F2F2F',
                      padding: 14,
                      borderBottomStartRadius: 5,
                      borderBottomEndRadius: 5,
                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ marginBottom: 5 }}>
                        <View style={styles.borderImage}>
                          <Image
                            style={styles.image}
                            source={
                              item.doctor.doctorPhoto
                                ? { uri: item.doctor.doctorPhoto }
                                : {
                                    uri: 'https://www.isteducation.com/wp-content/plugins/learnpress/assets/images/no-image.png',
                                  }
                            }
                          />
                        </View>
                      </View>
                      <View style={{ marginRight: 30 }}>
                        <Text style={styles.name}>
                          {item.doctor.title} {item.doctor.doctorName}
                        </Text>
                        <Text style={styles.poli}>
                          {item.doctor.doctorSpecialist}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flex: 1 }}>
                      <View style={styles.line} />
                      <Text style={{ fontWeight: 'bold', color: '#DDDDDD' }}>
                        {item.healthFacility.facilityName}
                      </Text>
                      <View style={styles.time}>
                        <Text style={styles.date}>{item.bookingSchedule}</Text>
                        <Text style={styles.date}> - </Text>
                        <Text style={styles.clock}>{item.bookingTime}</Text>
                      </View>
                      <View style={styles.time}>
                        <Text style={{ color: '#B5B5B5' }}>
                          Patient Name :{' '}
                        </Text>
                        <Text style={{ color: '#DDDDDD' }}>
                          {item.patient.patientName}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {/* <Text style={{marginTop: 10, color: '#F37335'}}>{item.status !== "canceled" ? 'Lihat Rekam Medis' : ''}</Text> */}
                      <TouchableOpacity
                        onPress={() => {
                          const data = {
                            doctorID: item.doctor.doctorID,
                          };

                          props.navigation.navigate('DetailDoctor', {
                            data,
                            back: 'Riwayat',
                          });
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: '#005EA2',
                            borderRadius: 5,
                            paddingVertical: 8,
                            paddingHorizontal: 15,
                          }}
                        >
                          <Text style={{ color: '#fff' }}>Buat Janji Lagi</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
              <Text style={{ color: '#FFFFFF' }}>
                Tidak ada riwayat pemesananan
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 13,
    marginBottom: 10,
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
    // borderWidth: 1,
    // borderColor: '#33E204',
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
    marginTop: 5,
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
    marginTop: 5,
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
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: 10,
  },
  delete: {},
  status: {
    flexGrow: 1,
    // color: '#33E204'
  },
});
