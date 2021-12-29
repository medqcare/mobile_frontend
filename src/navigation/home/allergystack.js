import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import Allergies from '../../screens/profile/alergies';

const AllergyStack = createStackNavigator(
  {
    MainAllergy: {
      screen: Allergies,
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

export default AllergyStack;
