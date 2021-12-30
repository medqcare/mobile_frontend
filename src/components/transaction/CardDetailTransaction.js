import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { formatNumberToRupiah } from '../../helpers/formatRupiah';
import getPaymentMethod from '../../helpers/getPaymentMethod';
const dimHeight = Dimensions.get('window').height;

export default function CardDetailTransaction({ transaction }) {
  const getBookingTime = (stringBookingTime) => {
    const bookingTime = stringBookingTime.split(' - ')[0];
    return bookingTime;
  };

  console.log(transaction, '>>> hello guys');

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

  return (
    <View style={styles.container}>
      <View
        style={{ backgroundColor: '#2F2F2F', padding: 10, borderRadius: 5 }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{}}>
            <View style={styles.borderImage}>
              <Image
                style={styles.image}
                source={{
                  uri: 'https://awsimages.detik.net.id/community/media/visual/2017/07/05/165087b7-e1d9-471b-9b82-c8ccb475de94_43.jpg?w=700&q=90',
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
                {transaction.bookingSchedule}, Pukul{' '}
              </Text>
              <Text style={styles.textcontent}>
                {getBookingTime(transaction.bookingTime)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.line} />

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
                <Text style={styles.textcontent}>{item.itemName}</Text>
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
                fontSize: 12,
                color: '#F37335',
                textAlign: 'right',
                marginTop: dimHeight * 0.01,
              }}
            >
              {formatNumberToRupiah(transaction.amount)}
            </Text>
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
});
