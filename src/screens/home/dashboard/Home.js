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
  TextInput,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import GetLocation from 'react-native-get-location';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import {
  setCurrentLocation,
  changeLogin,
  GetUser,
  setLoading,
  getDrugs,
  getReminders,
} from '../../../stores/action';
import MenuNavigator from '../../../components/home/dashboard/menu-navigator';
import RecentActivity from '../../../components/home/dashboard/recent-activity';
import CardPromo from '../../../components/home/dashboard/card-promo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../../../components/headers/SearchBar';

import Lonceng from '../../../assets/svg/home-blue/lonceng';
import LottieLoader from 'lottie-react-native';
import notificationTrigger from '../../../helpers/notificationTrigger';
import ActivityAction from '../../../components/home/dashboard/activity-action';
import { getSelectedDate } from '../../../helpers/todaysDate';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
// import PushNotification from 'react-native-push-notification';

const dimHeight = Dimensions.get('window').height;

function HomePage(props) {
  const [myLocation, setMyLocation] = useState(null);
  const [location, setLocation] = useState(null);
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMyLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.setCurrentLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    notificationTrigger();
  }, []);

  useEffect(() => {
    (async () => {
      const tokenString = await AsyncStorage.getItem('token');
      if (!tokenString) {
        setload(false);
        return;
      }

      const { token } = JSON.parse(tokenString);
      try {
        await props.GetUser(token, props.navigation);
      } catch (error) {
      } finally {
        setload(false);
      }
    })();
  }, []);

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
                  {props.userData && (
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity 
                        style={{ marginTop: 1 }}
                        onPress={() => props.navigation.navigate('NotificationStack')}
                      >
                        <Lonceng />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('ProfileStack');
                        }}
                      >
                        <View style={{ marginLeft: 10 }}>
                          <Image
                            style={style.profilePicture}
                            source={{
                              uri: props.userData?.imageUrl
                                ? `${props.userData?.imageUrl}?time=${new Date()}`
                                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRH_WRg1exMTZ0RdW3Rs76kCOb9ZKrXddtQL__kEBbrS2lRWL3r',
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
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
    height: hp('75%'),
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
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
