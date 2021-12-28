import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
import { connect } from 'react-redux';
import Header from '../../../components/headers/GradientHeader';
import CardDetailTransaction from '../../../components/transaction/CardDetailTransaction';
import { baseURL } from '../../../config';
import LottieLoader from 'lottie-react-native';

const dimHeight = Dimensions.get('window').height;

function Tagihan(props) {
  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(true);
  const data = {
    doctor: {
      title: 'Dr.',
      doctorName: 'Corrie James Sp.JP, FIHA',
      doctorSpecialist: 'Jantung',
    },
    bookingSchedule: '27 November 2021',
    bookingTime: '11.00',
  };

  useEffect(() => {
    (async () => {
      const patientID = props.userData._id;
      setLoading(true);
      try {
        const stringToken = await AsyncStorage.getItem('token');
        const { token } = JSON.parse(stringToken);
        const { data: response } = await axios({
          method: 'GET',
          url: baseURL + `/api/v1/members/transactions/${patientID}/latest`,
          headers: {
            authorization: token,
            'X-Secret': 123456,
          },
        });

        const { transaction } = response.data;
        setTransaction(transaction);
      } catch (error) {
        console.log(error, 'this is error on tagihan screen');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#181818' }}>
        <StatusBar hidden />
        <Header
          title="Detail Transaksi"
          navigate={props.navigation.navigate}
          navigateBack="Home"
        />
        <LottieLoader
          source={require('../../animation/loading.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#181818' }}>
      <StatusBar hidden />
      <Header
        title="Detail Transaksi"
        navigate={props.navigation.navigate}
        navigateBack="Home"
      />
      {transaction ? (
        <CardDetailTransaction transaction={transaction} />
      ) : (
        <View style={{ alignItems: 'center', marginTop: 25 }}>
          <Text style={{ color: '#fff' }}>Belum ada tagihan</Text>
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

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tagihan);
