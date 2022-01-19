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
import CardDetailTransaction from '../../../components/transaction/CardDetailTransaction';
import Header from '../../../components/headers/GradientHeader';

export default function DetailTransaction(props) {
  const transaction = props.navigation.getParam('transaction');

  return (
    <View style={{ flex: 1, backgroundColor: '#181818' }}>
      {/* <StatusBar hidden /> */}
      <Header
        title="Detail Transaksi"
        navigate={props.navigation.navigate}
        navigateBack="Riwayat"
      />
      <CardDetailTransaction transaction={transaction} props={props}/>
    </View>
  );
}
