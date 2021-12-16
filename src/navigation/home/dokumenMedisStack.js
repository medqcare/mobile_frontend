import { createStackNavigator } from "react-navigation-stack";
import DokumenMedisList from "../../screens/home/dokumenMedis/DokumenMedisList";
import ShowDokumen from "../../screens/home/dokumenMedis/ShowDokumen";

export default StackDokumenMedis = createStackNavigator(
  {
    ListDokumenMedis: {
      screen: DokumenMedisList,
      navigationOptions: {
        headerShown: false
      },
    },
    ShowDokumen: {
      screen: ShowDokumen,
      navigationOptions: {
        headerShown: false
      },
    }
  },
  {
    initialRouteName: "ListDokumenMedis"
  }
);
