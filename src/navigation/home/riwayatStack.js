import { createStackNavigator } from 'react-navigation-stack';
import Riwayat from '../../screens/home/riwayat/Riwayat';
import DetailTransaction from '../../screens/home/riwayat/DetailTransaction.js';
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
  },
  {
    initialRouteName: 'Riwayat',
  }
);
