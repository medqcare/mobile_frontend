import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import { GetUser } from '../../../stores/action'
import Header from '../../../components/headers/GradientHeader'

import Icon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import ArrowBack from '../../../assets/svg/ArrowBack'
import DokterIcon from "../../../assets/svg/Dokter"


const dimHeight = Dimensions.get('window').height
const dimWidth = Dimensions.get('window').width

function DetailHospitalPage(props) {
  const dataHospital = props.navigation.getParam('data')
  const [facilityVisible, setFacilityVisible] = useState(false)
  const [medicalVisible, setMedicalVisible] = useState(false)
  const [doctorVisible, setDoctorVisible] = useState(false)

  const _openMap = (lat, lang) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lang}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    props.navigation.pop()
    return true
  })


  return (
    <View style={{ flex: 1, backgroundColor: '#1F1F1F' }}>
      <Header title='Detail Klinik' navigateBack={'SearchHospital'} navigate={props.navigation.navigate}/>
      <ScrollView style={{ top: 0, position: 'relative', zIndex: 0 }}>
        <View style={header.container}>
          <Image source={{ uri: (!dataHospital.photo) ? 'https://rspelabuhan.com/images/album/bsi-article/upload.jpg' : dataHospital.photo }}
            style={header.imageHeader} />
        </View>
        <View style={container.detailRS}>
          <View style={container.nameRS}>
            <Text style={textStyles.namaRS}>{dataHospital.facilityName}</Text>
            <TouchableOpacity onPress={() => _openMap(dataHospital.location.coordinates[1], dataHospital.location.coordinates[0])}>
              <IconMCI name={'google-maps'} size={25} color={'#848280'} />
            </TouchableOpacity>
          </View>
          <View style={container.headfacility}>
            <Icon name='ios-pin' size={20} color='#A09D9D' style={{width: 20}} />
            <Text style={textStyles.detailRS}>{dataHospital.googleAddress}</Text>
          </View>
          <View style={container.headfacility}>
            <IconMCI name='map-marker-distance' size={20} color='#A09D9D' style={{width: 20,}} />
            <Text style={textStyles.detailRS}>{dataHospital.distance}</Text>
          </View>
          <View style={container.headfacility}>
            <Icon name='ios-call' size={20} color='#A09D9D' style={{width: 20,}}/>
            <Text style={textStyles.detailRS}>{dataHospital.phoneNumber}</Text>
          </View>
          <View style={{height: 1, marginTop: 15, backgroundColor: '#A09D9D'}} />
        </View>
        <View style={container.contain}>
          <View style={container.headerfacility}>
            {facilityVisible &&
              <TouchableOpacity onPress={() => setFacilityVisible(!facilityVisible)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='ios-pulse' size={25} color='#5E5C5C' />
                <Text style={textStyles.child}>Facility</Text>
                <Icon name='ios-arrow-down' size={20} color='#5E5C5C' />
              </TouchableOpacity>
            }
            {!facilityVisible &&
                <TouchableOpacity onPress={() => setFacilityVisible(!facilityVisible)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name='ios-pulse' size={25} color='#5E5C5C' />
                  <Text style={textStyles.child}>Facility</Text>
                  <Icon name='ios-arrow-up' size={20} color='#5E5C5C' />
                </TouchableOpacity>
            }
          </View>
          <View style={container.headerfacility}>
            {doctorVisible &&
              <TouchableOpacity onPress={() => setDoctorVisible(!doctorVisible)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='ios-person' size={25} color='#5E5C5C' />
                <Text style={textStyles.child}>Doctors</Text>
                <Icon name='ios-arrow-down' color='#5E5C5C' size={20} />
              </TouchableOpacity>
            }
            {!doctorVisible &&
              <View>
                <TouchableOpacity onPress={() => setDoctorVisible(!doctorVisible)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name='ios-person' size={25} color='#5E5C5C' />
                  <Text style={textStyles.child}>Doctors</Text>
                  <Icon name='ios-arrow-up' size={20} color='#5E5C5C' />
                </TouchableOpacity>
                {dataHospital !== 0 && dataHospital.doctors.length !== 0 &&
                  Object.entries(dataHospital.doctors).map((el, index) => {
                    console.log(el, 'this is detail clinic')
                    // console.log(el.photo, 'ini photo aja')
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('DetailDoctor', {
                            data: el[1],
                            idHos: dataHospital._id,
                            back: 'DetailHospital',
                          });
                        }}
                        key={index}
                        style={{
                          backgroundColor: '#2F2F2F',
                          marginTop: 10,
                          flexDirection: 'row',
                          borderRadius: 10,
                          alignItems: 'center',
                          padding: 10,
                        }}
                      >
                        <View style={styles.borderPhoto}>
                          <Image
                            style={{
                              minWidth: 60,
                              minHeight: 60,
                              resizeMode: 'cover',
                            }}
                            source={{
                              uri: !el[1].photo
                                ? 'https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg'
                                : el[1].photo,
                            }}
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#fff',
                            }}
                          >
                            {el[1].title} {el[1].doctorName}
                          </Text>
                          <Text style={{ fontSize: 14, color: '#5E5D5D' }}>
                            Spesialis {el[1].specialist}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                }
              </View>
            }
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const header = StyleSheet.create({
  container: {
    height: dimHeight * 0.3,
  },
  imageHeader: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    borderBottomRightRadius: 50,
  }
})

const container = StyleSheet.create({
  detailRS: {
    padding: 20,
  },
  nameRS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headfacility: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  contain: {
    flex: 1,
  },
  headerfacility: {
    padding: 20
  },
  containfacility: {
    backgroundColor: '#8fbc8f',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
  }
})

const styles = StyleSheet.create({
  borderPhoto: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    height: 65,
    width: 65,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    padding: 5,
    borderWidth: 1,
    borderColor: '#33E204',
  }
})

const textStyles = StyleSheet.create({
  namaRS: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DDDDDD',
    width: '90%',
  },
  detailRS: {
    fontSize: 14,
    color: '#A5A5A5',
    marginHorizontal: 15,
    textAlign: 'justify'
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DDDDDD'
  },
  child: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DDDDDD',
    marginHorizontal: 10,
  },
  spesialis: {
    fontSize: 14,
    color: '#DDDDDD'
  }
})

DetailHospitalPage.navigationOptions = (props) => ({
  title: props.navigation.getParam('data').name
})

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  GetUser
}



export default connect(mapStateToProps, mapDispatchToProps)(DetailHospitalPage)
