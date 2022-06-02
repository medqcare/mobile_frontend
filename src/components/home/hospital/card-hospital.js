import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import latLongToKM from '../../../helpers/latlongToKM';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconEnt from 'react-native-vector-icons/Entypo';
import { GREY_SECONDARY, WHITE_PRIMARY } from '../../../values/color';
import { INTER_400, INTER_600 } from '../../../values/font';

const mapStateToProps = (state) => {
  return state;
};

function CardHospital({ data, userLocationReducer }) {
  return (
    <View>
      <View style={styles.Container}>
        <View style={styles.borderPhoto}>
          <Image
            style={styles.Photo}
            source={
              data.facilityPhoto
                ? { uri: data.facilityPhoto }
                : require('../../../assets/png/klinik.png')
            }
          />
        </View>
        <View style={styles.DetailDokter}>
          <Text
            style={{
              textTransform: 'capitalize',
              fontSize: 14,
              color: WHITE_PRIMARY,
              marginBottom: 5,
              fontFamily: INTER_600
            }}
          >
            {data.facilityName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '99%',
              alignItems: 'center',
              marginBottom: 5,
            }}
          >
            <IconEnt
              name="location-pin"
              size={14}
              color="gray"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.TextContent}>
              {data.address.length > 35
                ? data.address.substring(0, 35) + ' ...'
                : data.address}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconFA
              name="location-arrow"
              size={13}
              color="gray"
              style={{ marginRight: 14 }}
            />
            <Text style={[styles.TextContent, { marginRight: 5 }]}>&#177;</Text>
            <Text style={styles.TextContent}>
              {data.distance
                ? data.distance
                : data.location
                ? latLongToKM(
                    data.location.coordinates[1],
                    data.location.coordinates[0],
                    userLocationReducer.userLocation.lat,
                    userLocationReducer.userLocation.lng
                  ).toFixed(1)
                : ''}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    minWidth: 300,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingTop: 18,
  },
  borderPhoto: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    height: 60,
    width: 60,
    overflow: 'hidden',
  },
  Photo: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  DetailDokter: {
    marginLeft: 8,
    flexShrink: 1,
    paddingBottom: 18,
    borderBottomColor: '#313131',
    borderBottomWidth: 1,
    width: '100%',
  },
  TextContent: {
    fontSize: 12,
    color: GREY_SECONDARY,
    marginRight: 10,
    textAlign: 'justify',
    fontFamily: INTER_400
  },
});

module.exports = connect(mapStateToProps)(CardHospital);
