import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import Prescription from '../../screens/home/prescription/prescription.js';

export default StackResep = createStackNavigator(
  {
    Prescription: {
      screen: Prescription,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Prescription',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);
