import { createStackNavigator } from "react-navigation-stack";
import Riwayat from '../../screens/home/riwayat/Riwayat'
import DetailResumeMedis from "../../screens/home/riwayat/DetailResumeMedis";

export default StackMedres = createStackNavigator(
  {
    Riwayat: {
      screen: Riwayat,
      navigationOptions: {
        headerShown: false
      },
    },
    DetailResumeMedis: {
      screen: DetailResumeMedis,
      navigationOptions: {
        headerShown: false
      },
    }
  },
  {
    initialRouteName: "Riwayat"
  }
);
