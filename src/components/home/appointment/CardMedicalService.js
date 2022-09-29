import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import ButtonMap from '../../../assets/svg/buttonMap';
import getDistanceFromLatLonInKm from '../../../helpers/latlongToKM';
import openMap from '../../../helpers/openMap';


function CardMedicalService({ reservation, darkMode, ...props }) {
  // const distance
  const moment = require('moment');
  const {
    location: { lat, long },
  } = reservation.healthFacility;

  const getDistance = () => {
    const { lat: latUser, lng: lngUser } = props.myLocation;
    const distance = getDistanceFromLatLonInKm(
      lat,
      long,
      latUser,
      lngUser
    ).toFixed(1);
    return distance;
  };

  const todaysDateIsMatchWithBookingSchedulesDate = (bookingSchedule) => {
    return bookingSchedule === moment().format('DD/MM/YYYY');
  };

  const openScannerHandler = () => {
    const isToday = todaysDateIsMatchWithBookingSchedulesDate(
      reservation.bookingSchedule
    );
    props.navigation.navigate('Scanner', {
      reservationData: reservation,
      isToday,
    });
  };


  return (
    <View>
      <View style={darkMode ? styles.topWrapper : styles.topWrapperLight}>
        <View style={styles.serviceImage}>
          <FontAwesome name="hospital-o" size={70} color={darkMode ? "#dddddd" : "#4B4B4B"} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.infoServiceWrapper}>
              <Text style={darkMode ? styles.textServiceName : styles.textServiceNameLight} numberOfLines={2}>
                {reservation.services.name}
              </Text>
              <Text style={darkMode ? styles.textGreyServiceInfo : styles.textGreyServiceInfoLight}>
                {reservation.healthFacility.facilityName}
              </Text>
              {props.myLocation && (
                <Text style={darkMode ? styles.textGreyServiceInfo : styles.textGreyServiceInfoLight}>
                  {getDistance()} KM dari Anda
                </Text>
              )}
            </View>
            <View style={styles.actionOpenMapWrapper}>
              <TouchableOpacity
                style={styles.openMap}
                onPress={() => {
                  openMap(lat, long);
                }}
              >
                <ButtonMap />
              </TouchableOpacity>
            </View>
          </View>
          <View style={darkMode ? styles.borderLine : styles.borderLineLight} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <View style={styles.rowCenterWrap}>
                <Text style={darkMode ? styles.textSmallGrey : styles.textSmallGreyLight}>Nama Pasien : </Text>
                <Text style={darkMode ? styles.textSmallWhite : styles.textSmallWhiteLight}>
                  {reservation.patient.patientName}
                </Text>
              </View>
              <View style={styles.rowCenterWrap}>
                <Text style={darkMode ? styles.textSmallGrey : styles.textSmallGreyLight}>
                  {reservation.bookingSchedule}
                </Text>
              </View>
              <View style={styles.rowCenterWrap}>
                <Text style={darkMode ? styles.textSmallGrey : styles.textSmallGreyLight}>Jumlah Antrian : </Text>
                <Text style={darkMode ? styles.textSmallWhite : styles.textSmallWhiteLight}>
                  {reservation.totalQueue}
                </Text>
              </View>
              <View style={styles.rowCenterWrap}>
                <Text style={darkMode ? styles.textSmallGrey : styles.textSmallGreyLight}>Antrian Saat Ini : </Text>
                <Text style={darkMode ? styles.textSmallWhite : styles.textSmallWhiteLight}>
                  {reservation.totalQueue}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={darkMode ? styles.bottomWrapper : styles.bottomWrapperLight}>
        <TouchableOpacity onPress={openScannerHandler}>
          <Text style={darkMode ? styles.textCheckIn : styles.textCheckInLight}>Check-In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topWrapper: {
    backgroundColor: '#2f2f2f',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  topWrapperLight: {
    backgroundColor: '#ffffff',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E8E8E8'
  },
  infoServiceWrapper: {
    flex: 0.85,
  },
  actionOpenMapWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.15,
  },
  openMap: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#7d7d7d',
  },
  textServiceName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#DDDDDD',
    textTransform: 'capitalize',
    marginBottom: 6,
  },
  textServiceNameLight: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B4B4B',
    textTransform: 'capitalize',
    marginBottom: 6,
    fontWeight: 'bold'
  },
  textGreyServiceInfo: {
    fontWeight: '400',
    fontSize: 12,
    color: '#A5A5A5',
    maxWidth: '90%',
    marginBottom: 4,
  },
  textGreyServiceInfoLight: {
    fontWeight: '400',
    fontSize: 12,
    color: '#4B4B4B',
    maxWidth: '90%',
    marginBottom: 4,
  },
  serviceImage: {
    width: 70,
    height: 70,
    // backgroundColor: '#DDDDDD',
    borderRadius: 3,
    maxWidth: '90%',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#3b3b3b',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    paddingVertical: 10,
  },
  bottomWrapperLight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#ECECEC',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    paddingVertical: 10,
  },
  textCheckIn: {
    color: '#4BE395',
    fontSize: 14,
    fontWeight: '600',
  },
  textCheckInLight: {
    color: '#02954A',
    fontSize: 14,
    fontWeight: '600',
  },
  textCancel: {
    color: '#F26359',
    fontSize: 12,
    fontWeight: '400',
  },
  textSmallGrey: {
    color: '#B5B5B5',
    fontSize: 12,
  },
  textSmallGreyLight: {
    color: '#4B4B4B',
    fontSize: 12,
  },
  textSmallWhite: {
    color: '#DDDDDD',
    fontSize: 12,
  },
  textSmallWhiteLight: {
    color: '#212121',
    fontSize: 12,
  },
  borderLineLight: {
    height: 0.5,
    backgroundColor: '#EAEAEA',
    marginVertical: 10,
  },
  rowCenterWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(CardMedicalService);
