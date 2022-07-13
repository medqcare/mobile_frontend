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
  BackHandler,
  Modal,
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import GradientHeader from '../../../components/headers/GradientHeader';
import EmptyNotificationLogo from '../../../assets/svg/EmptyNotificationLogo';
// import axios from 'axios';
// import { baseURL } from '../../../config';
import NotificationCard from '../../../components/home/NotificationCard';
import LottieLoader from 'lottie-react-native';
import { ActivityIndicator } from 'react-native-paper';
import {
  getAllNotifications,
  patchNotificationAsViewed,
  patchNotificationAsDeleted,
} from '../../../stores/action';
import { setUserData } from '../../../stores/action/userData';
const dimension = Dimensions.get('window');
const dimHeight = dimension.height;
const dimWidth = dimension.width;

function Notification({ navigation, ...props }) {
  const dispatch = useDispatch();

  const { userData } = props.userDataReducer;
  const {
    notifications: reducerNotifications,
    notificationsCount,
    isLoading,
    error,
  } = props.notificationsReducer;
  const [loadingActionClose, setLoadingActionClose] = useState(false);

  useEffect(async () => {
    try {
      const parentID = userData.userID._id;
      const patientID = userData._id;
      await props.getAllNotifications(patientID, parentID);
    } catch (error) {
      console.log(error.message, 'this is error from notification screen');
    }
  }, []);

  const onButtonClosePressHandler = async (notificationId) => {
    try {
      setLoadingActionClose(true);
      await props.patchNotificationAsDeleted(
        notificationId,
        reducerNotifications,
        notificationsCount
      );
      const { countNotification } = userData
      dispatch(setUserData({
        ...userData,
        countNotification: countNotification - 1
      }))
    } catch (error) {
      console.log(error, 'this is error when button close pressed');
    } finally {
      setLoadingActionClose(false);
    }
  };

  	const onButtonSeeDetailPressHandler = async (notification) => {
		switch (notification.type) {
			case 'antrian': {
				navigation.navigate('ActivityStack', {navigateBack: "NotificationStack"});
				break;
			}

			case 'reservasi': {
				navigation.navigate('AppointmentList', {navigateBack: "NotificationStack"});
				break;
			}

			case 'reservasi:batal': {
				navigation.navigate('Riwayat', {navigateBack: "NotificationStack"});
				break;
			}

			default: {
				navigation.navigate('NotificationDetail', { notification });
			}
		}

		const { countNotification } = userData
		dispatch(setUserData({
			...userData,
			countNotification: countNotification - 1
		}))
		
		if(!notification.isViewed) {
			await props.patchNotificationAsViewed(
				notification._id,
				reducerNotifications,
				notificationsCount
			);
		}
	};

  const renderNotificationCard = ({ item }) => {
    return (
      <View style={{ marginBottom: 12 }}>
        <NotificationCard
          notification={item}
          onButtonClosePress={() => onButtonClosePressHandler(item._id)}
          onCardPress={() => onButtonSeeDetailPressHandler(item)}
        />
      </View>
    );
  };

  	BackHandler.addEventListener('hardwareBackPress', () => {
		navigation.pop();
		return true;
	});

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
  patchNotificationAsViewed,
  patchNotificationAsDeleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
