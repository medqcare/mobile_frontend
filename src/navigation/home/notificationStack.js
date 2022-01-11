import {
    createStackNavigator,
    TransitionPresets,
  } from 'react-navigation-stack';
  import Notification from '../../screens/home/notification/Notification.js';
  
  export default NotificationStack = createStackNavigator(
    {
      Notification: {
        screen: Notification,
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
  