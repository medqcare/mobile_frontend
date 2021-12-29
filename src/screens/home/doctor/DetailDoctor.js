import React, { Component, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';

import IconAnt from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Coins from '../../../assets/svg/coins';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import formatRP from '../../../helpers/rupiah';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Schedule from '../../../components/home/doctor/schedule';
import axios from 'axios';
import { baseURL } from '../../../config';
import { addDoctorFavorite } from '../../../stores/action';
import Loading from '../../../components/Loader';
import ArrowDown from '../../../assets/svg/ArrowDown';
import ArrowUp from '../../../assets/svg/ArrowUp';
import ButtonMap from '../../../assets/svg/buttonMap';
import RatingStar from '../../../assets/svg/RatingStar';
import Money from '../../../assets/svg/Money';
import BuatJanji from '../../../assets/svg/BuatJanji';
import ArrowBack from '../../../assets/svg/ArrowBack';

const dimHeight = Dimensions.get('screen').height;
const dimWidth = Dimensions.get('screen').width;

function DetailDoctorPage(props) {
  // console.log(props,'props')
  // console.log(props.navigation.actions, 'navigation')
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const _data = props.navigation.getParam('data');
  const _idHostpital = props.navigation.getParam('idHos');
  const _back = props.navigation.getParam('back');
  // console.log(_data, 'ini _data')
  // console.log(_idHostpital, 'idHost')
  const [showLoading, setLoading] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showAddress, setShowAddress] = useState(true);
  const [aktif, setaktif] = useState('');
  const [dataDoctor, setDataDoctor] = useState(null);
  const [jadwalPerhari, setjadwalPerhari] = useState([]);

  const [aktifDay, setAktifDay] = useState(null);
  const [aktifHospital, setAktifHospital] = useState(null);
  const [newData, setNewData] = useState(null);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [month, setMonth] = useState(bookingDate.getMonth());

  const [facility, setFacility] = useState(null);
  const day = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const [favorit, setFavorit] = useState(null);
  const [thisFavorite, setThisFavorite] = useState(false);
  const [showDetail, setShowDetail] = useState(null);

  const [chooseDate, setChooseDate] = useState(new Date().getDate());
  const [bookingTime, setBookingTime] = useState('');

  Date.isLeapYear = function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  Date.getDaysInMonth = function (year, month) {
    return [
      31,
      Date.isLeapYear(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ][month];
  };

  Date.prototype.isLeapYear = function () {
    return Date.isLeapYear(this.getFullYear());
  };

  Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
  };

  Date.prototype.addMonths = function () {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + 1);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
  };

  Date.prototype.minusMonths = function () {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() - 1);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
  };

  useEffect(() => {}, [dataDoctor, bookingTime, chooseDate]);

  useEffect(() => {
    // console.log("===============masuk useeffect===================");
    // console.log(_data, '------------');
    axios({
      method: 'POST',
      url: `${baseURL}/api/v1/members/detailDoctor/${_data.doctorID}`,
      // url: `${baseURL}/api/v1/members/detailDoctor/618ab3931dbe3c74a14d6a18`
    })
      .then(({ data }) => {
        console.log(data, '===============setelah axios===================');
        // console.log(data);
        setDataDoctor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, 'error get Dockter');
      });
  }, [_data]);

  useEffect(() => {
    // console.log("======================================");
    // console.log(dataDoctor, "ini data dokter")
    if (dataDoctor !== null) {
      findFavorite();
      getFacility();
      // parsingData();
    }
  }, [dataDoctor]);

  useEffect(() => {
    getJadwalPerhari();
    about();
  }, [facility]);

  useEffect(() => {
    findFavorite();
  }, [props.userData]);

  const findFavorite = () => {
    // console.log(props.userData)
    if (props.userData && dataDoctor) {
      // console.log(props.userData.doctorFavorites.length, '+++++++++')
      if (props.userData.doctorFavorites.length > 0) {
        props.userData.doctorFavorites.find(function (value, index) {
          // console.log(index, '=', value)
          if (value._id == dataDoctor._id) {
            setThisFavorite(true);
          }
        });
      } else {
        setThisFavorite(false);
        console.log('kosong');
      }
    }
  };

  const changeTapLove = async () => {
    if (!thisFavorite) {
      let dataNew = {
        ...props.userData,
        doctorFavorites: props.userData.doctorFavorites.concat(dataDoctor),
      };
      props.addDoctorFavorite(dataNew);
      console.log('Lol', props.userData.doctorFavorites.length);
      await AsyncStorage.setItem(
        'doctorFavorite',
        JSON.stringify(dataNew.doctorFavorites)
      );
      console.log(await AsyncStorage.getItem('doctorFavorite'));
      // findFavorite()
    } else {
      if (dataDoctor) {
        function arrayRemove(arr, value) {
          return arr.filter(function (ele) {
            return ele._id != value;
          });
        }
        var result = arrayRemove(
          props.userData.doctorFavorites,
          dataDoctor._id
        );
        // console.log(result, 'ini sisa nya')
        let dataSend = { ...props.userData, doctorFavorites: result };
        props.addDoctorFavorite(dataSend);
        await AsyncStorage.setItem(
          'doctorFavorite',
          JSON.stringify(dataSend.doctorFavorites)
        );
        setThisFavorite(false);
      }
    }
  };

  const buatJanji = async () => {
    // console.log('ini untuk buat janji, anti diredirect')
    // console.log(value,'ini valuenya..')
    if (bookingTime === '') {
      ToastAndroid.show('Silahkan pilih tanggal janji', ToastAndroid.LONG);
    } else {
      props.userData
        ? // console.log('ini bisa di redirect'),
          props.navigation.push('BuatJanji', { data: dataDoctor })
        : // console.log('gabisa di redirect karena belom login, arahin ke bagian sign'),
          (props.navigation.navigate('DetailDoctor'),
          props.navigation.navigate('Sign'));
    }
  };

  const getFacility = () => {
    let temp = null;
    if (
      dataDoctor !== null &&
      dataDoctor.facility !== null &&
      dataDoctor.facility.length !== 0
    ) {
      dataDoctor.facility.forEach((el, i) => {
        if (el._id === _idHostpital) {
          setFacility(el);
        } else if (i === 0) {
          setFacility(el);
        }
      });
    }
  };

  const getJadwalPerhari = () => {
    if (
      facility !== null &&
      Object.keys(facility).length !== 0 &&
      facility.facilitySchedule !== null
    ) {
      Object.values(facility.facilitySchedule).forEach((el, i) => {
        if (i === 0) {
          setjadwalPerhari(el);
        }
      });

      Object.keys(facility.facilitySchedule).forEach((el, i) => {
        if (i === 0) {
          setaktif(el);
        }
      });
    }
  };

  const about = () => {
    console.log('??', dataDoctor, '??');

    // if (dataDoctor !== null && dataDoctor.doctorProfile !== null) {
    //   if (dataDoctor.doctorProfile.abstract.length > 120) {
    //     setDetProfile(false);
    //   }
    // }
    // console.log(facility, 'fac address')
    if (facility !== null && facility.facilityAddress !== null) {
      // console.log('masuk fac add not null')
      if (facility.facilityAddress.length > 50) {
        setShowAddress(false);
      }
    }
  };

  const checkSchedule = (key) => {
    return new Date(
      `${month + 1}/${calcDate(key)}/${bookingDate.getFullYear()}`
    )
      .getDay()
      .toString();
  };

  function parsingData() {
    let day = {};
    if (dataDoctor.facility !== null) {
      dataDoctor.facility.forEach((el1) => {
        Object.entries(el1.facilitySchedule).forEach((el2, index2) => {
          if (index2 == 0) {
            day[el1.facilityName] = el2;
          }
        });
      });
      setNewData(day);
    }
  }

  const _openMap = (lat, lang) => {
    console.log(lat, lang);
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${lat},${lang}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  const calcDate = (key) => {
    return month === new Date().getMonth()
      ? bookingDate.getDate() + key
      : key + 1;
  };

  return (
    <View style={containerStyle.container}>
      {showLoading && <Loading />}
      {dataDoctor && (
        <View style={containerStyle.container}>
          <ImageBackground
            source={require('../../../assets/background/RectangleHeader.png')}
            style={{ height: 100 }}
          >
            <View
              style={{
                height: 40,
                marginTop: 32,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate(_back)}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <ArrowBack />
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#ffff',
                      position: 'relative',
                      marginLeft: 20,
                    }}
                  >
                    Profil Dokter
                  </Text>
                </View>
              </TouchableOpacity>
              {props.userData && (
                <TouchableOpacity
                  onPress={() => {
                    changeTapLove();
                  }}
                >
                  {thisFavorite ? (
                    <Icon name="ios-heart" color="#F37335" size={20} />
                  ) : (
                    <Icon name="ios-heart" color="#CACACA" size={20} />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>

          <View style={{ flex: 1 }}>
            <View>
              <View style={containerStyle.dataDoctor}>
                <View style={containerStyle.spesialis}>
                  <View style={styles.borderAvatar}>
                    <Image
                      style={styles.avatar}
                      source={{
                        uri: !dataDoctor.photo
                          ? 'https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg'
                          : dataDoctor.photo,
                      }}
                    />
                  </View>
                </View>
                <View style={containerStyle.personalData}>
                  <Text style={fontStyles.name}>
                    {dataDoctor.title} {dataDoctor.doctorName}
                  </Text>
                  <Text style={fontStyles.titleSp}>
                    Spesialis {dataDoctor.specialist}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 15,
                    }}
                  >
                    <View style={{ marginRight: 12 }}>
                      <RatingStar />
                    </View>
                    <Text style={{ color: '#B2B2B2' }}>4.7/5</Text>
                  </View>
                  <View>
                    <Text style={fontStyles.titleSp}>
                      Jasa Konsultasi Mulai Dari
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 12 }}>
                      <Money />
                    </View>
                    <Text style={{ color: '#B2B2B2' }}>
                      {facility !== null && facility.facilityEstPrice
                        ? formatRP(facility.facilityEstPrice, 'RP ')
                        : 0}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 15,
                  height: 0,
                  borderWidth: 1,
                  borderColor: '#353535',
                }}
              />
              <Text
                style={{ color: '#DDDDDD', marginLeft: 15, marginBottom: 5 }}
              >
                Lokasi {'&'} Jadwal Praktik
              </Text>
            </View>
            <ScrollView>
              {facility === null && (
                <View style={containerStyle.bodyContent}>
                  <View style={containerStyle.medFacility}>
                    <Text style={fontStyles.headerNameStyle}>
                      Medical Facility
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      flex: 1,
                      paddingVertical: 20,
                    }}
                  >
                    <Image
                      source={{
                        uri: 'https://dikertas.com/repository/notfound2.png',
                      }}
                      style={{ height: 110, width: 110 }}
                    />
                    <Text>Facility Kosong</Text>
                  </View>
                </View>
              )}
              {facility !== null && Object.keys(facility).length !== 0 && (
                <View style={containerStyle.bodyContent}>
                  {dataDoctor.facility.map((item, indexFacility) => {
                    return (
                      <View
                        key={indexFacility}
                        style={{
                          backgroundColor: '#2F2F2F',
                          marginVertical: 5,
                          paddingLeft: 10,
                          paddingVertical: 10,
                          paddingRight: 10,
                          borderRadius: 5,
                        }}
                      >
                        <View>
                          <View style={containerStyle.detMedfac}>
                            <Image
                              source={{
                                uri: !item.facilityPhoto
                                  ? 'https://revcycleintelligence.com/images/site/article_headers/_normal/hospital%2C_green.jpg'
                                  : item.facilityPhoto,
                              }}
                              style={styles.imageRS}
                            />
                            <View style={containerStyle.detRS}>
                              <Text style={fontStyles.name}>
                                {item.facilityName}
                              </Text>
                              {/* <Text style={fontStyles.address}>{facility.facilityAddress}</Text> */}
                              {showAddress && (
                                <Text style={fontStyles.address}>
                                  {item.facilityAddress}
                                </Text>
                              )}
                              {!showAddress && (
                                <Text style={fontStyles.address}>
                                  {item.facilityAddress.substring(0, 50)}...
                                </Text>
                              )}
                              <Text style={fontStyles.address}>
                                3.1 km dari Anda
                              </Text>
                            </View>
                            <TouchableOpacity
                              style={{
                                alignSelf: 'flex-start',
                                transform: [{ translateX: 10 }],
                              }}
                              onPress={() =>
                                _openMap(
                                  item.location.coordinates[1],
                                  item.location.coordinates[0]
                                )
                              }
                            >
                              <View
                                style={{
                                  alignItems: 'center',
                                  height: 40,
                                  width: 40,
                                  borderRadius: 40,
                                  borderColor: '#7D7D7D',
                                  borderWidth: 1,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <ButtonMap />
                              </View>
                            </TouchableOpacity>
                            {/* <View style={containerStyle.maps} >
                            <TouchableOpacity onPress={() => _openMap(item.location.coordinates[1], item.location.coordinates[0])}>
                              <MCIcon name={'google-maps'} size={30} color={'#848280'} />
                            </TouchableOpacity>
                          </View> */}
                          </View>
                          {showDetail !== indexFacility ? (
                            <TouchableOpacity
                              onPress={() => {
                                // setNewData(null);
                                setShowDetail(indexFacility);
                                setNewData({
                                  ...newData,
                                  [item.facilityName]: [
                                    checkSchedule(bookingDate.getDay()),
                                    item.facilitySchedule[
                                      checkSchedule(bookingDate.getDay())
                                    ],
                                  ],
                                });
                                setDataDoctor({
                                  ...dataDoctor,
                                  healthFacility: {
                                    facilityID:
                                      dataDoctor.facility[indexFacility]
                                        .facilityID,
                                    facilityName:
                                      dataDoctor.facility[indexFacility]
                                        .facilityName,
                                    facilityType:
                                      dataDoctor.facility[indexFacility]
                                        .facilityType,
                                    facilityMainType:
                                      dataDoctor.facility[indexFacility]
                                        .facilityMainType,
                                  },
                                });
                              }}
                            >
                              <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: '#F37335' }}>
                                  Selengkapnya
                                </Text>
                                <View style={{ marginLeft: 8, marginTop: 5 }}>
                                  <ArrowDown />
                                </View>
                              </View>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => setShowDetail(null)}
                            >
                              <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: '#F37335' }}>Tutup</Text>
                                <View style={{ marginLeft: 8, marginTop: 5 }}>
                                  <ArrowUp />
                                </View>
                              </View>
                            </TouchableOpacity>
                          )}
                        </View>
                        {showDetail === indexFacility ? (
                          <View>
                            <View style={dateStyle.chooseMonth}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <TouchableOpacity
                                  disabled={
                                    bookingDate.getMonth() ===
                                    new Date().getMonth()
                                  }
                                  onPress={() => {
                                    setBookingDate(bookingDate.minusMonths());
                                    setBookingTime('');
                                    setMonth(bookingDate.getMonth());
                                  }}
                                >
                                  <View
                                    style={{
                                      height: 20,
                                      width: 50,
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        color: '#DDDDDD',
                                        marginTop: -2,
                                      }}
                                    >
                                      {'<'}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: '#DDDDDD',
                                    marginBottom: 10,
                                  }}
                                >
                                  {months[month]}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    setBookingDate(bookingDate.addMonths());
                                    setBookingTime('');
                                    setMonth(bookingDate.getMonth());
                                  }}
                                >
                                  <View
                                    style={{
                                      height: 20,
                                      width: 50,
                                      alignItems: 'center',
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        color: '#DDDDDD',
                                        marginTop: -2,
                                      }}
                                    >
                                      {'>'}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </View>

                              <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                              >
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    // paddingHorizontal: 12,
                                  }}
                                >
                                  {Array.from(
                                    Array(
                                      month === new Date().getMonth()
                                        ? bookingDate.getDaysInMonth() -
                                            bookingDate.getDate() +
                                            1
                                        : bookingDate.getDaysInMonth()
                                    ).keys()
                                  ).map((key, index) => {
                                    return (
                                      <TouchableOpacity
                                        key={key}
                                        disabled={
                                          !item.facilitySchedule[
                                            checkSchedule(key)
                                          ]
                                        }
                                        onPress={() => {
                                          setBookingTime('');
                                          setChooseDate(calcDate(key));
                                          checkSchedule(key);
                                          // const checkDay = new Date(`${month + 1}/${calcDate(key)}/${new Date().getFullYear()}`).getDay()
                                          setNewData({
                                            ...newData,
                                            [item.facilityName]: [
                                              checkSchedule(key),
                                              item.facilitySchedule[
                                                checkSchedule(key)
                                              ],
                                            ],
                                          });
                                          setDataDoctor({
                                            ...dataDoctor,
                                            healthFacility: {
                                              facilityID:
                                                dataDoctor.facility[
                                                  indexFacility
                                                ].facilityID,
                                              facilityName:
                                                dataDoctor.facility[
                                                  indexFacility
                                                ].facilityName,
                                              facilityType:
                                                dataDoctor.facility[
                                                  indexFacility
                                                ].facilityType,
                                              facilityMainType:
                                                dataDoctor.facility[
                                                  indexFacility
                                                ].facilityMainType,
                                            },
                                          });
                                        }}
                                      >
                                        <View
                                          style={{
                                            marginTop: 10,
                                            marginRight: 10,
                                            height: 75,
                                            width: 55,
                                            borderRadius: 12,
                                            backgroundColor:
                                              chooseDate === calcDate(key)
                                                ? '#005EA2'
                                                : '#3F3F3F',
                                          }}
                                        >
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              marginVertical: 10,
                                              textAlign: 'center',
                                              color: item.facilitySchedule[
                                                checkSchedule(key)
                                              ]
                                                ? '#DDDDDD'
                                                : '#727272',
                                            }}
                                          >
                                            {
                                              day[
                                                new Date(
                                                  `${month + 1}/${calcDate(
                                                    key
                                                  )}/${bookingDate.getFullYear()}`
                                                ).getDay()
                                              ]
                                            }
                                          </Text>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              marginBottom: 15,
                                              textAlign: 'center',
                                              color: item.facilitySchedule[
                                                checkSchedule(key)
                                              ]
                                                ? '#DDDDDD'
                                                : '#727272',
                                            }}
                                          >
                                            {calcDate(key)}
                                          </Text>
                                        </View>
                                      </TouchableOpacity>
                                    );
                                  })}
                                </View>
                              </ScrollView>
                            </View>
                            <View style={{ marginVertical: 15 }}>
                              {newData !== null &&
                              newData[item.facilityName] !== null &&
                              newData[item.facilityName][1] ? (
                                <ScrollView
                                  horizontal
                                  showsHorizontalScrollIndicator={false}
                                >
                                  {newData[item.facilityName][1].map(
                                    (time, fIndex) => {
                                      return (
                                        <TouchableOpacity
                                          key={fIndex}
                                          onPress={() => {
                                            setBookingTime(time);
                                            setDataDoctor({
                                              ...dataDoctor,
                                              bookingTime: time,
                                              bookingSchedule: `${bookingDate.getFullYear()}-${
                                                bookingDate.getMonth() + 1
                                              }-${chooseDate}`,
                                            });
                                          }}
                                        >
                                          <View
                                            style={{
                                              height: 40,
                                              width: 120,
                                              marginRight: 10,
                                              borderRadius: 5,
                                              backgroundColor:
                                                bookingTime === time
                                                  ? '#005EA2'
                                                  : '#3F3F3F',
                                            }}
                                          >
                                            <Text
                                              style={{
                                                color: '#DDDDDD',
                                                textAlign: 'center',
                                                marginTop: 10,
                                              }}
                                            >
                                              {time}
                                            </Text>
                                          </View>
                                        </TouchableOpacity>
                                      );
                                    }
                                  )}
                                </ScrollView>
                              ) : null}
                            </View>
                            {/* <Text style={{ color: '#DDDDDD' }}>
                              Lihat Semua Jadwal {'>'}
                            </Text> */}
                          </View>
                        ) : null}
                      </View>
                    );
                  })}
                </View>
              )}
            </ScrollView>
          </View>

          <TouchableOpacity
            onPress={async () => {
              // console.log(dataDoctor, 'iniloh');
              buatJanji();
            }}
          >
            <View
              style={{
                height: 50,
                backgroundColor: '#005EA2',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                margin: 10,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginTop: 2 }}>
                  <BuatJanji />
                </View>
                <Text style={{ color: '#FFF', fontSize: 16, marginLeft: 10 }}>
                  Buat Janji
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  borderAvatar: {
    borderRadius: 70,
    borderColor: '#5FFCA5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginLeft: -30,
    width: 70,
    height: 70,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  imageIcon: {
    backgroundColor: '#2DE34C',
    borderColor: '#55C968',
    borderRadius: 3,
    alignItems: 'center',
    marginVertical: 10,
  },
  imageRS: {
    borderRadius: 5,
    height: 60,
    width: 60,
  },

  name: {
    fontSize: 22,
    color: 'gray',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  body: {
    marginTop: 0,
  },

  info: {
    fontSize: 16,
    color: '#52de97',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    // color: "#696969",
    marginTop: 10,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    // backgroundColor: "#00BFFF",
  },
  cardContainer: {
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 20,
    minHeight: dimHeight * 0.1,
    minWidth: dimWidth * 0.95,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#52de97',
  },
});

const containerStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1F1F1F',
  },
  bodyContent: {
    flex: 1,
    marginHorizontal: 15,
    // borderBottomWidth: 1,
    borderRadius: 5,
  },
  dataDoctor: {
    flexDirection: 'row',
  },
  spesialis: {
    marginTop: -15,
    marginLeft: -10,
    flex: 2,
    alignItems: 'center',
  },
  personalData: {
    flex: 4,
    marginLeft: -40,
    marginTop: 10,
  },
  medFacility: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detMedfac: {
    flex: 1,
    marginRight: 10,
    flexDirection: 'row',
    marginVertical: 10,
  },
  detRS: {
    flex: 4,
    paddingHorizontal: 10,
  },
  maps: {
    flex: 1,
    alignItems: 'center',
  },
});

const fontStyles = StyleSheet.create({
  textIcon: {
    color: '#FFF',
    fontSize: 14,
    padding: 10,
    fontWeight: 'bold',
  },
  poli: {
    fontSize: 14,
    color: '#B2B2B2',
    textAlign: 'center',
  },
  name: {
    fontSize: 14,
    color: '#DDDDDD',
  },
  titleSp: {
    fontSize: 12,
    color: '#B2B2B2',
    marginBottom: 7,
  },
  price: {
    fontSize: 14,
    color: '#B2B2B2',
    fontWeight: 'bold',
    marginTop: 7,
  },
  headerNameStyle: {
    fontSize: 16,
    color: '#5E5A5A',
    fontWeight: 'bold',
    marginTop: 10,
  },
  contain: {
    fontSize: 14,
    color: '#5E5A5A',
    marginVertical: 10,
    marginRight: 20,
    textAlign: 'justify',
  },
  other: {
    fontSize: 14,
    color: '#33E204',
    textDecorationLine: 'underline',
    marginTop: 10,
    marginRight: 20,
  },
  address: {
    fontSize: 13,
    color: '#A5A5A5',
  },
  aktif: {
    color: 'red',
  },
  nonAktif: {
    color: 'blue',
  },
});

const dateStyle = StyleSheet.create({
  chooseMonth: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 7,
  },
  cardDate: {
    marginTop: 10,
    marginRight: 10,
    height: 75,
    width: 55,
    borderRadius: 12,
    backgroundColor: '#3F3F3F',
  },
});

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = {
  addDoctorFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctorPage);
