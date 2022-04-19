import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import Riwayat from '../../screens/home/riwayat/Riwayat';
import DetailTransaction from '../../screens/home/riwayat/DetailTransaction.js';
import DetailDoctor from '../../screens/home/doctor/DetailDoctor';
import BuatJanji from '../../screens/home/activity/BuatJanji';
import ShowDokumen from '../../screens/home/dokumenMedis/ShowDokumen';
export default StackRiwayat = createStackNavigator(
  {
    Riwayat: {
      screen: Riwayat,
      navigationOptions: {
        headerShown: false,
      },
    },
    DetailTransaction: {
      screen: DetailTransaction,
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
      screen: BuatJanji,
      navigationOptions: {
        headerShown: false,
      },
    },
    ShowDokumen: {
      screen: ShowDokumen,
      navigationOptions: {
        headerShown: false
      }
    }
  },
  {
    initialRouteName: 'Riwayat',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);
