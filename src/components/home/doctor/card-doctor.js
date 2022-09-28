import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import formatRP from '../../../helpers/rupiah';
import { INTER_200, INTER_300, INTER_400, INTER_500 } from '../../../values/font';
import {
  BLACK_SECONDARY,
  GREY_SECONDARY,
  RED_400,
  WHITE_PRIMARY,
} from '../../../values/color';

const mapStateToProps = (state) => state;

function CardDoctor({ data, distance, userLocationReducer, darkMode }) {
  const { userLocation } = userLocationReducer;

  const renderDoctorName = () => {
    let name = `${data.title} ${data.doctorName}`;
    if (data.specialistId !== null && data.specialistId.length !== 0) {
      if (distance === "Turn on location" ) {
        name += `, ${data.specialistId.alias}`;
      } else {
        name += `, ${data.specialistId[0].alias}`;
      }
    }

    return name;
  };

  const renderDoctorSpecialist = () => {
    let specialist = 'Umum';

    if (data.specialistId !== null && data.specialistId.length !== 0) {
      if (distance === "Turn on location" ) {
        specialist = `Spesialis ${data.specialistId.name}`
      } else {
        specialist = `Spesialis ${data.specialistId[0].name}`
      }
    }

    return specialist;
  };

  return (
    <View style={darkMode ? styles.Container : styles.ContainerLight}>
      <View style={styles.Photo}>
        <Image
          style={{ width: 55, height: 55, borderRadius: 55 }}
          source={{
            uri: !data.photo
              ? 'https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg'
              : data.photo,
          }}
        />
      </View>
      <View style={styles.DetailDokter}>
        <Text style={{ fontSize: 16, color: darkMode ? WHITE_PRIMARY : "#4B4B4B", fontFamily: INTER_500 }}>
          {renderDoctorName()}
        </Text>
        <View
          style={darkMode ? styles.Specialist : styles.SpecialistLight}
        >
          <Text style={darkMode ? styles.textSpecialist : styles.textSpecialistLight}>{renderDoctorSpecialist()}</Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
          ></View>
         
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }} />
              <Text
                style={{
                  ...styles.TextContent,
                  color: darkMode ? WHITE_PRIMARY : "#F16420",
                  fontFamily: INTER_500,
                }}
              >
                {data.estPrice ? 
                formatRP(data.estPrice, 'IDR ') :
                "Estimasi harga tidak tersedia"}
              </Text>
            </View>
            
        </View>
      </View>
      {userLocation && (
        <View style={{ flexDirection: 'row' }}>
          {distance === "Turn on location" ?
            <Text style={{ color: RED_400 }}>
            <Text style={{ fontFamily: INTER_400 }}>{distance}</Text>
            </Text>
          :
            <Text style={{ color: darkMode ? WHITE_PRIMARY : "#4B4B4B" }}>
              &#177; <Text style={{ fontFamily: INTER_400 }}>{distance}</Text>
            </Text>
          }
          
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    minWidth: 300,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2F2F2F',
  },
  ContainerLight: {
    minWidth: 300,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
  },
  Photo: {
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
    backgroundColor: WHITE_PRIMARY,
  },
  DetailDokter: {
    // marginLeft: 10,
    flex: 4,
    marginRight: 5,
  },
  Specialist: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: BLACK_SECONDARY,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 10,
  },
  SpecialistLight: {
    paddingVertical: 2,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 10,
  },
  TextContent: {
    fontSize: 13,
    color: WHITE_PRIMARY,
    fontFamily: INTER_500,
  },
  textSpecialist: {
    fontFamily: INTER_300,
    color: GREY_SECONDARY,
    fontSize: 12,
    textTransform: 'capitalize',
  },
  textSpecialistLight: {
    fontFamily: INTER_300,
    color: "#4B4B4B",
    fontSize: 12,
    textTransform: 'capitalize',
  },
});

module.exports = connect(mapStateToProps)(CardDoctor);
