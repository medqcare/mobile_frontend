import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import latLongToKM from '../../../helpers/latlongToKM'
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconEnt from 'react-native-vector-icons/Entypo';

const mapStateToProps = state => {
  return state
}

function CardHospital({ data, myLocation }) {
  // console.log(data, 'ini datanya --')
  return (
    <View>
      <View style={styles.Container}>
        <View style={styles.borderPhoto}>
          <Image
            style={styles.Photo}
            source={{ uri: (!data.photo) ? 'https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg' : data.photo }}
          />
        </View>
        <View style={styles.DetailDokter}>
          <Text
            style={{ textTransform: 'capitalize', fontSize: 14, fontWeight: 'bold', color: '#DDDDDD' }}
          >{data.facilityName}</Text>
          <View style={{ flexDirection: 'row', width: "99%", paddingRight: 10, marginVertical: 5, alignItems: 'center', paddingRight: 20 }}>
            <IconEnt
              name="location-pin"
              size={13}
              color="gray"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.TextContent} >
              {data.address.length > 35 ? data.address.substring(0, 35) + " ..." : data.address}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconFA
              name="location-arrow"
              size={13}
              color="gray"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.TextContent, {marginRight:5}]}>&#177;</Text>
            <Text style={styles.TextContent}>{data.distance ? data.distance : data.location ? latLongToKM(data.location.coordinates[1], data.location.coordinates[0], myLocation.lat, myLocation.lng).toFixed(1) : ""}</Text>
          </View>
          {/* <Text>{JSON.stringify(data, null,2)}</Text> */}
        </View>
      </View>
      <View style={{
        alignSelf: 'center',
        backgroundColor: '#A2A2A2',
        height: 0.8,
        width: '95%',
      }}>
      </View>
    </View>
  )
};

const minHeight = Dimensions.get('screen').height
const minWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({
  Container: {
    minWidth: 300,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2F2F2F',
  },
  borderPhoto: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    height: 60,
    width: 60,
    overflow: 'hidden',
    padding: 5,
    borderWidth: 1,
    borderColor: '#33E204',
  },
  Photo: {
    width: 55, 
    height: 55, 
    borderRadius: 55
  },
  DetailDokter: {
    marginLeft: 10,
    flexShrink: 1
  },
  TextContent: {
    // backgroundColor:'#DACFEF',
    fontSize: 12,
    color: 'gray',
    marginRight: 10,
    textAlign: 'justify'
  }
})


module.exports = connect(mapStateToProps)(CardHospital);