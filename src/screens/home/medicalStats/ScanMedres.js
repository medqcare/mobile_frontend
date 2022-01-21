import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieLoader from 'lottie-react-native';
import { Camera } from 'expo-camera';
import GreyHeader from '../../../components/headers/GreyHeader';
import BarcodeSvg from '../../../assets/svg/Barcode';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { baseURL } from '../../../config';
import { connect } from 'react-redux';
const ScanMedres = (props) => {
  const patientID = props.navigation.getParam('patientID');
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [isScanFailed, setIsScanFailed] = useState(false);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setLoadingScan(true);
    try {
      let token = await AsyncStorage.getItem('token');
      token = JSON.parse(token).token;
      const payload = {
        clinicIdWeb: +data,
        patientID: patientID,
      };
      await axios({
        url: `${baseURL}/api/v1/members/medres/share`,
        method: 'POST',
        headers: {
          authorization: token,
          'X-Secret': 123456,
        },
        data: payload,
      });
      ToastAndroid.show('Success', ToastAndroid.LONG);
      props.navigation.pop();
    } catch (error) {
      setIsScanFailed(true);
      console.log(error.response);
      console.log(error.message, 'this is erro from share medres');
    } finally {
      setLoadingScan(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1F1F1F' }}>
      <GreyHeader
        title="Scan QR Code"
        navigate={props.navigation.navigate}
        navigateBack="MedResList"
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
      <ScanOnProgress visible={loadingScan} />
    </View>
  );
};

const ScanOnProgress = ({ visible }) => {
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

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ScanMedres);
