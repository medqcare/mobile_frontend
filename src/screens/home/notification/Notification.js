// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import GradientHeader from '../../../components/headers/GradientHeader';
import EmptyNotificationLogo from '../../../assets/svg/EmptyNotificationLogo';
// import axios from 'axios';
// import { baseURL } from '../../../config';
import NotificationCard from '../../../components/home/NotificationCard';
import LottieLoader from 'lottie-react-native';
import { ActivityIndicator } from 'react-native-paper';
import { setUserData, getAllNotifications, patchNotificationAsViewed } from '../../../stores/action';

const dimension = Dimensions.get('window');
const dimHeight = dimension.height;
const dimWidth = dimension.width;

function Notification({ navigation, ...props }) {
  const { userData } = props.userDataReducer
  const { notifications: reducerNotifications, notificationsCount, isLoading, error } = props.notificationsReducer
  // const [notifications, setNotifications] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [loadingActionClose, setLoadingActionClose] = useState(false);

  useEffect(async () => {
    try {
      const parentID = userData.userID._id
      const patientID = userData._id
      await props.getAllNotifications(patientID, parentID)
      // setLoading(true);
      // const tokenString = await AsyncStorage.getItem('token');
      // const { token } = JSON.parse(tokenString);
      // const parentID = userData.userID._id;
      // const patientID = userData._id;
      // const { data } = await axios({
      //   url: `${baseURL}/api/v1/members/notifications/${patientID}/${parentID}`,
      //   method: 'GET',
      //   headers: {
      //     Authorization: token,
      //   },
      // });
      // const { notifications } = data;
      // console.log(notifications, 'notifications')
      // setNotifications(notifications);
    } catch (error) {
      console.log(error.message, 'this is error from notification screen');
    } finally {
      // setLoading(false);
    }

    // return () => {
    //   setNotifications([]);
    // };
  }, []);

  const onButtonClosePressHandler = async (notificationId) => {
    try {
      setLoadingActionClose(true);
      await props.patchNotificationAsViewed(notificationId, reducerNotifications, notificationsCount)
      // const tokenString = await AsyncStorage.getItem('token');
      // const { token } = JSON.parse(tokenString);
      // const { data } = await axios({
      //   url: `${baseURL}/api/v1/members/notifications/${notificationId}`,
      //   method: 'PATCH',
      //   headers: {
      //     Authorization: token,
      //   },
      // });

      // const result = reducerNotifications.filter(
      //   (notif) => notif._id !== notificationId
      // );
      // setNotifications(result);
    } catch (error) {
      console.log(error, 'this is error when button close pressed');
    } finally {
      setLoadingActionClose(false);
      // const { countNotification: currentTotalNotification } = props.userData;
      // const payload = {
      //   ...props.userData,
      //   countNotification: currentTotalNotification - 1
      // };
      // props.setUserData(payload)
    }
  };

  const onButtonSeeDetailPressHandler = (notification) => {
    console.log('masuk');
    navigation.navigate('NotificationDetail', { notification });
  };

  const renderNotificationCard = ({ item }) => {
    return (
      <View style={{ marginBottom: 12 }}>
        <NotificationCard
          notification={item}
          onButtonClosePress={() => onButtonClosePressHandler(item._id)}
          onButtonDetailPress={() => onButtonSeeDetailPressHandler(item)}
        />
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <GradientHeader title="Notifikasi" navigate={navigation.navigate} />
      <View style={styles.container}>
        {isLoading ? (
          <LottieLoader
            source={require('../../animation/loading.json')}
            loop
            autoPlay
          />
        ) : (
          <>
            {reducerNotifications.length > 0 ? (
              <FlatList
                data={reducerNotifications}
                keyExtractor={(item) => item._id}
                renderItem={renderNotificationCard}
              />
            ) : (
              <>
                <View style={styles.noDataContainer}>
                  <EmptyNotificationLogo />
                  <Text
                    style={[textStyles.ligthText, styles.noNotificationText]}
                  >
                    Belum ada Notifikasi
                  </Text>
                </View>
                <View style={styles.bottomContainer}>
                  <TouchableOpacity
                    style={styles.backToHomeButton}
                    onPress={() => navigation.navigate('Home')}
                  >
                    <Text style={textStyles.ligthText}>Kembali ke Home</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        )}

        <Modal
          visible={loadingActionClose}
          presentationStyle={'overFullScreen'}
          statusBarTranslucent={false}
          animationType="slide"
          transparent
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 99,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator color="#005EA2" />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const textStyles = StyleSheet.create({
  ligthText: {
    color: '#DDDDDD',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  noDataContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noNotificationText: {
    paddingTop: 20,
  },

  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  backToHomeButton: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#545454',
  },
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  setUserData,
  getAllNotifications,
  patchNotificationAsViewed
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
