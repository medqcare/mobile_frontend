import React, { Component, useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import formatRP from '../../../helpers/rupiah';

import {
  addFavoriteDoctor,
  removeFavoriteDoctor,
} from '../../../stores/action';
import LottieLoader from 'lottie-react-native';
import ArrowDown from '../../../assets/svg/ArrowDown';
import ArrowUp from '../../../assets/svg/ArrowUp';
import ButtonMap from '../../../assets/svg/buttonMap';
import Money from '../../../assets/svg/Money';
import BuatJanji from '../../../assets/svg/BuatJanji';
import ArrowBack from '../../../assets/svg/ArrowBack';

import getDistanceFromLatLonInKm from '../../../helpers/latlongToKM';
import { checkDisabled } from '../../../helpers/disabledScheduleTime';
import openMap from '../../../helpers/openMap';
import {
  BLACK_THIRD,
  BLUE_PRIMARY,
  WHITE_PRIMARY,
} from '../../../values/color';

const dimHeight = Dimensions.get('screen').height;
const dimWidth = Dimensions.get('screen').width;

function DetailDoctorPage(props) {
  const { userData, isLoading, error } = props.userDataReducer;
  const calendarRef = useRef(null);
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

  const { data: doctorDetail, back, distance } = props.navigation.state.params;
  const {
    photo,
    title,
    doctorName,
    specialist,
    estPrice,
    facilities,
    schedules,
    _id,
    nik,
    gender,
    address,
    phoneNumber,
    dokterIdWeb,
  } = doctorDetail;
  const _data = props.navigation.getParam('data');
  const _idHostpital = props.navigation.getParam('idHos');
  const _back = props.navigation.getParam('back');

  const [showLoading, setLoading] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showAddress, setShowAddress] = useState(true);
  const [aktif, setaktif] = useState('');
  const [dataDoctor, setDataDoctor] = useState({
    specialist,
    _id,
    title,
    doctorName,
    nik,
    gender,
    address,
    phoneNumber,
    photo,
    dokterIdWeb,
    estPrice,
  });
  const [jadwalPerhari, setjadwalPerhari] = useState([]);

  const [aktifDay, setAktifDay] = useState(null);
  const [aktifHospital, setAktifHospital] = useState(null);
  const [newData, setNewData] = useState(null);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [bookingSchedule, setBookingSchedule] = useState(new Date());
  const [currentSchedules, setCurrentSchedules] = useState(null);
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
    console.log(Math.min(n, this.getDaysInMonth()), 'hello bro');
    console.log(this, 'after add');
    return this;
  };

  Date.prototype.minusMonths = function () {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() - 1);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    console.log(Math.min(n, this.getDaysInMonth()), 'hello bro');
    console.log(this, 'after minus');
    return this;
  };

  useEffect(() => {
    setChooseDate(bookingSchedule.getDate());
    // setCurrentSchedules()
  }, []);

  useEffect(() => {
    !chooseDate ? setNewData(null) : null;
    setBookingTime('');
  }, [chooseDate]);

  useEffect(() => {
    getJadwalPerhari();
    about();
  }, [facility]);

  useEffect(() => {
    findFavorite();
  }, [userData]);

  const findFavorite = () => {
    // console.log(userData)
    if (userData && dataDoctor) {
      // console.log(userData.doctorFavorites.length, '+++++++++')
      if (userData.doctorFavorites.length > 0) {
        userData.doctorFavorites.find(function (value, index) {
          // console.log(index, '=', value)
          if (value._id == dataDoctor._id) {
            setThisFavorite(true);
          }
        });
      } else {
        setThisFavorite(false);
        console.log('Tidak ada doktor favorit');
      }
    }
  };

  const changeTapLove = async () => {
    const changedStatus = !thisFavorite;
    const patientID = userData._id;
    if (!thisFavorite) {
      await props.addFavoriteDoctor(
        patientID,
        dataDoctor,
        changedStatus,
        setThisFavorite
      );
    } else {
      const doctorID = dataDoctor._id;
      await props.removeFavoriteDoctor(
        patientID,
        doctorID,
        changedStatus,
        setThisFavorite
      );
    }
  };

  const buatJanji = async () => {
    if (bookingTime === '') {
      ToastAndroid.show('Silahkan pilih tanggal janji', ToastAndroid.LONG);
    } else {
      userData
        ? props.navigation.push('BuatJanji', { doctorData: dataDoctor })
        : (props.navigation.navigate('DetailDoctor'),
          props.navigation.navigate('Sign'));
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
    if (facility !== null && facility.facilityAddress !== null) {
      if (facility.facilityAddress.length > 50) {
        setShowAddress(false);
      }
    }
  };

  const calcDate = (key) => {
    const isCurrentMonth = month === new Date().getMonth();
    const currentMonthResult = bookingDate.getDate() + key;
    const nextMonthResult = key + 1;

    if (isCurrentMonth) return currentMonthResult;
    else return nextMonthResult;
  };

  const checkSchedule = (key) => {
    const Month = month + 1;
    const date = calcDate(key);
    const year = bookingDate.getFullYear();

    const newDate = new Date(`${Month}/${date}/${year}`);
    const result = newDate.getDay().toString();

    return result;
  };

  const isNextMonthDisabled = () => {
    const dateNow = new Date();
    const yearNow = dateNow.getFullYear();
    const yearBooking = bookingDate.getFullYear();

    if (yearNow === yearBooking) {
      return dateNow.getMonth() + 1 === bookingDate.getMonth();
    } else {
      return yearBooking.getMonth() === 0;
    }
  };

  const getBackgroundColorDateContainer = (date) => {
    if (chooseDate == date) {
      return BLUE_PRIMARY;
    }

    return BLACK_THIRD;
  };

  return (
    <View style={containerStyle.container}>
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
            <TouchableOpacity onPress={() => props.navigation.navigate(back)}>
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
            {userData && (
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
                      uri: photo
                        ? photo
                        : 'https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg',
                    }}
                  />
                </View>
              </View>
              <View style={containerStyle.personalData}>
                <Text style={fontStyles.name}>
                  {title} {doctorName}
                </Text>
                <Text style={fontStyles.titleSp}>Spesialis {specialist}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}
                />
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
                    {' '}
                    {formatRP(estPrice || 0, 'Rp')}{' '}
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
            <Text style={{ color: '#DDDDDD', marginLeft: 15, marginBottom: 5 }}>
              Lokasi {'&'} Jadwal Praktik
            </Text>
          </View>
          <ScrollView>
            {facilities.map((facility, facilityIndex) => {
              const {
                facilityPhoto,
                facilityName,
                googleAddress,
                location,
                clinicIdWeb,
                _id,
                facilityType,
                facilityClass,
                facilityMainType,
              } = facility;
              const [lon, lat] = location.coordinates;
              const filteredSchedules = schedules.filter(
                (schedule) => schedule.clinicIDWeb === clinicIdWeb
              );
              const sortedSchedules = filteredSchedules.sort((a, b) => {
                return a.scheduleTime > b.scheduleTime;
              });
              const distanceUser = () => {
                const { lat: latUser, lng: lngUser } = props.myLocation;
                return getDistanceFromLatLonInKm(
                  lat,
                  lon,
                  latUser,
                  lngUser
                ).toFixed(1);
              };
              return (
                <View
                  key={facilityIndex}
                  style={{
                    backgroundColor: '#2F2F2F',
                    marginVertical: 5,
                    paddingLeft: 10,
                    paddingVertical: 10,
                    paddingRight: 10,
                    borderRadius: 5,
                    marginHorizontal: 15,
                  }}
                >
                  <View>
                    <View style={containerStyle.detMedfac}>
                      <Image
                        source={
                          facilityPhoto
                            ? { uri: facilityPhoto }
                            : require('../../../assets/png/klinik.png')
                        }
                        style={styles.imageRS}
                      />
                      <View style={containerStyle.detRS}>
                        <Text style={fontStyles.name}>{facilityName}</Text>
                        <Text style={fontStyles.address}>{googleAddress}</Text>
                        {props.myLocation && (
                          <Text style={fontStyles.address}>
                            <Text style={{ textTransform: 'capitalize' }}>
                              {distance ? distance : distanceUser() + ' Km'}
                            </Text>{' '}
                            dari anda
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity
                        style={{
                          alignSelf: 'flex-start',
                          alignSelf: 'center',
                        }}
                        onPress={() => openMap(lat, lon)}
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
                    </View>
                    {showDetail !== facilityIndex ? (
                      <TouchableOpacity
                        onPress={() => {
                          setShowDetail(facilityIndex);
                          setDataDoctor({
                            ...dataDoctor,
                            healthFacility: {
                              facilityID: _id,
                              facilityName,
                              facilityType,
                              facilityMainType,
                              clinicIdWeb,
                            },
                          });
                          const schedules = filteredSchedules.filter(
                            ({ scheduleDay }) =>
                              scheduleDay === bookingDate.getDay()
                          );

                          if (schedules.length === 0) {
                            setChooseDate(null)
                          }

                          setCurrentSchedules(schedules);
                        }}
                      >
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ color: '#F37335' }}>Pilih Jadwal</Text>
                          <View style={{ marginLeft: 8, marginTop: 5 }}>
                            <ArrowDown />
                          </View>
                        </View>
                      </TouchableOpacity>
                    ) : (
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
                                bookingDate.getMonth() === new Date().getMonth()
                              }
                              onPress={() => {
                                bookingSchedule.setMonth(
                                  bookingSchedule.getMonth() - 1
                                );
                                setCurrentSchedules(null);

                                setBookingDate(bookingDate.minusMonths());
                                setBookingTime('');
                                setMonth(bookingDate.getMonth());
                                setChooseDate(null);
                                calendarRef.current.scrollTo({
                                  x: 0,
                                  y: 0,
                                  animated: true,
                                });
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
                                    color:
                                      bookingDate.getMonth() ===
                                      new Date().getMonth()
                                        ? '#2F2F2F'
                                        : '#DDDFDD',
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
                              disabled={isNextMonthDisabled()}
                              onPress={() => {
                                bookingSchedule.setMonth(
                                  bookingSchedule.getMonth() + 1
                                );
                                setCurrentSchedules(null);

                                setChooseDate(null);
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
                                    color: isNextMonthDisabled()
                                      ? '#2f2f2f'
                                      : '#DDDDDD',
                                    marginTop: -2,
                                  }}
                                >
                                  {'>'}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>

                        {/* Calendar */}
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          ref={calendarRef}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
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
                              const numberDay = new Date(
                                `${month + 1}/${calcDate(
                                  key
                                )}/${bookingDate.getFullYear()}`
                              ).getDay();
                              const displayDay = day[numberDay];
                              const availableSchedules =
                                filteredSchedules.filter((el) => {
                                  const date = new Date();
                                  date.setMonth(bookingSchedule.getMonth());
                                  date.setDate(calcDate(key));
                                  return el.scheduleDay === date.getDay();
                                });
                              return (
                                <TouchableOpacity
                                  key={key}
                                  disabled={availableSchedules.length === 0}
                                  onPress={() => {
                                    bookingSchedule.setDate(calcDate(key));
                                    setCurrentSchedules(availableSchedules);
                                    setBookingTime('');
                                    setChooseDate(calcDate(key));
                                    checkSchedule(key);
                                    setDataDoctor({
                                      ...dataDoctor,
                                      healthFacility: {
                                        facilityID: _id,
                                        facilityName,
                                        facilityType,
                                        facilityMainType,
                                        clinicIdWeb,
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
                                        getBackgroundColorDateContainer(
                                          calcDate(key)
                                        ),
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        marginVertical: 10,
                                        textAlign: 'center',
                                        color:
                                          availableSchedules.length > 0
                                            ? WHITE_PRIMARY
                                            : '#727272',
                                      }}
                                    >
                                      {displayDay}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        marginBottom: 15,
                                        textAlign: 'center',
                                        color:
                                          availableSchedules.length > 0
                                            ? WHITE_PRIMARY
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

                        <View style={{ marginVertical: 15 }}>
                          <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                          >
                            {currentSchedules &&
                              currentSchedules.map((el, scheduleIndex) => {
                                const {
                                  status,
                                  limit,
                                  scheduleDay,
                                  scheduleTime,
                                  doctorID,
                                  clinicIDWeb,
                                } = el;
                                const selectedDay = bookingSchedule.getDay();
                                const disabled = checkDisabled(
                                  el,
                                  bookingSchedule
                                );
                                return (
                                  <View key={scheduleIndex}>
                                    <TouchableOpacity
                                      disabled={disabled}
                                      onPress={() => {
                                        const year =
                                          bookingSchedule.getFullYear();
                                        const Month =
                                          bookingSchedule.getMonth() + 1;
                                        const date = bookingSchedule.getDate();
                                        setBookingTime(scheduleTime);
                                        setDataDoctor({
                                          ...dataDoctor,
                                          bookingTime: scheduleTime,
                                          bookingSchedule: `${year}-${Month}-${date}`,
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
                                            bookingTime === scheduleTime
                                              ? '#005EA2'
                                              : '#3F3F3F',
                                        }}
                                      >
                                        <Text
                                          style={{
                                            color: !disabled
                                              ? '#DDDDDD'
                                              : '#727272',
                                            textAlign: 'center',
                                            marginTop: 10,
                                          }}
                                        >
                                          {scheduleTime}
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                );
                              })}
                          </ScrollView>
                        </View>

                        <TouchableOpacity onPress={() => setShowDetail(null)}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#F37335' }}>Tutup</Text>
                            <View style={{ marginLeft: 8, marginTop: 5 }}>
                              <ArrowUp />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Make Reservation Button */}
        <TouchableOpacity
          onPress={async () => {
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
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
  addFavoriteDoctor,
  removeFavoriteDoctor,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctorPage);
