import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import Allergies from '../../screens/profile/alergies';
import EditAlergi from '../../screens/profile/editAlergi';

const AllergyStack = createStackNavigator(
  {
    MainAllergy: {
      screen: Allergies,
      navigationOptions: {
        headerShown: false,
      },
    },
    EditAllergy: {
      screen: EditAlergi,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'MainAllergy',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);

export default AllergyStack;
