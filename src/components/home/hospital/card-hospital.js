import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import latLongToKM from '../../../helpers/latlongToKM';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconEnt from 'react-native-vector-icons/Entypo';

const mapStateToProps = (state) => {
  return state;
};

function CardHospital({ data, myLocation }) {
  // console.log(data, 'ini datanya --')
  return (
    <View>
      <View style={styles.Container}>
        <View style={styles.borderPhoto}>
          <Image
            style={styles.Photo}
            source={
              data.photo
                ? { uri: data.photo }
                : require('../../../assets/png/klinik.png')
            }
          />
        </View>
        <View style={styles.DetailDokter}>
          <Text
            style={{
              textTransform: 'capitalize',
              fontSize: 14,
              color: '#DDDDDD',
              marginBottom: 5,
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
                    myLocation.lat,
                    myLocation.lng
                  ).toFixed(1)
                : ''}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const minHeight = Dimensions.get('screen').height;
const minWidth = Dimensions.get('screen').width;

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
    // backgroundColor:'#DACFEF',
    fontSize: 12,
    color: 'gray',
    marginRight: 10,
    textAlign: 'justify',
  },
});

module.exports = connect(mapStateToProps)(CardHospital);
