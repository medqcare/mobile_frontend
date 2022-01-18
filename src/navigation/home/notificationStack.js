import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import Notification from '../../screens/home/notification/Notification.js';
import NotificationDetail from '../../screens/home/notification/NotificationDetail.js';

export default NotificationStack = createStackNavigator(
  {
    Notification: {
      screen: Notification,
      navigationOptions: {
        headerShown: false,
      },
    },
    NotificationDetail: {
      screen: NotificationDetail,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Notification',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);
