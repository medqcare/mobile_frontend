import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import ButtonMap from '../../../assets/svg/buttonMap';
import getDistanceFromLatLonInKm from '../../../helpers/latlongToKM';
import openMap from '../../../helpers/openMap';
function CardMedicalService({ reservation, ...props }) {
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
      <View style={styles.topWrapper}>
        <View style={styles.serviceImage}>
          <FontAwesome name="hospital-o" size={70} color="#dddddd" />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.infoServiceWrapper}>
              <Text style={styles.textServiceName} numberOfLines={2}>
                {reservation.services.name}
              </Text>
              <Text style={styles.textGreyServiceInfo}>
                {reservation.healthFacility.facilityName}
              </Text>
              {/* <Text style={styles.textGreyServiceInfo}>
              Jl. Meranti Utara III Blok D 98
            </Text> */}
              {props.myLocation && (
                <Text style={styles.textGreyServiceInfo}>
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
          <View style={styles.borderLine} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <View style={styles.rowCenterWrap}>
                <Text style={styles.textSmallGrey}>Nama Pasien : </Text>
                <Text style={styles.textSmallWhite}>
                  {reservation.patient.patientName}
                </Text>
              </View>
              <View style={styles.rowCenterWrap}>
                <Text style={styles.textSmallGrey}>
                  {reservation.bookingSchedule}
                </Text>
              </View>
              <View style={styles.rowCenterWrap}>
                <Text style={styles.textSmallGrey}>Jumlah Antrian : </Text>
                <Text style={styles.textSmallWhite}>
                  {reservation.totalQueue}
                </Text>
              </View>
              <View style={styles.rowCenterWrap}>
                <Text style={styles.textSmallGrey}>Antrian Saat Ini : </Text>
                <Text style={styles.textSmallWhite}>
                  {reservation.totalQueue}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomWrapper}>
        <TouchableOpacity onPress={openScannerHandler}>
          <Text style={styles.textCheckIn}>Check-In</Text>
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
  textGreyServiceInfo: {
    fontWeight: '400',
    fontSize: 12,
    color: '#A5A5A5',
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
  textCheckIn: {
    color: '#4BE395',
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
  textSmallWhite: {
    color: '#DDDDDD',
    fontSize: 12,
  },
  borderLine: {
    height: 0.5,
    backgroundColor: '#515151',
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
