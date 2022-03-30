import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../../../components/headers/GradientHeader';
import CardDetailTransaction from '../../../components/transaction/CardDetailTransaction';
import { baseURL } from '../../../config';
import LottieLoader from 'lottie-react-native';
import PatientBoard from '../../../components/PatientBoard';
import SelectPatient from '../../../components/modals/selectPatient';
import CardDetailTransactionService from '../../../components/transaction/CardDetailTransactionService';
import { getAllTransactions } from '../../../stores/action'

const dimHeight = Dimensions.get('window').height;

function Tagihan(props) {
  const { userData } = props.userDataReducer
  const { transactions, isLoading, error} = props.transactionsReducer
  const [showModalSelectPatient, setShowModalSelectPatient] = useState(false);
  const [family, setFamily] = useState([]);
  const [patient, setPatient] = useState(userData);

  useEffect(() => {
    let _family = {
      ...userData,
    };
    delete _family.family;
    const temp = [_family];
    userData.family.forEach((el) => {
      temp.push(el);
    });
    setFamily(family.concat(temp));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const patientID = patient._id;
        await props.getAllTransactions(patientID)
      } catch (error) {
        console.log(error, 'this is error on tagihan screen');
      } 
    })();
  }, [patient]);

  const onPatientSelected = (data) => {
    setPatient({ ...data });
  };

  BackHandler.addEventListener('hardwareBackPress', () => {
    return props.navigation.pop();
  });

  return (
    <View style={{flex: 1}}>
      <Header
        title="Detail Transaksi"
        navigate={props.navigation.navigate}
        navigateBack="Home"
      />
      <View style={{ flex: 1, backgroundColor: '#181818' }}>
        {isLoading ? (
          <LottieLoader
            source={require('../../animation/loading.json')}
            autoPlay
            loop
          />
        ) : (
          <>
            {/* <StatusBar hidden /> */}
            <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
              <PatientBoard
                patient={patient}
                onBoardPress={() =>
                  setShowModalSelectPatient(!showModalSelectPatient)
                }
              />
            </View>

            {transactions?._id ? (
              <>
                {transactions.services ? (
                  <View style={{padding: 12}}>
                    <CardDetailTransactionService transaction={transactions} />
                  </View>
                ) : (
                  <CardDetailTransaction transaction={transactions} />
                )}
              </>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#fff' }}>Belum ada tagihan</Text>
              </View>
            )}
            <SelectPatient
              modal={showModalSelectPatient}
              setModal={setShowModalSelectPatient}
              // accountOwner={props.userData}
              family={family}
              title="Pilih Patient"
              setSelectedValue={onPatientSelected}
              navigateTo={(screen) => props.navigation.navigate(screen)}
            />
          </>
        )}
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

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  getAllTransactions
};

export default connect(mapStateToProps, mapDispatchToProps)(Tagihan);
