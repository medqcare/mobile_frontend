import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import SearchHospital from '../../screens/home/hospital/SearchHospital';
import DetailHospital from '../../screens/home/hospital/DetailHospital';

export default StackHospital = createStackNavigator(
  {
    SearchHospital: {
      screen: SearchHospital,
      navigationOptions: {
        headerShown: false,
      },
    },
    DetailHospital: {
      screen: DetailHospital,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);
