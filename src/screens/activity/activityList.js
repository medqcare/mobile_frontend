import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  ActivityIndicator,
  ScrollView,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/headers/GradientHeader';
import Activity from './activity';
import LottieLoader from 'lottie-react-native';

//action
import {
  getTodayRegistration,
  getCurrentQueueingNumber,
} from '../../stores/action';

const activityList = (props) => {
  const [dateRef, setDateRef] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [registrationData, setRegistrationData] = useState(null);

  useEffect(() => {
    fetchdata();
  }, [props.navigation.state.params, dateRef]);

  async function fetchdata() {
    try {
      await props
        .getTodayRegistration(props.userData.userID._id)
        .then(({ data }) => {
          setRefresh(false);
          setRegistrationData(data);
          if (!dateRef) {
            setDateRef(new Date());
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    props.navigation.navigate('Home');
    return true;
  });

  // if (refresh) {
  //   return (
  //     <View style={styles.container}>
  //       <Header title={'Antrian'} navigate={props.navigation.navigate} />

  // <LottieLoader
  //   source={require('../animation/loading.json')}
  //   loop
  //   autoPlay
  // />
  //     </View>
  //   );
  // }

  return (
    <>
      <Header title={'Antrian'} navigate={props.navigation.navigate} />
      <View style={styles.container}>
        {refresh ? (
          <LottieLoader
            source={require('../animation/loading.json')}
            loop
            autoPlay
          />
        ) : (
          <View>
            <>
              {!props.todayActivity?.length && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 25,
                  }}
                >
                  <Text style={{ color: '#fff' }}>
                    Tidak ada daftar antrian
                  </Text>
                </View>
              )}
              {props.todayActivity && (
                <FlatList
                  data={props.todayActivity}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item: el }) => {
                    return (
                      <Activity
                        flag={true}
                        bookingID={el.bookingCode}
                        reservationID={el.reservationID}
                        queueId={JSON.stringify(el.queueID)}
                        data={el}
                        navigation={props.navigation}
                      />
                    );
                  }}
                  keyExtractor={(item) => item._id}
                />
              )}
            </>
          </View>
        )}
      </View>
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  getTodayRegistration,
  getCurrentQueueingNumber,
};
export default connect(mapStateToProps, mapDispatchToProps)(activityList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    padding: 14,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 20,
    paddingTop: StatusBar.currentHeight + 20,
    backgroundColor: 'teal',
    color: '#fff',
  },
  activityCard: {
    flexDirection: 'row',
    width: '95%',
    minHeight: 100,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 3,
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  leftActivityCard: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'limegreen',
    borderRadius: 3,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 9,
    padding: 10,
    width: '25%',
  },
  rightActivityCard: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '75%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 3,
  },
});
