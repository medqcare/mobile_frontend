import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import listAppointment from '../../screens/home/appointment/AppointmentList'
import ScannerPage from '../../screens/home/appointment/ScannerPage';

export default AppointmentStack = createStackNavigator(
  {
    AppointmentList: {
      screen: listAppointment,
      navigationOptions: {
        headerShown: false,
      },
    },
    Scanner: {
      screen: ScannerPage,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'AppointmentList',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);
