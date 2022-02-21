const {
  createStackNavigator,
  TransitionPresets,
} = require('react-navigation-stack');
import HomeCare from '../../screens/home/homecare/HomeCare';

const HomeCareStack = createStackNavigator(
  {
    HomeCareScreen: {
      screen: HomeCare,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'HomeCareScreen',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
      cardStyle: {
        backgroundColor: '#1F1F1F',
        opacity: 1,
      },
    },
  }
);

export default HomeCareStack;
