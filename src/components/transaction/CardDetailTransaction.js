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
import { GREY_BORDER_LINE, ORANGE_PRIMARY, WHITE_PRIMARY } from '../../values/color';
import TransactionStatus from '../TransactionStatus';
import { INTER_400 } from '../../values/font';
import { shareFilePDF } from '../../helpers/shareDocument';
const dimHeight = Dimensions.get('window').height;

export default function CardDetailTransaction({ transaction, props }) {
  const payment = getPaymentMethod(transaction.paymentMethod);

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
                      uri: transaction.doctor.doctorPhoto ? transaction.doctor.doctorPhoto : 'https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg',
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
        <View style={{marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1.14, borderBottomColor: GREY_BORDER_LINE}}>
          <Text style={styles.textcontent}>
            {`Tempat Praktik\t: `}
            <Text style={{ color: WHITE_PRIMARY }}>
              {transaction.healthFacility.facilityName}
            </Text>
          </Text>
          <Text style={styles.textcontent}>
            {`Nama Pasien\t\t: `}
            <Text style={{ color: WHITE_PRIMARY }}>
              {transaction.patient.patientName}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TransactionStatus status={transaction.status} />
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
                style={{ marginTop: 8 }}
                onPress={() => {
                  props.navigation.navigate('ShowDokumen', {
                    uri: transaction.file.url,
                    name: 'Struk Pembayaran',
                    backTo: 'DetailTransaction',
                    option: {
                      name: 'share',
                      action: async () => {
                        const filename = `struk_pembayaran_dokter_${transaction.doctor.doctorName}`;
                        await shareFilePDF(transaction.file.url, filename)
                      },
                    },
                  });
                }}
              >
                <Text
                  style={{
                    textTransform: 'uppercase',
                    textAlign: 'right',
                    fontFamily: INTER_400,
                    fontSize: 12,
                    color: ORANGE_PRIMARY,
                  }}
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
