import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import { FlatList } from 'react-native-gesture-handler';
import { dateWithDDMMMYYYYFormat } from '../../helpers/dateFormat';
import { formatNumberToRupiah } from '../../helpers/formatRupiah';
import getPaymentMethod from '../../helpers/getPaymentMethod';
import { WHITE_PRIMARY } from '../../values/color';
const dimHeight = Dimensions.get('window').height;

export default function CardDetailTransaction({ transaction, props }) {
  const getBookingTime = (stringBookingTime) => {
    const bookingTime = stringBookingTime.split(' - ')[0];
    return bookingTime;
  };

  const payment = getPaymentMethod(transaction.paymentMethod);

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

  const transactionStatus = getTransactionStatus(transaction.status);

  const gantiBahasa = (item) => {
    let result = item;
    switch (item) {
      case 'Doctor Price':
        result = 'Biaya Konsultasi';
        break;

      case 'Prescription Price':
        result = 'Harga Obat';
        break;

      default:
        break;
    }
    return result;
  };

  const checkPermission = async () => {
    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    return result;
  };

  const askPermission = async () => {
    const result = await PermissionsAndroid.request(
      'android.permission.WRITE_EXTERNAL_STORAGE'
    );
    return result;
  };

  const shareFile = async (selectedUrl) => {
    (async () => {
      const permission = await checkPermission();
      if (!permission) {
        await askPermission();
      }

      let fileUri = FileSystem.documentDirectory + 'struk.pdf';
      const { uri } = await FileSystem.downloadAsync(selectedUrl, fileUri);
      await Sharing.shareAsync(uri);
    })();
  };

  return (
    <View style={styles.container}>
      <View
        style={{ backgroundColor: '#2F2F2F', padding: 10, borderRadius: 5 }}
      >
        {transaction.doctor ? (
          <>
            <View style={{ flexDirection: 'row' }}>
              <View style={{}}>
                <View style={styles.borderImage}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: 'https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg',
                    }}
                  />
                </View>
              </View>
              <View style={{ marginLeft: dimHeight * 0.01 }}>
                <Text style={styles.name}>
                  {transaction.doctor.title} {transaction.doctor.doctorName}
                </Text>
                <Text style={styles.textcontent}>
                  Spesialis {transaction.doctor.doctorSpecialist}
                </Text>
                <View style={styles.time}>
                  <Text style={styles.textcontent}>
                    {dateWithDDMMMYYYYFormat(
                      new Date(
                        transaction.bookingSchedule
                          .split('/')
                          .reverse()
                          .join('/')
                      )
                    )}
                  </Text>
                  <View style={styles.dividingPoint}></View>
                  <Text style={styles.textcontent}>
                    {transaction.bookingTime}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.line} />
          </>
        ) : (
          <>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginLeft: dimHeight * 0.01 }}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    fontSize: 18,
                    color: WHITE_PRIMARY,
                  }}
                >
                  Tagihan Layanan Medis{' '}
                  {transaction.healthFacility.facilityName}
                </Text>
                <View style={styles.time}>
                  <Text style={styles.textcontent}>
                    {dateWithDDMMMYYYYFormat(
                      new Date(
                        transaction.bookingSchedule
                          .split('/')
                          .reverse()
                          .join('/')
                      )
                    )}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.line} />
          </>
        )}

        <FlatList
          data={transaction.items}
          keyExtractor={(item) => `${transaction._id} ${item.itemName}`}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: dimHeight * 0.01,
                  marginBottom: dimHeight * 0.01,
                }}
              >
                <Text style={styles.textcontent}>
                  {gantiBahasa(item.itemName)}
                </Text>
                <Text style={styles.textcontent}>
                  {formatNumberToRupiah(item.itemPrice)}
                </Text>
              </View>
            );
          }}
        />

        {/* Payment Method */}
        {transaction.paymentMethod ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: dimHeight * 0.01,
            }}
          >
            <Text style={styles.textcontent}>Metode Pembayaran</Text>
            <Text style={styles.textcontent}>{payment.name}</Text>
          </View>
        ) : null}
        <View style={styles.line} />

        {/* Transaction status & amount transaction */}
        <View>
          <Text style={styles.textcontent}>
            {transaction.healthFacility.facilityName}
          </Text>
          <Text style={styles.textcontent}>
            Nama Pasien:{' '}
            <Text style={{ color: '#DDDDDD' }}>
              {transaction.patient.patientName}
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
              color: transactionStatus.style.color,
              fontSize: 12,
              fontStyle: 'italic',
              marginTop: dimHeight * 0.02,
            }}
          >
            {transactionStatus.name}
          </Text>
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{ fontSize: 12, color: '#B5B5B5', textAlign: 'right' }}
            >
              Total Bayar
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#DDDDDD',
                textAlign: 'right',
                marginTop: dimHeight * 0.01,
              }}
            >
              {formatNumberToRupiah(transaction.amount)}
            </Text>
            {transaction.status === 'success' && transaction.file.url !== '' && (
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => {
                  props.navigation.navigate('ShowDokumen', {
                    uri: transaction.file.url,
                    name: 'Struk Pembayaran',
                    backTo: 'DetailTransaction',
                    option: {
                      name: 'share',
                      action: () => shareFile(transaction.file.url),
                    },
                  });
                }}
              >
                <Text
                  style={{ color: '#F37335', fontSize: 11, textAlign: 'right' }}
                >
                  LIHAT STRUK
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  borderImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: 'transparent',
  },
  line: {
    backgroundColor: '#515151',
    height: 1,
    marginVertical: 10,
  },
  name: {
    fontSize: 12,
    color: '#DDDDDD',
  },
  address: {
    color: '#B2BABB',
    fontSize: 14,
  },
  textcontent: {
    fontSize: 12,
    color: '#B5B5B5',
    marginTop: 5,
    textTransform: "capitalize"
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 5,
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
