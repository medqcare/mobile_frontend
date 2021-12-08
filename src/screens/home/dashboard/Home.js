import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import GetLocation from 'react-native-get-location';
import {LinearGradient} from 'expo-linear-gradient';
import {
  setCurrentLocation,
  changeLogin,
  GetUser,
  setLoading,
} from '../../../stores/action';
import MenuNavigator from '../../../components/home/dashboard/menu-navigator';
import RecentActivity from '../../../components/home/dashboard/recent-activity';
import CardPromo from '../../../components/home/dashboard/card-promo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Search from '../../../assets/svg/Search';
import SearchBar from '../../../components/headers/SearchBar'

import Lonceng from '../../../assets/svg/home-blue/lonceng';
import LottieLoader from 'lottie-react-native';
import notificationTrigger from '../../../helpers/notificationTrigger';
import ActivityAction from '../../../components/home/dashboard/activity-action';
// import PushNotification from 'react-native-push-notification';

// PushNotification.cancelAllLocalNotifications()
function HomePage(props) {
  const [myLocation, setMyLocation] = useState(null);
  const [load, setload] = useState(true);
  const [promos, setPromos] = useState([
    {
      id: 1,
      url:  require('../../../assets/png/Promo1.png'),
    },
    {
      id: 2,
      url: require('../../../assets/png/Promo2.png'),
    },
  ]);

  const _getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
    })
      .then(location => {
        setMyLocation({
          lng: location.longitude,
          lat: location.latitude,
        });
        setRefreshing(false);
      })
      .catch(err => {
        setRefreshing(false);
      });
  };

  const _checkLogin = () => {
    return new Promise(async (resolve, reject) => {
      let data = await AsyncStorage.getItem('token');
      resolve(data);
    });
  };

  useEffect(() => {
    notificationTrigger();
  }, []);

  useEffect(() => {
    _getLocation();
    _checkLogin()
      .then(async data => {
        try {
          if (data) {
            let x = await props.GetUser(
              JSON.parse(data).token,
              props.navigation,
              () => setModalW(true),
            );
            if (!myLocation) {
              setMyLocation({
                lat: x.location.coordinates[1],
                lng: x.location.coordinates[0],
              });
            }
            setload(false);
          } else {
            setload(false);
          }
        } catch (error) {
          setload(false);
        }
      })
      .catch(err => {
        setload(false);
      });
  }, []);

  useEffect(() => {
    props.setCurrentLocation(myLocation);
  }, [myLocation]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await _getLocation();
    _checkLogin()
      .then(async data => {
        try {
          if (data) {
            let x = await props.GetUser(
              JSON.parse(data).token,
              props.navigation,
            );
            setload(false);
          } else {
            setload(false);
          }
        } catch (error) {
          setload(false);
        }
      })
      .catch(err => (setload(false), console.log(err, 'ga ada yang login')));
  }, [refreshing]);

  return (
    <View style={{flex: 1, backgroundColor: '#1F1F1F'}}>
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
        <View style={{flex: 1}}>
          <View style={style.topMenu}>
            <ImageBackground
              imageStyle={{
                height: '100%',
                width: '100%',
                resizeMode: 'stretch',
              }}
              source={require('../../../assets/background/RectangleHeader.png')}
              style={style.headerImage}>
              <View style={{flex: 1, marginTop: 50, marginHorizontal: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    style={{
                      height: 20,
                      width: 105,
                      resizeMode: 'stretch',
                    }}
                    source={require('../../../assets/png/MedQCareLogo.png')}
                  />
                  {props.userData && (
                    <View style={{flexDirection: 'row'}}>
                      <View style={{marginTop: 1}}>
                        <Lonceng />
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('ProfileStack');
                        }}>
                        <View style={{marginLeft: 10}}>
                          <Image
                            style={style.profilePicture}
                            source={{ uri: props.userData?.imageUrl ? props.userData?.imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRH_WRg1exMTZ0RdW3Rs76kCOb9ZKrXddtQL__kEBbrS2lRWL3r' }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <SearchBar placeholder={"cari dokter atau spesialis"} onFocus={() =>  props.navigation.navigate("Doctor", {query: "SearchFromHome"})}/>
              </View>
            </ImageBackground>
          </View>

          <MenuNavigator navigation={props.navigation} data={props.userData}/>
          <View style={style.container}>
            {props.userData && (
              <View >
                <Text
                  style={[
                    style.tagTitle,
                    {color: '#DDDDDD'},
                  ]}>
                  Aktifitas
                </Text>
                <View style={{height: 180}}>
                <RecentActivity navigation={props.navigation} />
                </View>
              </View>
            )}
            <View style={{marginTop: !props.userData ? 70 : null}}>
              <ActivityAction navigation={props.navigation} data={props.userData}/>
            </View>
            <View>
              <FlatList
                data={promos}
                keyExtractor={item => item.id + ''}
                renderItem={({item}) => <CardPromo data={item} />}
                horizontal={true}
                style={style.promos}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
const style = StyleSheet.create({
  topMenu: {
    height: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  container: {
    // backgroundColor: '#121212',
    height: '70%',
    flexDirection: 'column',
    marginTop: '18%',
    marginHorizontal: '5%',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  advertisement: {
    marginTop: '5%',
  },
  tagTitle: {
    color: 'white',
    fontSize: 14,
  },
  promos: {
    minHeight: 40,
    marginVertical: 2,
    marginRight: 5,
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
  // profilePicture: { 
  //   borderRadius: 25 / 2,
  //   width: 25,
  //   height: 25,
  // },
  profilePicture: { 
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.05787037,
    height: Dimensions.get('window').width * 0.05787037,
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

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  setLoading,
  setCurrentLocation,
  changeLogin,
  GetUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
