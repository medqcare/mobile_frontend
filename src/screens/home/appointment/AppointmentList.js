import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  BackHandler,
} from 'react-native';
import ListAppointment from '../../../components/home/appointment/list-appointment';
import Header from '../../../components/headers/GradientHeader';

import { searchAllReservations, cancelSelectedReservation } from '../../../stores/action';
import LottieLoader from 'lottie-react-native';
import CardMedicalService from '../../../components/home/appointment/CardMedicalService';
import DeleteAppointmentModal from '../../../components/modals/DeleteAppointmentModal';
import keys from '../../../stores/keys';

const {
  SET_DOCTOR_APPOINTMENTS,
  SET_MEDICAL_SERVICE_APPOINTMENTS,
  SET_APPOINTMENTS_LOADING,
  SET_APPOINTMENT_ORDER_TYPE
} = keys.appointmentsKeys

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
  const dispatch = useDispatch()
  const { doctorAppointments, medicalServiceAppointments, orderType, isLoading, error } = props.appointmentsReducer
  // console.log(props.navigation.state, "state")
  // console.log(paramOrderType, "param")
  const [reservations, setReservations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [reservationID, setReservationID] = useState();
  const [Load, setLoad] = useState(true);
  const [types, setTypes] = useState(['Konsultasi Dokter', 'Layanan Medis']);
  const [typeSelected, setTypeSelected] = useState(orderType);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [cancelReservationData, setCancelReservationData] = useState({
    appointmentList: null,
    keyToDispatch: null
  })
  useEffect(() => {
    (async () => {
      try {
        props.searchAllReservations('booked')
      } catch (error) {
        console.log(`Error Axios: ${error.message}`);
      } 
    })();
  }, [orderType]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
	await props.searchAllReservations('booked')
    setRefreshing(false);
  }, [refreshing]);

	const renderDoctorsAppointment = ({item}) => {
		return (
			<ListAppointment
				data={item}
				route={props.navigation}
				setModalDelete={setShowModalDelete}
				onCancelReservation={(id, orderType) => {
          if(orderType ==='doctor'){
            setCancelReservationData({
              appointmentList: doctorAppointments,
              keyToDispatch: SET_DOCTOR_APPOINTMENTS,
              
            })
          } else {
            setCancelReservationData({
              appointmentList: medicalServiceAppointments,
              keyToDispatch: SET_MEDICAL_SERVICE_APPOINTMENTS,
              
            })
          }
					setReservationID(id);
					setShowModalDelete(true);
				}}
			/>
		)
	}

	const renderMedicalServiceAppointment = ({item}) => {
		return (
			<View style={{ marginHorizontal: 12, marginBottom: 12 }}>
				<CardMedicalService reservation={item} {...props} />
			</View>
		)
	}
	const RenderReservations = () => {
		const data = orderType === 'Konsultasi Dokter' ? doctorAppointments : medicalServiceAppointments
		const renderFunction = orderType === 'Konsultasi Dokter' ? renderDoctorsAppointment : renderMedicalServiceAppointment
		if(data.length) {
			return (
				<FlatList
					data={data}
					keyExtractor={(item) => item._id}
					renderItem={renderFunction}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				/>
			)
		}
		return (
			<View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
				<Text style={{ color: '#FFFFFF' }}>Tidak ada Daftar Janji</Text>
			</View>
		)
	};

	function setOrderType(){
		dispatch({
			type: SET_APPOINTMENT_ORDER_TYPE,
			payload: 'Konsultasi Dokter'
		})
	}

	const navigateBack = props.navigation.state?.params?.navigateBack ? props.navigation.state?.params?.navigateBack : 'Home'


  BackHandler.addEventListener('hardwareBackPress', () => {
    setOrderType()
    
    props.navigation.navigate(navigateBack);
     
    return true
  });
  return (
    <View style={{ flex: 1, backgroundColor: '#1F1F1F' }}>
      <Header 
	  	title={'Daftar Janji'} 
		navigate={props.navigation.navigate} 
    navigateBack={navigateBack}
		/>
      <View style={{ marginVertical: 14, paddingLeft: 12 }}>
        <SelectType
          types={types}
          onTypeSelected={(item) => {
			dispatch({
				type: SET_APPOINTMENTS_LOADING,
				payload: true
			})
            dispatch({
              type: SET_APPOINTMENT_ORDER_TYPE,
              payload: item
            })
            setTypeSelected(item);
          }}
          defaultType={typeSelected}
        />
      </View>
      {isLoading ? (
        <LottieLoader
          source={require('../../animation/loading.json')}
          autoPlay
          loop
        />
      ) : (
		<RenderReservations/>
      )}

      <DeleteAppointmentModal
        isVisible={showModalDelete}
        setIsVisible={setShowModalDelete}
        onButtonCancelPress={() => {
          const { appointmentList, keyToDispatch } = cancelReservationData
          props.cancelSelectedReservation(reservationID,  appointmentList, keyToDispatch)
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
  searchAllReservations, 
  cancelSelectedReservation
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointment);
