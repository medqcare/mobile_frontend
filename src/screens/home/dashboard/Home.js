import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import {
  setCurrentLocation,
  changeLogin,
  GetUser,
  setLoading,
  getDrugs,
  getReminders,
  setShowInstruction,
} from '../../../stores/action';
import { FontAwesome } from '@expo/vector-icons';
import MenuNavigator from '../../../components/home/dashboard/menu-navigator';
import RecentActivity from '../../../components/home/dashboard/recent-activity';
import CardPromo from '../../../components/home/dashboard/card-promo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../../../components/headers/SearchBar';

import NewNotificationBell from '../../../assets/svg/home-blue/lonceng';
import NoNotificationBell from '../../../assets/svg/NoNotificationBell';
import LottieLoader from 'lottie-react-native';
import ActivityAction from '../../../components/home/dashboard/activity-action';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import NotifService from '../../../../NotificationService';
import InstructionModal from '../../../components/InstructionModal';
import _checkLogin from '../../../helpers/getToken';
import getToken from '../../../helpers/localStorage/token';
import axios from 'axios';
import { baseURL } from '../../../config';

const dimHeight = Dimensions.get('window').height;
function HomePage(props) {
  const [myLocation, setMyLocation] = useState(null);
  const [load, setload] = useState(true);
  const [promos, setPromos] = useState([
    {
      id: 1,
      url: require('../../../assets/png/Promo1.png'),
    },
    {
      id: 2,
      url: require('../../../assets/png/Promo2.png'),
    },
  ]);
  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegistered, setFcmRegistered] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('permission failed');
        }

        let location = await Location.getCurrentPositionAsync({});
        props.setCurrentLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      } catch (error) {
        console.log('Error Get Location', error.message);
      }
    })();
  }, []);

  useEffect(async () => {
    try {
      const tokenString = await AsyncStorage.getItem('token');
      if (!tokenString) {
        setload(false);
        return;
      }
      const { token } = JSON.parse(tokenString);
      await props.GetUser(token, props.navigation);
    } catch (error) {
    } finally {
      setload(false);
    }
  }, []);

  useEffect(() => {

    if (!props.userData) {
      return
    }

    (async () => {
      let lat = null;
      let lng = null;
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('permission failed');
        }

        let location = await Location.getCurrentPositionAsync({});
        lat = location.coords.latitude;
        lng = location.coords.longitude;
      } catch (error) {
        lat = props.userData.location.coordinates[1];
        lng = props.userData.location.coordinates[0];
        console.log('Error :', error.message);
      } finally {
        setMyLocation({
          lat,
          lng,
        });
        props.setCurrentLocation({
          lat,
          lng,
        });
      }
    })();
  }, [props.userData]);

  useEffect(async () => {
    // Update firebase token to database

    if (!registerToken) {
      return;
    }

    const token = await getToken();
    const isLogin = !!token;

    if (isLogin == false) {
      return;
    }

    if (!props.userData) {
      return;
    }

    const { firebaseNotificationToken, _id: userID } = props.userData.userID;
    if (firebaseNotificationToken === registerToken) {
      return;
    }

    try {
      const { data: response } = await axios({
        url: `${baseURL}/api/v1/members/firebase/token`,
        method: 'PATCH',
        headers: {
          Authorization: token,
        },
        data: {
          token: registerToken,
          userID,
        },
      });
    } catch (error) {
      console.log(error.message, 'error update token');
    }
  }, [registerToken, props.userData]);

  const onRegister = (token) => {
    setRegisterToken(token.token);
    setFcmRegistered(true);
  };

  const notif = new NotifService(onRegister);

  BackHandler.addEventListener('hardwareBackPress', () => {
    BackHandler.exitApp();
    return true;
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1F1F1F',
      }}
    >
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={'transparent'}
      />
      {load ? (
        <LottieLoader
          source={require('../../animation/loading.json')}
          autoPlay
          loop
        />
      ) : (
        <>
          <View style={style.topMenu}>
            <ImageBackground
              imageStyle={{
                height: hp('25%'),
                width: '100%',
                resizeMode: 'stretch',
              }}
              source={require('../../../assets/background/RectangleHeader.png')}
              style={style.headerImage}
            >
              <View
                style={{
                  marginHorizontal: 20,
                  justifyContent: 'center',
                  transform: [{ translateY: hp('5.8%') }],
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 2
                  }}
                >
                  <Image
                    style={{
                      height: dimHeight * 0.035,
                      width: dimHeight * 0.18,
                      resizeMode: 'stretch',
                    }}
                    source={require('../../../assets/png/MedQCareLogo.png')}
                  />
                  {/* {props.userData && ( */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {props.userData && (
                      <TouchableOpacity
                        style={{ marginTop: 1 }}
                        onPress={() => {
                          props.navigation.navigate('NotificationStack');
                        }}
                      >
                        {null ? (
                          <NewNotificationBell />
                        ) : (
                          <NoNotificationBell />
                        )}
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      onPress={() => {
                        props.userData ? props.navigation.navigate('ProfileStack') : props.navigation.navigate('SignIn')
                      }}
                    >
                      <View style={{ marginLeft: 10 }}>
                        {props.userData?.imageUrl ? (
                          <Image
                            style={style.profilePicture}
                            source={{
                              uri: props.userData.imageUrl
                            }}
                          />
                        ) : (
                          <FontAwesome
                            name="user-circle"
                            size={23}
                            color="white"
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* )} */}
                </View>
                <SearchBar
                  placeholder={'cari dokter atau spesialis'}
                  onFocus={() =>
                    props.navigation.navigate('Doctor', {
                      query: 'SearchFromHome',
                    })
                  }
                />
              </View>
            </ImageBackground>
          </View>

          <View style={style.container}>
            <View style={{ marginBottom: hp('2%') }}>
              <MenuNavigator
                navigation={props.navigation}
                data={props.userData}
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {props.userData && (
                <View style={{ marginBottom: hp('4%') }}>
                  <Text
                    style={[
                      style.tagTitle,
                      { color: '#DDDDDD', marginBottom: 12 },
                    ]}
                  >
                    Aktifitas
                  </Text>
                  <View>
                    <RecentActivity navigation={props.navigation} />
                  </View>
                </View>
              )}
              <View style={{ marginBottom: hp('4%') }}>
                <ActivityAction
                  navigation={props.navigation}
                  data={props.userData}
                />
              </View>
              <View style={{ marginBottom: hp('2%') }}>
                <FlatList
                  data={promos}
                  keyExtractor={(item) => item.id + ''}
                  renderItem={({ item }) => <CardPromo data={item} />}
                  horizontal={true}
                  style={style.promos}
                />
              </View>
            </ScrollView>
          </View>
        </>
      )}
      <InstructionModal
        visible={props.showInstruction}
        onFinishOrSkip={() => {
          // setModalInstruction(false);
          props.setShowInstruction(false);
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  topMenu: {
    height: hp(25),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  container: {
    flexDirection: 'column',
    marginHorizontal: 16,
    transform: [{ translateY: -hp('5.5%') }],
    height: hp('85%'),
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  tagTitle: {
    color: 'white',
    fontSize: 14,
  },
  promos: {
    minHeight: 40,
  },
  articles: {
    minHeight: 100,
    marginVertical: 50,
  },
  userImage: {
    width: 50,
    height: 50,
    position: 'absolute',
    zIndex: 1,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    right: 25,
    top: 25,
  },
  profilePicture: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: Dimensions.get('window').width * 0.075,
    height: Dimensions.get('window').width * 0.075,
  },
  greeting: {
    position: 'absolute',
    color: 'white',
    top: '35%',
    left: '7%',
    textTransform: 'capitalize',
    fontSize: 19,
    fontWeight: 'bold',
  },
  medCheck: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderBottomEndRadius: 12,
    position: 'absolute',
    backgroundColor: '#1ed09d',
    top: '72%',
    left: '80%',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seeall: {
    fontSize: 14,
    fontWeight: '700',
    color: '#004DCF',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
  },
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  setLoading,
  setCurrentLocation,
  changeLogin,
  GetUser,
  getDrugs,
  getReminders,
  setShowInstruction,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
