import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../../../components/headers/GradientHeader';
import CardDetailTransaction from '../../../components/transaction/CardDetailTransaction';
import { baseURL } from '../../../config';
import LottieLoader from 'lottie-react-native';
import PatientBoard from '../../../components/PatientBoard';
import SelectPatient from '../../../components/modals/selectPatient';

const dimHeight = Dimensions.get('window').height;

function Tagihan(props) {
  const [showModalSelectPatient, setShowModalSelectPatient] = useState(false);
  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(true);
  const [family, setFamily] = useState([]);
  const [patient, setPatient] = useState(props.userData);

  useEffect(() => {
    let _family = {
      ...props.userData,
    };
    delete _family.family;
    const temp = [_family];
    props.userData.family.forEach((el) => {
      temp.push(el);
    });
    setFamily(family.concat(temp));
  }, []);

  useEffect(() => {
    (async () => {
      const patientID = patient._id;
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
  }, [patient]);

  const onPatientSelected = (data) => {
    setPatient({ ...data });
  };

  return (
    <>
      <Header
        title="Detail Transaksi"
        navigate={props.navigation.navigate}
        navigateBack="Home"
      />
      <View style={{ flex: 1, backgroundColor: '#181818' }}>
        {loading ? (
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

            {transaction?._id ? (
              <CardDetailTransaction transaction={transaction} />
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
    </>
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
