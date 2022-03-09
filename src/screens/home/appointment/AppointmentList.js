import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StyleSheet,
  BackHandler,
} from 'react-native';
import Modal from 'react-native-modal';
import ListAppointment from '../../../components/home/appointment/list-appointment';
import axios from 'axios';
import { baseURL } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../components/headers/GradientHeader';

import { cancelRecervation } from '../../../stores/action';
import LottieLoader from 'lottie-react-native';
import CardMedicalService from '../../../components/home/appointment/CardMedicalService';
import DeleteAppointmentModal from '../../../components/modals/DeleteAppointmentModal';

function SelectType({ types = [], onTypeSelected, defaultType = types[0] }) {
  const [typeSelected, setTypeSelected] = useState(defaultType);
  const typeStyleBehavior = (type) => {
    return {
      container: {
        backgroundColor: type === typeSelected ? '#212D3D' : '#2F2F2F',
        borderWidth: 1,
        borderColor: type === typeSelected ? '#77BFF4' : 'transparent',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 99,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
      },
      text: {
        color: type === typeSelected ? '#77BFF4' : '#B5B5B5',
        fontSize: 12,
        textTransform: 'capitalize',
      },
    };
  };

  const renderType = ({ item }) => {
    const { container, text } = typeStyleBehavior(item);
    return (
      <TouchableOpacity
        style={container}
        onPress={() => {
          setTypeSelected(item);
          if (typeof onTypeSelected === 'function') {
            onTypeSelected(item);
          }
        }}
      >
        <Text style={text}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <FlatList
        data={types}
        renderItem={renderType}
        keyExtractor={(_, index) => `${index}-type`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const Appointment = (props) => {
  const paramOrderType = props.navigation.getParam('orderType');
  console.log(props.navigation.state, "state")
  console.log(paramOrderType, "param")
  const [reservations, setReservations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [reservationID, setReservationID] = useState();
  const [Load, setLoad] = useState(true);
  const [types, setTypes] = useState(['Konsultasi Dokter', 'Layanan Medis']);
  const [typeSelected, setTypeSelected] = useState(
    paramOrderType ? paramOrderType : types[0]
  );
  const [showModalDelete, setShowModalDelete] = useState(false);
  console.log(typeSelected)
  useEffect(() => {
    (async () => {
      setLoad(true);
      try {
        const type =
          typeSelected === 'Konsultasi Dokter' ? 'doctor' : 'service';
        const tokenString = await AsyncStorage.getItem('token');
        const { token } = JSON.parse(tokenString);
        const { data: res } = await axios({
          url:
            baseURL +
            `/api/v1/members/reservations/user?status=booked&type=${type}`,
          method: 'GET',
          headers: {
            Authorization: token,
          },
        });

        const { reservations } = res.data;
        setReservations(reservations);
      } catch (error) {
        console.log(`Error Axios: ${error.message}`);
      } finally {
        setLoad(false);
      }
    })();
  }, [typeSelected]);

  const getReservations = async () => {
    setLoad(true);
    try {
      const type = typeSelected === 'Konsultasi Dokter' ? 'doctor' : 'service';
      const tokenString = await AsyncStorage.getItem('token');
      const { token } = JSON.parse(tokenString);
      const { data: res } = await axios({
        url:
          baseURL +
          `/api/v1/members/reservations/user?status=booked&type=${type}`,
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });

      const { reservations } = res.data;
      setReservations(reservations);
    } catch (error) {
      console.log(`Error Axios: ${error.message}`);
    } finally {
      setLoad(false);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getReservations();
    setRefreshing(false);
  }, [refreshing]);

  const renderReservation = ({ item }) => {
    const { orderType } = item;

    if (orderType === 'doctor') {
      return (
        <ListAppointment
          data={item}
          route={props.navigation}
          setModalDelete={setShowModalDelete}
          onCancelReservation={(id) => {
            setReservationID(id);
            setShowModalDelete(true);
          }}
        />
      );
    }

    if (orderType === 'service') {
      return (
        <View style={{ marginHorizontal: 12, marginBottom: 12 }}>
          <CardMedicalService reservation={item} {...props} />
        </View>
      );
    }
  };

  BackHandler.addEventListener('hardwareBackPress', () => {
    return props.navigation.navigate('Home');
  });
  return (
    <View style={{ flex: 1, backgroundColor: '#1F1F1F' }}>
      <Header title={'Daftar Janji'} navigate={props.navigation.navigate} />
      <View style={{ marginVertical: 14, paddingLeft: 12 }}>
        <SelectType
          types={types}
          onTypeSelected={(item) => {
            setTypeSelected(item);
          }}
          defaultType={typeSelected}
        />
      </View>
      {Load ? (
        <LottieLoader
          source={require('../../animation/loading.json')}
          autoPlay
          loop
        />
      ) : (
        <>
          {reservations.length > 0 ? (
            <FlatList
              data={reservations}
              keyExtractor={(item) => item._id}
              renderItem={renderReservation}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          ) : (
            <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
              <Text style={{ color: '#FFFFFF' }}>Tidak ada Daftar Janji</Text>
            </View>
          )}
        </>
      )}

      <DeleteAppointmentModal
        isVisible={showModalDelete}
        setIsVisible={setShowModalDelete}
        onButtonCancelPress={() => {
          props.cancelRecervation(reservationID);
          onRefresh();
          setShowModalDelete(false);
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  cancelRecervation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointment);
