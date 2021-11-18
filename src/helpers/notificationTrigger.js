// import {PushNotificationIOS} from 'react-native';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from 'react-native-push-notification';
// import firebase from 'react-native-firebase';
import localTrigger from '../worker/createLocalNotification';
import notifHandler from './notifHandler';

export default () => {
  console.log('masuk sini dari trigger');

  // PushNotification.configure({
  //   // (optional) Called when Token is generated (iOS and Android)
  //   // (required) Called when a remote is received or opened, or local notification is opened
  //   onNotification: function(notification) {
  //     // process the notification
  //     console.log('NOTIF DARI PUSH', notification);
  //       notifHandler(notification);
  //     // console.log('TYPENYA', typeof notification);
  //     // if( notification && notification.data){
  //     //   // console.log('masuk kesini');
  //     //   let dataWanted = JSON.parse(notification.data.data)
  //     //   console.log('[DATA WANTED]', dataWanted);
  //     //   localTrigger(dataWanted.detailPrescription)
  //     // }

  //     // (required) Called when a remote is received or opened, or local notification is opened
  //     notification.finish(PushNotificationIOS.FetchResult.NoData);
  //   },

  //   // IOS ONLY (optional): default: all - Permissions to register.
  //   permissions: {
  //     alert: true,
  //     badge: true,
  //     sound: true,
  //   },

  //   // Should the initial notification be popped automatically
  //   // default: true
  //   popInitialNotification: true,

  //   /**
  //    * (optional) default: true
  //    * - Specified if permissions (ios) and token (android and ios) will requested or not,
  //    * - if not, you must call PushNotificationsHandler.requestPermissions() later
  //    * - if you are not using remote notification or do not have Firebase installed, use this:
  //    *     requestPermissions: Platform.OS === 'ios'
  //    */
  //   requestPermissions: true,
  // });
};
