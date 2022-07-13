import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GradientHeader from '../../../components/headers/GradientHeader';
import { Camera } from 'expo-camera';
import getDistanceFromLatLonInKm from '../../../helpers/latlongToKM';
import axios from 'axios';
import { baseURL } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GreyHeader from '../../../components/headers/GreyHeader';
import LottieLoader from 'lottie-react-native';
import InformationIcon from '../../../assets/svg/information';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import BarcodeSvg from '../../../assets/svg/Barcode';
import { 
  setHealthFacility,
  checkIn,
} from '../../../stores/action/'
import * as Location from 'expo-location';

//action
const Assistant_scan = (props) => {
  const { healthFacility } = props.appointmentsReducer
  const reservationParam = props.navigation.getParam('reservationData');
  const isToday = props.navigation.getParam('isToday');
  const [reservationData, setReservationData] = useState(reservationParam);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isScanFailed, setIsScanFailed] = useState(false);
  const [loadingCheckin, setLoadingCheckin] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return ToastAndroid.show(
          'Permission to access location was denied',
          ToastAndroid.LONG
        );
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;
      setUserLocation({
        latitude,
        longitude,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      const { status } = result;
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(async () => {
    if (isToday) {
      setLoading(true);
      try {
        await props.setHealthFacility(reservationData)
      } catch (error) {
        console.log(error.message, 'this is error from scanner check in');
      }
    }
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const { status, message } = isValidBarCode(data);
    console.log(status, message);
    if (!status) {
      setIsScanFailed(true);
      ToastAndroid.show(message, ToastAndroid.LONG);
      return;
    }
    setIsScanFailed(false);
    setLoadingCheckin(true);

    (async () => {
      try {
        const payload = {
          queueNumber: '2-3',
          reservationID: reservationData._id,
          facilityID: reservationData.healthFacility.facilityID,
        }
        await props.checkIn(payload, props.navigation)
      } catch (error) {
        ToastAndroid.show(
          'Check-In failed, please try again later',
          ToastAndroid.LONG
        );
      } finally {
        setLoadingCheckin(false);
        setIsScanFailed(true);
      }
    })();
  };

  const isValidBarCode = (dataBarCode) => {
    const { clinicIdWeb } = reservationData.healthFacility;
    const { location } = healthFacility;

    let { lat, long: lng } = location;
    const scannedClinicIDWeb = dataBarCode.split('-')[2]

    if (location.length) {
      lng = location.coordinates[0];
      lat = location.coordinates[1];
    }
    const { latitude, longitude } = userLocation;
    const distance = getDistanceFromLatLonInKm(latitude, longitude, lat, lng);

    if (Number(scannedClinicIDWeb) !== Number(clinicIdWeb)) {
      return { status: false, message: 'Invalid Barcode' };
    }

    // currently, only allow distance under 100 km
    if (distance > 100) {
      return {
        status: false,
        message:
          'Anda berada di luar jangkauan faskes, silahkan melakukan check in di dalam fakses tersebut',
      };
    }

    return { status: true };
  };

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!isToday) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F1F' }}>
        <GreyHeader
          title="Check-In"
          navigate={props.navigation.navigate}
          navigateBack="AppointmentList"
        />
        <View
          style={{
            padding: widthPercentageToDP('7'),
            height: '90%',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <View style={{ marginBottom: 8 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#DDDDDD',
                  fontWeight: '500',
                }}
              >
                Petunjuk Check-In :
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#3B340B',
                paddingVertical: 6,
                paddingHorizontal: 8,
                flexDirection: 'row',
                borderRadius: 4,
              }}
            >
              <InformationIcon />
              <Text
                style={{
                  color: '#B5B5B5',
                  fontSize: 11,
                  marginLeft: 8,
                  fontStyle: 'italic',
                }}
                numberOfLines={2}
              >
                Untuk mendapatkan nomor antrian, silahkan datang ke faskes yang
                Kamu tuju pada hari yang sudah kamu pilih
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderColor: '#DDDDDD',
              borderRadius: 4,
            }}
            onPress={() => {
              props.navigation.pop();
            }}
          >
            <Text style={{ color: '#DDDDDD' }}>Coba lagi nanti</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#1F1F1F' }}>
      <GreyHeader
        title="Check-In"
        navigate={props.navigation.navigate}
        navigateBack="AppointmentList"
      />
      {loading ? (
        <LottieLoader
          source={require('../../animation/loading.json')}
          loop
          autoPlay
        />
      ) : (
        <View style={styles.thisContainer}>
          <Camera
            onBarCodeScanned={!scanned ? handleBarCodeScanned : null}
            ratio="16:9"
            style={[
              StyleSheet.absoluteFillObject,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
            type={Camera.Constants.Type.back}
          >
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BarcodeSvg />
            </View>
          </Camera>

          {scanned && isScanFailed && (
            <TouchableOpacity
              onPress={() => setScanned(false)}
              style={styles.reScanTouch}
            >
              <View style={styles.reScanView}>
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={30}
                  color="white"
                />
                <Text style={styles.reScanText}> Re-Scan </Text>
              </View>
            </TouchableOpacity>
          )}
          {!scanned && (
            <TouchableOpacity onPress={() => props.navigation.pop()}>
              <View style={styles.reScanViewNull}>
                <Text
                  style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
                >
                  {' '}
                  Back{' '}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
      <CheckInProgress visible={loadingCheckin} />
    </View>
  );
};

const CheckInProgress = ({ visible }) => {
  return (
    <Modal
      presentationStyle={'overFullScreen'}
      statusBarTranslucent={false}
      transparent
      visible={visible}
    >
      <View
        style={{
          height: '120%',
          width: '120%',
          marginLeft: -30,
          marginTop: -100,
          backgroundColor: 'rgba(0,0,0,0.6)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ width: '100%', height: '20%' }}>
          <LottieLoader
            source={require('../../animation/orange-pulse.json')}
            autoPlay
          />
        </View>
        <View
          style={{
            backgroundColor: '#2F2F2F',
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
        >
          <Text style={{ color: '#DDDDDD' }}>On Progress</Text>
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  setHealthFacility,
  checkIn,
};

const styles = StyleSheet.create({
  thisContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  reScanView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'limegreen',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  reScanViewNull: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  reScanTouch: {
    width: '100%',
    alignItems: 'center',
  },
  reScanText: {
    color: 'white',
    margin: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  cameraContainer: {
    marginHorizontal: 0,
    marginLeft: 0,
    marginStart: 0,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingStart: 0,
    height: '115%',
    padding: 0,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Assistant_scan);
