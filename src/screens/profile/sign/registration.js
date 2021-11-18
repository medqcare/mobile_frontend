import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Picker,
  BackHandler,
  KeyboardAvoidingView,
  ActivityIndicator,
  Dimensions,
  ToastAndroid
} from 'react-native';
import { useEffect, useState } from 'react';
import { CreatePatientAsUser, setLoading, Logout } from '../../../stores/action';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import axios from 'axios'
import LottieLoader from 'lottie-react-native'

import SettingModal from '../../../components/modals/setModal'
import CaptitalF from '../../../helpers/capitalFirst'
import capitalFirst from '../../../helpers/capitalFirst';


const Registration = props => {
  var moment = require('moment')
  const region = require('../../../assets/Region/province')

  const [valid, setValid] = useState(false)
  const [success, setSuccsess] = useState(false)
  const [warning, setWarning] = useState(false)
  const [messageModals, setMessage] = useState('')
  const [genderlist, setGender] = useState([
    'Male',
    'Female',
  ]);
  const [listTitle, setTitle] = useState([
    'Mr.',
    'Mrs.',
    'Miss.',
    'Ms.'
  ]);

  const [dataRegist, setDataRegist] = useState({
    nik: null,
    title: listTitle[0],
    firstName: null,
    lastName: '',
    gender: genderlist[0],
    dob: null,
    bloodType: null,
    resus: null,
    phoneNumber: null,
    location: {
      province: null,
      city: null,
      type: "Point",
      coordinates: []
    },
    insuranceStatus: 'UMUM'
  });

  const [province, setProvince] = useState(region.province)
  const [distric, setDistric] = useState(region.kabupatenkota('11'))

  useEffect(() => {
    if (province.length && distric.length) {
      setDataRegist({
        ...dataRegist, location: {
          ...dataRegist.location,
          province: province[0].name,
          city: distric[0].name,
          coordinates: [distric[0].longitude, distric[0].latitude]
        }
      })
    }
  }, [])

  function validation() {
    if (dataRegist.nik == null || dataRegist.nik.length !== 16 ||
      dataRegist.firstName == null || dataRegist.dob == null || dataRegist.phoneNumber == null ||
      dataRegist.phoneNumber.length == 0) {
      setValid(true)
      ToastAndroid.show('Please check the data !', ToastAndroid.LONG)
    } else {
      setValid(false)
      FilterDataSend(dataRegist)
    }
  }

  function dataSuccess(message) {
    setMessage(message)
    setSuccsess(true)
  }

  function dataError(message) {
    ToastAndroid.show(message, ToastAndroid.LONG)
  }

  const FilterDataSend = (data) => {
    // Methode
    Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => (res[key] = obj[key], res), {});

    console.log(data, 'sebelum Filter')
    var send = Object.filter(data, value => value !== null)
    send = Object.filter(send, value => value !== '')
    console.log(send, 'seudah Filter')
    props.CreatePatientAsUser(send, dataSuccess, dataError);
  }

  BackHandler.addEventListener("hardwareBackPress", () => {
    setMessage('cancel registration ?')
    setWarning(true)
    return true
  })

  // console.log(dataRegist, 'ini data registrationnya');
  return (
    <View
      // behavior={'height'}
      style={container.base}>
      <View style={container.header} />
      <View style={container.body}>
        <View style={container.top}>
          <Text style={textStyle.registUser}>Patient Registration </Text>
        </View>
        <View style={{ flex: 1, marginBottom: '11%', padding: 20 }}>
          <View style={container.bottom}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={container.title}>
                {!dataRegist.nik && valid &&
                  <Text style={textStyle.start}>*</Text>
                }
                <Text style={textStyle.title}>NIK</Text>
              </View>
              <TextInput
                style={container.input}
                autoCapitalize={'none'}
                autoFocus={false}
                placeholder={'NIK'}
                keyboardType={'numeric'}
                onChangeText={text =>
                  setDataRegist({ ...dataRegist, nik: text.toString() })
                }
                value={dataRegist.nik}
                autoCorrect={false}
              />
              {dataRegist.nik !== null && dataRegist.nik.length > 0 && dataRegist.nik.length !== 16 &&
                <Text style={{ color: 'red' }}>NIK must contain at 16 characters</Text>
              }
              <Text style={textStyle.title}>Title</Text>
              <View style={[container.pickerContainer]}>
                <Picker
                  mode={'dropdown'}
                  selectedValue={dataRegist.title}
                  style={{ height: 45 }}
                  onValueChange={(itemValue, itemIndex) => {
                    if (itemValue === 'Mr.') {
                      setDataRegist({
                        ...dataRegist,
                        title: itemValue,
                        gender: 'Male',
                      });
                    } else {
                      setDataRegist({
                        ...dataRegist,
                        title: itemValue,
                        gender: 'Female',
                      });
                    }
                    console.log(itemValue, ' - ', itemIndex)
                  }}>
                  {listTitle.map((item, index) => {
                    return <Picker.Item label={item} value={item} key={index} />;
                  })}
                </Picker>
              </View>

              <View style={container.title}>
                {!dataRegist.firstName && valid &&
                  <Text style={textStyle.start}>*</Text>
                }
                <Text style={textStyle.title}>First Name</Text>
              </View>
              <TextInput
                style={container.input}
                autoCapitalize={'sentences'}
                autoFocus={false}
                placeholder={'First Name'}
                onChangeText={text =>
                  setDataRegist({ ...dataRegist, firstName: text })
                }
                value={dataRegist.firstName}
              />

              <Text style={textStyle.title}>Last Name</Text>
              <TextInput
                style={container.input}
                autoCapitalize={'sentences'}
                autoFocus={false}
                placeholder={'Last Name'}
                onChangeText={text =>
                  setDataRegist({ ...dataRegist, lastName: text })
                }
                value={dataRegist.lastName}
              />


              <Text style={textStyle.title}>Gender</Text>
              <View style={[container.pickerContainer]}>
                <Picker
                  mode={'dropdown'}
                  selectedValue={dataRegist.gender}
                  style={{ height: 45 }}
                  onValueChange={(itemValue, itemIndex) => {
                    if (itemIndex != 0) {
                      setDataRegist({ ...dataRegist, gender: itemValue });
                    }
                  }}>
                  {genderlist.map((item, index) => {
                    return <Picker.Item label={item} value={item} key={0} />;
                  })}
                </Picker>
              </View>

              <Text style={textStyle.title}>Province</Text>
              <View style={[container.pickerContainer]}>
                {province.length > 0 ? (
                  <Picker
                    selectedValue={dataRegist.location.province}
                    style={{ height: 45 }}
                    onValueChange={(itemValue, itemIndex) => {
                      setDataRegist({ ...dataRegist, location: { ...dataRegist.location, province: itemValue } })
                      setDistric(region.kabupatenkota(province[itemIndex].id))
                    }}>
                    {province.length !== 0 &&
                      province.map((item, index) => {
                        return <Picker.Item label={capitalFirst(item.name)} value={capitalFirst(item.name)} key={index} />
                      })
                    }
                  </Picker>
                ) : (<ActivityIndicator size={'small'} color={'blue'} />)}
              </View>
              <Text style={textStyle.title}>City</Text>
              <View style={[container.pickerContainer]}>
                {distric.length > 0 ? (
                  <Picker
                    selectedValue={dataRegist.location.city}
                    style={{ height: 45 }}
                    onValueChange={(itemValue, itemIndex) => {
                      // console.log('item valuenya', itemValue)
                      setDataRegist({
                        ...dataRegist,
                        location: { ...dataRegist.location, city: itemValue, coordinates: [distric[itemIndex].longitude, distric[itemIndex].latitude] }
                      });
                    }}>
                    {distric.length &&
                      distric.map((item, index) => {
                        return <Picker.Item label={capitalFirst(item.name)} value={capitalFirst(item.name)} key={index} />
                      })
                    }
                  </Picker>
                ) : (<ActivityIndicator size={'small'} color={'blue'} />)}
              </View>
              <View style={container.title}>
                {!dataRegist.dob && valid &&
                  <Text style={textStyle.start}>*</Text>
                }
                <Text style={textStyle.title}>Date of Brith</Text>
              </View>
              <View style={container.dob}>
                <DatePicker
                  style={{ width: '100%' }}
                  date={dataRegist.dob} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="Date of Brith"
                  format='YYYY/MM/DD'
                  maxDate={new Date()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      display: 'flex',
                      // position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 0,
                      // marginLeft: 36,
                      borderWidth: 0,
                      borderColor: '#D5EDE1',
                    },
                  }}
                  onDateChange={date => {
                    setDataRegist({ ...dataRegist, dob: date.toString() });
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <Text style={textStyle.title}>Blood Type</Text>
                <Text style={textStyle.title}>Rhesus</Text>
              </View>
              <View style={[container.pickerContainer, { flexDirection: 'row', }]}>
                <Picker
                  selectedValue={dataRegist.bloodType}
                  style={{ height: 45, width: '50%' }}
                  mode={'dropdown'}
                  onValueChange={(itemValue, itemIndex) => {
                    if (itemIndex == 0) {
                      setDataRegist({ ...dataRegist, bloodType: null });
                    } else {
                      setDataRegist({ ...dataRegist, bloodType: itemValue });
                    }
                  }}>
                  <Picker.Item label="Blood Type" value="Blodd Type" key={0} color={'#C2C2C2'} />
                  <Picker.Item label="A" value="A" key={1} />
                  <Picker.Item label="AB" value="AB" key={2} />
                  <Picker.Item label="B" value="B" key={3} />
                  <Picker.Item label="O" value="O" key={4} />
                </Picker>
                <Picker
                  selectedValue={dataRegist.resus}
                  style={{ height: 45, width: '50%', }}
                  mode={'dropdown'}
                  onValueChange={(itemValue, itemIndex) => {
                    if (itemIndex == 0) {
                      setDataRegist({ ...dataRegist, resus: null });
                    } else {
                      setDataRegist({ ...dataRegist, resus: itemValue });
                    }
                  }}>
                  <Picker.Item label="Rhesus" value="Rhesus" key={0} color={'#C2C2C2'} />
                  <Picker.Item label="-" value="-" key={1} />
                  <Picker.Item label="+" value="+" key={2} />
                </Picker>
              </View>
             <View style={container.title}>
                {!dataRegist.phoneNumber && valid &&
                  <Text style={textStyle.start}>*</Text>
                }
                <Text style={textStyle.title}>Phone Number</Text>
              </View>
              <TextInput
                style={container.input}
                autoCapitalize={'none'}
                autoFocus={false}
                placeholder={'Phone Number'}
                keyboardType={'numeric'}
                onChangeText={text =>
                  setDataRegist({ ...dataRegist, phoneNumber: text.toString() })
                }
                value={dataRegist.phoneNumber}
                autoCorrect={false}
              />
              {dataRegist.phoneNumber !== null && dataRegist.phoneNumber.length == 0 &&
                <Text style={{ color: 'red' }}>Phone Number Don't Empty</Text>
              }
              <Text style={textStyle.title}>Insurance </Text>
              <View style={[container.pickerContainer]}>
                <Picker
                  mode="dropdown"
                  selectedValue={dataRegist.insuranceStatus}
                  style={{ height: 45 }}
                  onValueChange={(itemValue, itemIndex) => {
                    // console.log('item valuenya', itemValue)
                    setDataRegist({
                      ...dataRegist,
                      insuranceStatus: itemValue
                    });
                  }}>
                  <Picker.Item label={'Umum'} value={'UMUM'} key={0} />
                  <Picker.Item label={'BPJS'} value={'BPJS'} key={1} />
                  <Picker.Item label={'Asuransi'} value={'ASURANSI'} key={2} />

                </Picker>
              </View>
            </ScrollView>
            {
              success &&
              <LottieLoader
                source={require('../../animation/success-green.json')}
                autoPlay
                loop={false}
                onAnimationFinish={() => props.navigation.navigate('ProfileSwitch')}
              />
            }
            <View style={{ alignItems: 'flex-end', marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  validation()
                }}
                style={container.button}>
                <Text style={textStyle.button}>DONE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>
      {
        warning &&
        <SettingModal
          _visible={warning}
          _iconId={'warning'}
          _navigationRight={() => {
            setWarning(false)
          }}
          _textRight={'Cancel'}
          _navigationLeft={() => {
            props.Logout(props.navigation)
            setWarning(false)
          }}
          _textLeft={'OK'}
          _message={messageModals} />
      }
    </View>
  )
};

const container = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
    // height: '90%',
    justifyContent: 'space-between'
  },
  header: {
    backgroundColor: '#85EC92',
    height: Dimensions.get('screen').height * 0.30,
    width: '100%',
    alignItems: 'center',
  },
  top: {
    // backgroundColor: '#F99898',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  body: {
    // backgroundColor: '#C4DEF6',
    width: '100%',
    height: '100%',
    top: '10%',
    position: 'absolute',
  },
  bottom: {
    backgroundColor: '#fff',
    flex: 1,
    borderColor: '#CDCDCD',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
    padding: 20,
  },
  contain: {
    backgroundColor: '#D9AFF9',
    position: 'absolute',
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 5,
    borderColor: '#D5EDE1',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 3,
  },
  pickerContainer: {
    width: '100%',
    height: 50,
    marginVertical: 5,
    borderColor: '#D5EDE1',
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dob: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    marginVertical: 5,
    borderColor: '#D5EDE1',
    borderWidth: 1,
    borderRadius: 3,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#85EC92',
    borderWidth: 1,
    borderColor: '#D5EDE1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropDown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: 5,
    flexDirection: 'row',
  },

});

const textStyle = StyleSheet.create({
  registUser: {
    fontSize: 20,
    color: '#FFF',
  },
  button: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    flex: 1,
    fontSize: 16,
    marginTop: 5,
  },
  start: {
    marginRight: 5,
    color: 'red',
  }
});

const mapDispatchToProps = {
  CreatePatientAsUser, setLoading, Logout
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
