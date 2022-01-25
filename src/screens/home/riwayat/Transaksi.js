import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { baseURL } from '../../../config';
import { formatNumberToRupiah } from '../../../helpers/formatRupiah';
import LottieLoader from 'lottie-react-native';
import getPaymentMethod from '../../../helpers/getPaymentMethod';
import { dateWithDDMMMYYYYFormat } from '../../../helpers/dateFormat';

const dimHeight = Dimensions.get('window').height;
const DEFAULT_IMAGE_URL =
  "'https://awsimages.detik.net.id/community/media/visual/2017/07/05/165087b7-e1d9-471b-9b82-c8ccb475de94_43.jpg?w=700&q=90'";

export default function Transaksi(props) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const stringToken = await AsyncStorage.getItem('token');
        const { token } = JSON.parse(stringToken);
        const patientId = props.userData._id;
        const patientIDs = props.userData.family
          .map((e) => e._id)
          .concat(patientId);
        const { data: response } = await axios({
          method: 'GET',
          url: baseURL + `/api/v1/members/transactions/${patientId}`,
          headers: {
            authorization: token,
            'X-Secret': 123456,
            ids: patientIDs.join(','),
          },
        });
        const { transactions } = response.data;
        setTransactions(transactions);
      } catch (error) {
        console.log(error, 'this is error from axios on transaction screen');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getTransactionStatus = (status) => {
    switch (status) {
      case 'success': {
        return { name: 'Transaksi Sukses', style: { color: '#4ade80' } };
      }

      case 'fail': {
        return { name: 'Transaksi Gagal', style: { color: '#ef4444' } };
      }

      default: {
        return { name: 'Menunggu Pembayaran', style: { color: '#facc15' } };
      }
    }
  };

  if (loading) {
    return (
      <LottieLoader
        source={require('../../animation/loading.json')}
        autoPlay
        loop
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#181818' }}>
      {transactions.length !== 0 ? (
        <View style={{ paddingHorizontal: 16 }}>
          <FlatList
            data={transactions}
            keyExtractor={(item) => `${item._id}`}
            renderItem={({ item }) => {
              const status = getTransactionStatus(item.status);
              const scheduleDate = item.bookingSchedule
                .split('/')
                .reverse()
                .join('/');
              const schedule = dateWithDDMMMYYYYFormat(new Date(scheduleDate));
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#2F2F2F',
                    // padding: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 12,
                    borderRadius: 5,
                    marginBottom: 12,
                  }}
                  onPress={() => {
                    props.navigation.navigate('DetailTransaction', {
                      transaction: {
                        ...item,
                      },
                    });
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      // paddingVertical: 6,
                      alignItems: 'center',
                    }}
                  >
                    <View style={{}}>
                      <View style={styles.borderImage}>
                        <Image
                          style={styles.image}
                          source={{
                            uri: item.doctor.doctorPhoto
                              ? item.doctor.doctorPhoto
                              : DEFAULT_IMAGE_URL,
                          }}
                        />
                      </View>
                    </View>
                    {item.doctor.doctorID ? (
                      <View style={{ marginLeft: dimHeight * 0.02 }}>
                        <Text style={styles.name}>
                          {item.doctor.title} {item.doctor.doctorName}
                        </Text>
                        <Text style={styles.textcontent}>
                          Spesialis {item.doctor.doctorSpecialist}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.line} />
                  <View>
                    <Text style={styles.textcontent}>
                      {item.healthFacility.facilityName}
                    </Text>
                    <View style={styles.time}>
                      <Text style={styles.textcontent}>{schedule}</Text>
                      <View style={styles.dividingPoint}></View>
                      <Text style={styles.textcontent}>{item.bookingTime}</Text>
                    </View>
                    <Text style={styles.textcontent}>
                      Nama Pasien:{' '}
                      <Text style={{ color: '#DDDDDD' }}>
                        {item.patient.patientName}
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: dimHeight * 0.01,
                    }}
                  >
                    <Text
                      style={{
                        color: status.style.color,
                        fontSize: 12,
                        fontStyle: 'italic',
                        marginTop: dimHeight * 0.015,
                        textTransform: 'capitalize',
                        maxWidth: '50%',
                        marginRight: 10,
                      }}
                      numberOfLines={2}
                    >
                      {status.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '50%',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}
                    >
                      <View style={{ flexDirection: 'column', marginLeft: 12 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#B5B5B5',
                            textAlign: 'right',
                          }}
                        >
                          Total Bayar
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#F37335',
                            textAlign: 'right',
                            marginTop: dimHeight * 0.01,
                          }}
                        >
                          {formatNumberToRupiah(item.amount)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                // </View>
              );
            }}
          />
        </View>
      ) : (
        <View style={{ alignItems: 'center', marginTop: 25 }}>
          <Text style={{ color: '#fff' }}>Tidak ada riwayat transaksi</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  borderImage: {
    height: 60,
    width: 60,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    backgroundColor: 'transparent',
    resizeMode: 'stretch',
  },
  line: {
    backgroundColor: '#515151',
    height: 1,
    marginVertical: 10,
  },
  name: {
    fontSize: 12,
    color: '#DDDDDD',
    marginBottom: 4,
  },
  address: {
    color: '#B2BABB',
    fontSize: 14,
  },
  textcontent: {
    fontSize: 12,
    color: '#B5B5B5',
    marginBottom: 4,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#B5B5B5',
  },
  dividingPoint: {
    height: 4,
    width: 4,
    borderRadius: 100,
    backgroundColor: '#B5B5B5',
    marginHorizontal: 8,
  },
});
