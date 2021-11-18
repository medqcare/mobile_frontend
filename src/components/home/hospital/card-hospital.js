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
    flex: 1,
    // backgroundColor: '#CCBBEB',
    backgroundColor: '#2F2F2F',
    width: "100%",
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
    // borderBottomWidth: 0.5,

    // minHeight: minHeight * 0.12,
    // maxHeight: Dimensions.get('screen').height * 0.20,
    padding: 5
  },
  borderPhoto: {
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    minHeight: 60,
    minWidth: 60,
    borderWidth: 1,
    borderColor: '#18d28a'
  },
  Photo: {
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
    minWidth: 60,
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