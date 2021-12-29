import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import SearchDoctor from '../../screens/home/doctor/SearchDoctor';
import DetailDoctor from '../../screens/home/doctor/DetailDoctor';
import MedicalFasility from '../../screens/home/doctor/MedicalFacility';
import BuatJanjiPage from '../../screens/home/activity/BuatJanji';
import filterDokterStack from '../activity/filterDokterStack';

const StackDoctor = createStackNavigator(
  {
    SearchDoctor: {
      screen: SearchDoctor,
      navigationOptions: {
        headerShown: false,
      },
    },
    DetailDoctor: {
      screen: DetailDoctor,
      navigationOptions: {
        tabBarVisible: false,
        headerShown: false,
      },
    },
    BuatJanji: {
      screen: BuatJanjiPage,
      navigationOptions: {
        headerShown: false,
      },
    },
    Filter: {
      screen: filterDokterStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    MedFacility: {
      screen: MedicalFasility,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'SearchDoctor',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);

// StackDoctor.navigationOptions = ({ navigation }) => {
//   console.log(navigation,'ini navigation-=-=-=')
//   let tabBarVisible;
//   if (navigation.state.routes.length > 1) {
//     navigation.state.routes.map(route => {
//       if (route.routeName === "DetailDoctor") {
//         tabBarVisible = false;
//       } else {
//         tabBarVisible = true;
//       }
//     });
//   }
//   console.log(tabBarVisible,'ini tabBarvisible')
//   return {
//     tabBarVisible
//   };
// };

export default StackDoctor;
