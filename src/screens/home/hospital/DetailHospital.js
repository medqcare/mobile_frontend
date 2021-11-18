import React, { Component, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
  Linking,
  Modal,
  Picker,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import CardDoctor from '../../../components/home/doctor/card-doctor';
import axios from 'axios';
import { baseURL } from '../../../config';
import { GetUser } from '../../../stores/action'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import Icon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'


const dimHeight = Dimensions.get('screen').height
const dimWidth = Dimensions.get('screen').width

function DetailHospitalPage(props) {
  const dataHospital = props.navigation.getParam('data')
  console.log(dataHospital, 'data hostpital')
  const [dokter, setDokter] = useState(null)
  const [facilityVisible, setFacilityVisible] = useState(false)
  const [medicalVisible, setMedicalVisible] = useState(false)
  const [doctorVisible, setDoctorVisible] = useState(false)

  const [detProfile, setDetProfile] = useState(false)
  const [buatJanji, setBuatjanji] = useState(false)
  // const [patient, setPatient] = useState([props.userData].concat(props.userData.family))
  // const [selectedFamily, setSelectedFamily] = useState(patient[0])

  console.log(dataHospital, 'ini datanyaaaa')
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

  const _registerHospital = async () => {
    // console.log('ini selected', selectedFamily)
    let data = await AsyncStorage.getItem('token')
    let token = JSON.parse(data).token
    try {
      let response = await axios({
        method: 'PATCH',
        url: `${baseURL}/api/users/addHospital/${dataHospital._id}`,
        data: {
          userID: selectedFamily
        },
        headers: { token: token }
      })
      if (response.data) {
        props.GetUser(token, props.navigation)
        props.navigation.navigate('Home')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={[header.backNav, { zIndex: 1, position: 'absolute', width: '100%' }]} onPress={() => props.navigation.navigate('SearchHospital')}>
        <View style={header.backContainer} >
          <ArrowBack />
          <Text style={header.backText}>Back</Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={{ top: 0, position: 'relative', zIndex: 0 }}>
        <View style={header.container}>
          <Image source={{ uri: (!dataHospital.photo) ? 'https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg' : dataHospital.photo }}
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
          {/* <Text style={textStyles.detailRS}>{JSON.stringify(dataHospital, null, 2)}</Text> */}
        </View>
        <View style={container.contain}>
          <View style={container.headerfacility}>
            {facilityVisible &&
              <TouchableOpacity onPress={() => setFacilityVisible(!facilityVisible)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='ios-paper' size={25} color='#5E5C5C' />
                <Text style={textStyles.child}>Facility</Text>
                <Icon name='ios-arrow-down' size={20} color='#5E5C5C' />
              </TouchableOpacity>
            }
            {!facilityVisible &&
              <View>
                <TouchableOpacity onPress={() => setFacilityVisible(!facilityVisible)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name='ios-paper' size={25} color='#5E5C5C' />
                  <Text style={textStyles.child}>Facility</Text>
                  <Icon name='ios-arrow-up' size={20} color='#5E5C5C' />
                </TouchableOpacity>
                {
                  // Buat Conten nya
                  // <View style={container.containfacility}>
                  //   <View style={{ flexDirection: 'row', alignItems: 'center', flexGrow: 1 }}>
                  //     <View style={{ height: 17, width: 17, backgroundColor: '#6495ed', borderRadius: 10, marginVertical: 10, marginRight: 5 }} />
                  //     <Text style={{ marginRight: 10 }}>Laboratory</Text>
                  //   </View>
                  // </View>
                }
              </View>
            }
          </View>
          <View style={container.headerfacility}>
            {medicalVisible &&
              <TouchableOpacity onPress={() => setMedicalVisible(!medicalVisible)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='ios-pulse' size={25} color='#5E5C5C' />
                <Text style={textStyles.child}>Medical Treatment</Text>
                <Icon name='ios-arrow-down' size={20} color='#5E5C5C' />
              </TouchableOpacity>
            }
            {!medicalVisible &&
              <TouchableOpacity onPress={() => setMedicalVisible(!medicalVisible)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='ios-pulse' size={25} color='#5E5C5C' />
                <Text style={textStyles.child}>Medical Treatment</Text>
                <Icon name='ios-arrow-up' size={20} color='#5E5C5C' />
              </TouchableOpacity>
            }
          </View>
          <View style={[container.headerfacility, { borderBottomWidth: 1 }]}>
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
                    return (
                      <TouchableOpacity 
                      // onPress={() => {
                      //   console.log(el[1]);
                      // }}
                      onPress={() => {
                        props.navigation.navigate('DetailDoctor', { data: el[1], idHos: dataHospital._id, back: "DetailHospital" })
                      }} 
                      key={index}
                        style={{ backgroundColor: '#FFF', marginTop: 10, flexDirection: 'row', borderWidth: 1, borderRadius: 10, borderColor: '#CACACA', alignItems: 'center', padding: 10 }}>
                        {/* <Text>{JSON.stringify(dataHospital._id, null, 2)}</Text> */}
                        <View style={styles.borderPhoto}>
                          <Image
                            style={{ minWidth: 80, minHeight: 80, resizeMode: 'cover', }}
                            source={{ uri: (!el[1].photo) ? 'https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg' : el[1].photo }} />
                        </View>
                        <View style={{flex:1,}}>
                          <Text style={{ fontSize: 14, fontWeight: 'bold', }}>{el[1].title} {el[1].doctorName}</Text>
                          <Text>{el[1].specialist}</Text>
                          {/* <Text>{JSON.stringify(el[1], null, 2)}</Text> */}
                        </View>
                      </TouchableOpacity>
                    )
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
    height: dimHeight * 0.35,
    // backgroundColor: '#98e'
  },
  imageHeader: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    borderBottomRightRadius: 100,
  },
  backNav: {
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    height: 70,
    justifyContent: 'flex-end',
    paddingBottom: 5
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backText: {
    fontSize: 20,
    color: '#ffff',
    fontWeight: 'bold',
    position: 'relative',
  },
})

const container = StyleSheet.create({
  detailRS: {
    // backgroundColor: '#8fbc8f',
    padding: 20,
    borderBottomWidth: 15,
    borderColor: '#EEF2F0'
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
    // backgroundColor: '#6F2be2',
    flex: 1,
  },
  headerfacility: {
    // backgroundColor: '#deb887',
    borderTopColor: '#CACACA',
    borderTopWidth: 1,
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
    height: 80,
    width: 80,
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
    color: '#5E5C5C',
    width: '90%',
  },
  detailRS: {
    fontSize: 14,
    color: '#5E5C5C',
    marginHorizontal: 15,
    textAlign: 'justify'
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5E5C5C'
  },
  child: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5E5C5C',
    marginHorizontal: 10,
  },
  spesialis: {
    fontSize: 14,
    color: '#5E5C5C'
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
