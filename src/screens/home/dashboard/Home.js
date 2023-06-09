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
  Alert,
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import {
  setLoading,
  getDrugs,
  getReminders,
  setShowInstruction,
  getLoggedData,
} from '../../../stores/action';
import { FontAwesome } from '@expo/vector-icons';
import MenuNavigator from '../../../components/home/dashboard/menu-navigator';
import RecentActivity from '../../../components/home/dashboard/recent-activity';
import CardPromo from '../../../components/home/dashboard/card-promo';
import SearchBar from '../../../components/headers/SearchBar';

import keys from '../../../stores/keys';

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
  const dispatch = useDispatch();
  const { SET_USER_LOCATION } = keys.userLocationKeys;
  const { userData, isLoading, error } = props.userDataReducer;
  const { userLocation } = props.userLocationReducer;
  const { showInstruction } = props.showInstructionReducer;
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
    getLoggedData();
  }, []);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  async function requestLocationPermission() {
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
      if (userData) {
        lat = userData.location.coordinates[1];
        lng = userData.location.coordinates[0];
      }
      console.log('Error :', error.message);
    } finally {
      dispatch({
        type: SET_USER_LOCATION,
        payload: {
          lat,
          lng,
        },
      });
    }
  }

  async function getLoggedData() {
    try {
      await props.getLoggedData(props.navigation);
    } catch (error) {
    } finally {
      setload(false);
    }
  }

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

    if (!userData) {
      return;
    }

    const { firebaseNotificationToken, _id: userID } = userData.userID;
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
  }, [registerToken, userData]);

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
      {isLoading ? (
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
                    paddingBottom: 2,
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
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {userData && (
                        <TouchableOpacity
                          style={{ marginTop: 1 }}
                          onPress={() => {
                            props.navigation.navigate('NotificationStack');
                          }}
                        >
                          {userData.countNotification ? (
                            <NewNotificationBell />
                          ) : (
                            <NoNotificationBell />
                          )}
                        </TouchableOpacity>
                      )}
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        userData
                          ? props.navigation.navigate('ProfileStack')
                          : props.navigation.navigate('SignIn');
                      }}
                    >
                      <View style={{ marginLeft: 10 }}>
                        {userData?.imageUrl ? (
                          <Image
                            style={style.profilePicture}
                            source={{
                              uri: userData.imageUrl,
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
              <MenuNavigator navigation={props.navigation} data={userData} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {userData && (
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
                <ActivityAction navigation={props.navigation} data={userData} />
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
        visible={showInstruction}
        onFinishOrSkip={() => {
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
  getDrugs,
  getReminders,
  setShowInstruction,
  getLoggedData,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
