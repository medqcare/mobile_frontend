import { createStackNavigator } from "react-navigation-stack";
import DokumenMedisList from "../../screens/home/dokumenMedis/DokumenMedisList";

export default StackDokumenMedis = createStackNavigator(
  {
    ListDokumenMedis: {
      screen: DokumenMedisList,
      navigationOptions: {
        headerShown: false
      },
    }
  },
  {
    initialRouteName: "ListDokumenMedis"
  }
);
