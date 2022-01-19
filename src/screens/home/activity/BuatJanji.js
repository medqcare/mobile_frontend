import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  TextInput,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  bookDoctor,
  findPatientFacility,
  createPatientFacility,
  setLoading,
} from '../../../stores/action';


import ArrowDownWhite from '../../../assets/svg/ArrowDownWhite';
import Vector from '../../../assets/svg/Vector';
import BuatJanji from '../../../assets/svg/BuatJanji';
import formatRP from '../../../helpers/rupiah';
import Header from '../../../components/headers/GradientHeader';

import IcTunai from "../../../assets/svg/ic_tunai"

import SettingModal from '../../../components/modals/setModal';
import LottieLoader from 'lottie-react-native';
import Modal from 'react-native-modal';

import SelectPatient from '../../../components/modals/selectPatient';

const mapDispatchToProps = {
  bookDoctor,
  findPatientFacility,
  createPatientFacility,
  setLoading,
};

const mapStateToProps = (state) => {
  return state;
};

const buatJanji = (props) => {
  const [insuranceNumber, setInsuranceNumber] = useState(null);
  const [bpjsNumber, setBpjsNumber] = useState(null);
  let datadoctor = props.navigation.getParam('data');
  const [getDay, setGetDay] = useState('');
  let dayChoose = null;
  const [time, setTime] = useState([]);
  const day = ['0', '1', '2', '3', '4', '5', '6'];
  const dayName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const [book, setBook] = useState({
    userID: props.userData.userID._id,
    email: props.userData.userID.email,
    healthFacility: {
      facilityID: datadoctor.facility[0].facilityID,
      facilityName: datadoctor.facility[0].facilityName,
      facilityType: datadoctor.facility[0].facilityType,
      facilityMainType: datadoctor.facility[0].facilityMainType,
      clinicIdWeb: datadoctor.facility[0].clinicIdWeb,
    },
    doctor: {
      doctorID: datadoctor._id,
      doctorName: datadoctor.doctorName,
      doctorGender: datadoctor.gender,
      doctorSpecialist: datadoctor.specialist,
      doctorPhoto: datadoctor.photo,
      title: datadoctor.title,
      dokterIdWeb: datadoctor.dokterIdWeb,
    },
    bookingSchedule: formatDate(datadoctor.bookingSchedule),
    bookingTime: datadoctor.bookingTime,
  });
  const [patient, setPatient] = useState({
    patient: {
      patientID: null,
      patientName: null,
      gender: null,
      nik: null,
      photo: null,
      dob: null,
      insuranceStatus: null,
      bloodType: null,
      age: null,
      mobilePhone: null,
      address: null,
      placeOfBirth: null,
      mobilePhone: null,
      resus: null,
      parentID: null
    },
  });

  const [family, setFamily] = useState([]);
  const [forFind, setForfind] = useState({
    facilityID: null,
    patientID: null,
  });
  const [forCreate, setForcreate] = useState({
    facilityID: null,
    patient: {
      patientID: null,
      patientName: null,
      gender: null,
      nik: null,
      photo: null,
      insuranceStatus: null,
      bloodType: null,
      age: null,
      mobilePhone: null,
      address: null,
      placeOfBirth: null,
      mobilePhone: null,
      patientTitle: null,
      resus: null,
      parentID: null
    },
  });
  const [jadwal, setJadwal] = useState(null);

  const [modals, setModal] = useState(false);
  const [modalf, setModalf] = useState(false);
  const [_messageF, setMessageF] = useState('Failed');
  const [load, setLoad] = useState(false);

  // modal choose patient
  const [modalP, setModalP] = useState(true);
  const [modalL, setModalL] = useState(false);

  const [dompet, setDompet] = useState('Tunai');
  const [accountOwner, setAccountOwner] = useState(props.userData);
  const [displayName, setDisplayName] = useState(
    props.userData.lastName
      ? props.userData.firstName + ' ' + props.userData.lastName
      : props.userData.firstName
  );

  async function gobookDoctor(dataSend, dataCreate) {
    setLoad(true);
    let token = await AsyncStorage.getItem('token');
    props
      .findPatientFacility(forFind, JSON.parse(token).token, dataCreate)
      .then((data, status) => {
        return props.bookDoctor(dataSend, JSON.parse(token).token);
      })
      .then((data) => {
        if (data.message == 'already reserve for that patient') {
          setLoad(false);
          ToastAndroid.show(data.message, ToastAndroid.LONG);
        } else {
          setLoad(false);
          setModal(true);
        }
      })
      .catch((error) => {
        setLoad(false);
        setMessageF(error);
        setModalf(true);
        // alert('Something Wrong', error)
        console.log(error, 'loh kok error weehhh');
      });
  }

  useEffect(() => {
    if (!patient.patient.patientID) {
      setForfind({
        facilityID: book.healthFacility.facilityID,
        patientID: patient.patient.patientID,
      });

      setForcreate({
        facilityID: book.healthFacility.facilityID,
        patient: {
          patientID: patient.patient.patientID,
          patientName: patient.patient.patientName,
          gender: patient.patient.gender,
          nik: patient.patient.nik,
          photo: patient.patient.imageUrl,
          insuranceStatus: patient.patient.insuranceStatus,
          bloodType: patient.patient.bloodType,
          age: getAge(patient.patient.dob),
          mobilePhone: patient.patient.mobilePhone,
          address: patient.patient?.address,
          placeOfBirth: patient.patient?.placeOfBirth || '',
          patientTitle: '',
          resus: patient.patient?.resus || '+',
        },
      });
    }

    getJadwal();
  }, [book, patient]);

  const getAge = (dob) => {
    const date = new Date();
    let dateOfBirthDay = new Date(dob);
    const dateNow = date.getDate();
    const monthNow = date.getMonth() + 1;
    const yearNow = date.getFullYear();
    const yearBirthDay = dateOfBirthDay.getFullYear();
    const monthBirthDay = dateOfBirthDay.getMonth() + 1;
    const dateBirthDay = dateOfBirthDay.getDate();

    let age = yearNow - yearBirthDay;

    if (monthBirthDay > monthNow) {
      age -= 1;
    }

    if (monthNow === monthBirthDay && dateNow < dateBirthDay) {
      age -= 1;
    }

    return age;
  };

  const isValidPayment = () => {
    return (
      (patient.patient.insuranceStatus === 'UMUM' && dompet) ||
      (patient.patient.insuranceStatus === 'BPJS' && bpjsNumber) ||
      (patient.patient.insuranceStatus === 'ASURANSI' && insuranceNumber)
    );
  };

  const validation = () => {
    Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter((key) => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {});

    var filter = Object.filter(book, (value) => value == null);
    if (Object.keys(filter).length) {
      ToastAndroid.show('Silahkan pilih tanggal janji', ToastAndroid.LONG);
    } else {
      var filternull = Object.filter(
        patient.patient,
        (value) => value !== null
      );
      var patient2 = Object.filter(filternull, (value) => value !== undefined);

      var filterForcreate = Object.filter(
        forCreate.patient,
        (value) => value !== null
      );
      var filterForcreate2 = Object.filter(
        filterForcreate,
        (value) => value !== undefined
      );

      var forsend = {
        ...book,
        patient: {
          ...patient2,
          patientTitle: getTitle(patient2),
          paymentMethod: dompet,
          insuranceNumber: insuranceNumber,
          bpjsNumber: bpjsNumber,
          photo: patient2.photo
            ? patient2.photo
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRH_WRg1exMTZ0RdW3Rs76kCOb9ZKrXddtQL__kEBbrS2lRWL3r',
        },
      };

      var sendCreate = {
        facilityID: book.healthFacility.facilityID,
        patient: {
          patientID: filterForcreate2.patientID,
          patientName: filterForcreate2.patientName,
          gender: filterForcreate2.gender,
          nik: filterForcreate2.nik,
          photo: filterForcreate2.photo,
        },
      };
      gobookDoctor(forsend, sendCreate);
    }
  };

  useEffect(() => {
    let _family = {
      ...props.userData,
    };
    delete _family.family;
    const temp = [_family];
    props.userData.family.forEach((el) => {
      temp.push(el);
    });
    setFamily(family.concat(temp));
  }, []);

  useEffect(() => {
    settime();
  }, [getDay]);

  useEffect(() => {
    if (!patient.patient.patientName) {
      setPatient({
        ...patient,
        patient: {
          ...patient?.patient,
          patientID: family[0]?._id,
          patientName: family[0]?.lastName
            ? family[0]?.firstName + ' ' + family[0]?.lastName
            : family[0]?.firstName,
          nik: family[0]?.nik,
          dob: family[0]?.dob,
          gender: family[0]?.gender,
          photo: family[0]?.photo || '',
          insuranceStatus: family[0]?.insuranceStatus,
          bloodType: family[0]?.bloodType,
          age: getAge(family[0]?.dob),
          mobilePhone: family[0]?.mobilePhone || '',
          address: !family[0]?.address
            ? `${family[0]?.location?.city}, ${family[0]?.location?.province}`
            : family[0]?.address,
          placeOfBirth: family[0]?.placeOfBirth || '',
          patientTitle: '',
          resus: family[0]?.resus || '+',
          parentID: family[0]?.parentID || null
        },
      });
    }
  }, [modalP]);

  function settime() {
    if (getDay !== '') {
      datadoctor.facility.forEach((item) => {
        Object.keys(item.facilitySchedule).forEach((item2, index2) => {
          if (getDay == item2) {
            dayChoose = Object.values(item.facilitySchedule);
            setTime(dayChoose[index2]);
            // setBook({...book, bookingTime: dayChoose[index2]});
          }
        });
      });
    } else {
      setTime([]);
      // setBook({...book, bookingTime: null});
    }
  }

  function getJadwal() {
    datadoctor.facility.forEach((item) => {
      if (item.facilityName == book.healthFacility.facilityName) {
        setJadwal(item.facilitySchedule);
      }
    });
  }

  function getTitle(patientData) {
    const age = getAge(patientData.dob);
    if (age <= 14) {
      return 'An';
    }
    if (patientData.gender.toLowerCase() === 'male') {
      return 'Tn';
    }
    if (patientData.gender.toLowerCase() === 'female') {
      return 'Ny';
    }
    return null;
  }

  function formatDate(date) {
    let arrDate = date.split('-');
    arrDate[2].length === 1 ? (arrDate[2] = '0' + arrDate[2]) : null;
    arrDate[1].length === 1 ? (arrDate[1] = '0' + arrDate[1]) : null;
    return arrDate.join('-');
  }

  function setSelectedValue(data) {
    setPatient({
      patient: {
        patientID: data._id,
        patientName: data.lastName
          ? data.firstName + ' ' + data.lastName
          : data.firstName,
        nik: data.nik,
        dob: data.dob,
        gender: data.gender,
        photo: data.imageUrl || '',
        insuranceStatus: data.insuranceStatus,
        bloodType: data.bloodType,
        mobilePhone: data.phoneNumber,
        address: !data.address
          ? `${data.location.city}, ${data.location.province}`
          : data.address,
        age: getAge(data.dob),
        patientTitle: '',
        placeOfBirth: data.placeOfBirth || data.location.province,
        resus: data.resus || '+',
        parentID: data.parentID || null
      },
    });
    setDisplayName(
      data.lastName ? data.firstName + ' ' + data.lastName : data.firstName
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#1F1F1F' }}>
      <ScrollView>
        <Header
          title={'Detail Pemesanan'}
          navigate={props.navigation.navigate}
          navigateBack={'DetailDoctor'}
        />

        <View style={cardStyle.container}>
          <View style={cardStyle.card}>
            <View style={{ flex: 0.2, alignItems: 'center' }}>
              <Image
                style={cardStyle.image}
                source={{
                  uri: !datadoctor.photo
                    ? 'https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg'
                    : datadoctor.photo,
                }}
              />
            </View>
            <View style={cardStyle.detail}>
              <Text style={{ color: '#DDDDDD', fontSize: 16 }}>
                {datadoctor.title} {datadoctor.doctorName}
              </Text>
              <Text style={{ color: '#B5B5B5', fontSize: 14, marginTop: 2 }}>
                {datadoctor.specialist}
              </Text>
              <Text style={{ color: '#DDDDDD', fontSize: 15, marginTop: 5 }}>
                {datadoctor.healthFacility.facilityName}
              </Text>
              <View style={cardStyle.line} />
              <View style={cardStyle.patient}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#B5B5B5' }}>Pasien :</Text>
                  <Text style={{ color: '#DDDDDD', marginLeft: 5 }}>
                    {displayName}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => setModalP(true)}>
                    <Text style={{ color: '#F37335', fontSize: 12 }}>Ubah</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={{ color: '#B5B5B5', marginTop: 2 }}>
                {datadoctor.bookingSchedule.split('-').reverse().join('-')} -{' '}
                {datadoctor.bookingTime}
              </Text>
              <View style={cardStyle.patient}>
                <Text style={{ color: '#DDDDDD', marginTop: 2 }}>
                  Biaya Konsultasi
                </Text>
                <Text style={{ color: '#DDDDDD', marginTop: 7 }}>
                  {formatRP(datadoctor.facility[0].facilityEstPrice, 'RP')}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={cardStyle.container}>
          <TouchableOpacity onPress={() => setModalL(true)}>
            <View style={cardStyle.pembayaran}>
              <Text
                style={{ color: '#DDDDDD', marginHorizontal: 15, fontSize: 14 }}
              >
                Pembayaran - {patient.patient.insuranceStatus}
              </Text>
              <View style={{ marginTop: 8 }}>
                <ArrowDownWhite />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {patient.patient.insuranceStatus === 'UMUM' && (
          <View>
            {/* E-Wallet */}
            {/* <Text
              style={{ color: '#DDDDDD', marginLeft: 15, marginVertical: 10 }}
            >
              Dompet Digital
            </Text>
            <View style={cardStyle.dompet}>
              <TouchableOpacity
                style={cardStyle.pembayaran}
                onPress={() => setDompet('gopay')}
              >
                <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                  <Image
                    source={require('../../../assets/png/ic_gopay.png')}
                    height={20}
                    width={20}
                  />
                  <Text style={{ color: '#DDDDDD', marginLeft: 15 }}>
                    Go-Pay
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setDompet('gopay')}>
                  {dompet === 'gopay' ? (
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        backgroundColor: '#1380C3',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          height: 7,
                          width: 7,
                          borderRadius: 7,
                          backgroundColor: '#DDDDDD',
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        borderColor: '#DDDDDD',
                        borderWidth: 1,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity
                style={cardStyle.pembayaran}
                onPress={() => setDompet('linkaja')}
              >
                <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                  <Image
                    source={require('../../../assets/png/ic_linkaja.png')}
                    height={20}
                    width={20}
                  />
                  <Text style={{ color: '#DDDDDD', marginLeft: 15 }}>
                    LinkAja
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setDompet('linkaja')}>
                  {dompet === 'linkaja' ? (
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        backgroundColor: '#1380C3',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          height: 7,
                          width: 7,
                          borderRadius: 7,
                          backgroundColor: '#DDDDDD',
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        borderColor: '#DDDDDD',
                        borderWidth: 1,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity
                style={cardStyle.pembayaran}
                onPress={() => setDompet('ovo')}
              >
                <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                  <Image
                    source={require('../../../assets/png/ic_ovo.png')}
                    height={20}
                    width={20}
                  />
                  <Text style={{ color: '#DDDDDD', marginLeft: 15 }}>OVO</Text>
                </View>
                <TouchableOpacity onPress={() => setDompet('ovo')}>
                  {dompet === 'ovo' ? (
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        backgroundColor: '#1380C3',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          height: 7,
                          width: 7,
                          borderRadius: 7,
                          backgroundColor: '#DDDDDD',
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        borderColor: '#DDDDDD',
                        borderWidth: 1,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
            </View> */}
            
            <View style={cardStyle.dompet}>
              <TouchableOpacity
                style={cardStyle.pembayaran}
                onPress={() => setDompet('Tunai')}
              >
                <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                  {/* <Image
                    source={require('../../../assets/png/ic_tunai.png')}
                    height={20}
                    width={20}
                  /> */}
                  <IcTunai />
                  <Text style={{ color: '#DDDDDD', marginLeft: 15 }}>
                    Tunai
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setDompet('Tunai')}>
                  {dompet === 'Tunai' ? (
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        backgroundColor: '#1380C3',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          height: 7,
                          width: 7,
                          borderRadius: 7,
                          backgroundColor: '#DDDDDD',
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        borderColor: '#DDDDDD',
                        borderWidth: 1,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
              {/* <Text
                style={{ color: '#DDDDDD', marginLeft: 15, marginVertical: 10 }}
              >
                Transfer Bank
              </Text>
              <TouchableOpacity
                style={cardStyle.pembayaran}
                onPress={() => setDompet('Mandiri')}
              >
                <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                  <Image
                    source={require('../../../assets/png/ic_mandiri.png')}
                    height={20}
                    width={20}
                  />
                  <Text style={{ color: '#DDDDDD', marginLeft: 15 }}>
                    Mandiri
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setDompet('Mandiri')}>
                  {dompet === 'Mandiri' ? (
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        backgroundColor: '#1380C3',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          height: 7,
                          width: 7,
                          borderRadius: 7,
                          backgroundColor: '#DDDDDD',
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        borderColor: '#DDDDDD',
                        borderWidth: 1,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity
                style={cardStyle.pembayaran}
                onPress={() => setDompet('BNI')}
              >
                <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                  <Image
                    source={require('../../../assets/png/ic_BNI.png')}
                    height={20}
                    width={20}
                  />
                  <Text style={{ color: '#DDDDDD', marginLeft: 15 }}>BNI</Text>
                </View>
                <TouchableOpacity onPress={() => setDompet('BNI')}>
                  {dompet === 'BNI' ? (
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        backgroundColor: '#1380C3',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          height: 7,
                          width: 7,
                          borderRadius: 7,
                          backgroundColor: '#DDDDDD',
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        borderColor: '#DDDDDD',
                        borderWidth: 1,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity
                style={cardStyle.pembayaran}
                onPress={() => setDompet('BCA')}
              >
                <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                  <Image
                    source={require('../../../assets/png/ic_BCA.png')}
                    height={20}
                    width={20}
                  />
                  <Text style={{ color: '#DDDDDD', marginLeft: 15 }}>BCA</Text>
                </View>
                <TouchableOpacity onPress={() => setDompet('BCA')}>
                  {dompet === 'BCA' ? (
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        backgroundColor: '#1380C3',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          height: 7,
                          width: 7,
                          borderRadius: 7,
                          backgroundColor: '#DDDDDD',
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        borderRadius: 15,
                        borderColor: '#DDDDDD',
                        borderWidth: 1,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </TouchableOpacity> */}
            </View>
          </View>
        )}
        {patient.patient.insuranceStatus === 'BPJS' && (
          <View
            style={{
              ...cardStyle.container,
              borderWidth: 1,
              borderColor: '#545454',
            }}
          >
            <View style={cardStyle.pembayaran}>
              <TextInput
                placeholder={'Masukkan nomor BPJS'}
                keyboardType="number-pad"
                placeholderTextColor={'#B5B5B5'}
                style={{ color: '#DDDDDD', marginHorizontal: 15, fontSize: 16 }}
                value={bpjsNumber}
                onChangeText={setBpjsNumber}
              />
            </View>
          </View>
        )}

        {patient.patient.insuranceStatus === 'ASURANSI' && (
          <View
            style={{
              ...cardStyle.container,
              borderWidth: 1,
              borderColor: '#545454',
            }}
          >
            <View style={cardStyle.pembayaran}>
              <TextInput
                placeholder={'Masukkan nomor Asuransi'}
                placeholderTextColor={'#B5B5B5'}
                style={{ color: '#DDDDDD', marginHorizontal: 15, fontSize: 16 }}
                value={insuranceNumber}
                onChangeText={setInsuranceNumber}
              />
            </View>
          </View>
        )}
      </ScrollView>
      {isValidPayment() ? (
        <View
          style={{
            padding: 10,
            backgroundColor: '#1F1F1F',
            height: 65,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => validation()}
            style={viewStyle.button}
          >
            {load ? (
              <ActivityIndicator size={'small'} color={'#FFF'} />
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginTop: 2 }}>
                  <BuatJanji />
                </View>
                <Text style={{ color: '#FFF', fontSize: 16, marginLeft: 10 }}>
                  Buat Janji
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      ) : null}

      {
        // modals &&
        <Modal
          presentationStyle={'overFullScreen'}
          statusBarTranslucent={false}
          transparent
          visible={modals}
        >
          <View
            style={{
              height: '120%',
              width: '120%',
              marginLeft: -30,
              marginTop: -100,
              backgroundColor: 'rgba(0,0,0,0.6)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ width: '100%', height: '20%' }}>
              <LottieLoader
                source={require('../../animation/success-green.json')}
                autoPlay
                speed={0.7}
                loop={false}
                onAnimationFinish={() => {
                  setModal(false);
                  props.navigation.navigate('Appointment');
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: '#2F2F2F',
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
            >
              <Text style={{ marginVertical: 20, color: '#DDDDDD' }}>
                Reservasi berhasil
              </Text>
            </View>
          </View>
        </Modal>
      }
      {modalf && (
        <SettingModal
          _visible={modalf}
          _navigationRight={() => {
            setModalf(false);
          }}
          _textRight={'OK'}
          _message={_messageF}
          _iconId={'failed'}
        />
      )}
      <SelectPatient
        modal={modalP}
        setModal={setModalP}
        accountOwner={accountOwner}
        family={family}
        title="Siapa yang ingin anda periksa?"
        setSelectedValue={setSelectedValue}
        modalP={modalP}
        setModalP={setModalP}
        patient={patient}
        setPatient={setPatient}
        family={family}
        navigateTo={props.navigation.navigate}
      />
      {
        // modal Pilih Insurance
        <Modal
          isVisible={modalL}
          swipeDirection={'down'}
          onSwipeComplete={() => setModalL(false)}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
          animationType="slide"
          onRequestClose={() => setModalP(false)}
        >
          <View style={viewModalP.container}>
            <View style={viewModalP.header}>
              <View style={viewModalP.toogle} />
              <Text style={viewModalP.title}>Pilih Pembayaran</Text>
            </View>
            <View style={viewModalP.patient}>
              <TouchableOpacity
                onPress={() => {
                  setPatient({
                    ...patient,
                    patient: {
                      ...patient.patient,
                      insuranceStatus: 'UMUM',
                    },
                  });
                  setModalL(false);
                }}
              >
                <View style={viewModalP.cardName}>
                  <View style={viewModalP.familyName}>
                    <Text style={viewModalP.name}>Umum</Text>
                  </View>
                  <View style={viewModalP.vector}>
                    <Vector />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  ToastAndroid.show(
                    'Belum Tersedia Saat Ini',
                    ToastAndroid.SHORT
                  );
                  // setPatient({
                  //   ...patient,
                  //   patient: {
                  //     ...patient.patient,
                  //     insuranceStatus: 'BPJS',
                  //   },
                  // });
                  // setModalL(false);
                }}
              >
                <View style={viewModalP.cardNameDisabled}>
                  <View style={viewModalP.familyName}>
                    <Text style={viewModalP.name}>BPJS</Text>
                  </View>
                  <View style={viewModalP.vector}>
                    <Vector />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  ToastAndroid.show(
                    'Belum Tersedia Saat Ini',
                    ToastAndroid.SHORT
                  );
                  // setPatient({
                  //   ...patient,
                  //   patient: {
                  //     ...patient.patient,
                  //     insuranceStatus: 'ASURANSI',
                  //   },
                  // });
                  // setModalL(false);
                }}
              >
                <View style={viewModalP.cardNameDisabled}>
                  <View style={viewModalP.familyName}>
                    <Text style={viewModalP.name}>Asuransi</Text>
                  </View>
                  <View style={viewModalP.vector}>
                    <Vector />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      }
    </View>
  );
};

const viewStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    // backgroundColor: 'black'
  },
  choose: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '94%',
    height: 48,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#005EA2',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    maxWidth: '94%',
    height: 45,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 3,
    margin: 2,
  },
  picker: {
    height: 40,
    width: wp('90%'),
  },
  hr: {
    borderRadius: 2,
    borderWidth: 1.5,
    borderBottomColor: '#ABABAB',
    width: wp('100%'),
    borderStyle: 'dashed',
    opacity: 0.3,
    marginVertical: 20,
  },
  modalP: {
    marginTop: '50%',
  },
});

const textStyles = StyleSheet.create({
  name: {
    fontSize: 14,
    color: '#333335',
    fontFamily: 'NunitoSans-Black',
  },
  spesialis: {
    fontSize: 18,
    color: '#3f3f3f',
    fontFamily: 'NunitoSans-Regular',
  },
  buttonText: {
    fontSize: 15,
    color: '#DDDDDD',
  },
  detail: {
    fontFamily: 'NunitoSans-Black',
    fontSize: 16,
    color: '#707070',
  },
  _detail: {
    fontFamily: 'NunitoSans-Black',
    fontSize: 14,
    color: '#CACACA',
    marginVertical: 10,
  },
});

const viewModalP = StyleSheet.create({
  container: {
    maxHeight: '100%',
    backgroundColor: '#2F2F2F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toogle: {
    position: 'absolute',
    borderWidth: 2,
    width: 50,
    borderColor: '#6C6C6C',
    alignContent: 'center',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 20,
  },
  patient: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  titleP: {
    color: 'white',
    fontSize: 12,
  },
  cardName: {
    marginTop: 10,
    borderColor: '#757575',
    borderWidth: 1,
    borderRadius: 3,
    minHeight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  cardNameDisabled: {
    marginTop: 10,
    borderColor: '#757575',
    backgroundColor: "#757575",
    borderWidth: 1,
    borderRadius: 3,
    minHeight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  familyName: {
    flexDirection: 'row',
  },
  photo: {
    marginVertical: 7,
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#4fe39b',
  },
  name: {
    marginTop: 15,
    marginLeft: 15,
    color: '#DDDDDD',
  },
  vector: {
    marginVertical: 20,
  },
  buttonAdd: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  vectorPlus: {
    marginTop: 5,
    marginRight: 5,
  },
  addTitle: {
    color: '#4398D1',
  },
});

const cardStyle = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: '#2F2F2F',
    borderRadius: 5,
  },
  dompet: {
    margin: 15,
    backgroundColor: '#2F2F2F',
    borderRadius: 5,
  },
  card: {
    margin: 10,
    flexDirection: 'row',
    margin: 15,
    flex: 1,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 50,
    // width: '25%'
  },
  detail: {
    marginLeft: 15,
    flex: 0.8,
  },
  line: {
    borderColor: '#515151',
    borderWidth: 1,
    width: '95%',
    marginVertical: 7,
    marginRight: 15,
  },
  patient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 15,
  },
  pembayaran: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    marginRight: 15,
    marginVertical: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(buatJanji);
