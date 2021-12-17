import { createStackNavigator } from "react-navigation-stack";
import FindClinic from "../../screens/home/penunjang/FindClinic";
import PenunjangList from "../../screens/home/penunjang/PenunjangList";

export default StackPenunjang = createStackNavigator(
  {
    PenunjangList: {
      screen: PenunjangList,
      navigationOptions: {
        headerShown: false,
      },
    },
    FindClinic: {
      screen: FindClinic,
      navigationOptions: {
        headerShown: true,
        title: "Temukan Klinik",
        headerStyle: {
          backgroundColor: "#2F2F2F",
        },
        headerTintColor: "#DDDDDD",
        headerTitleStyle: {
          fontSize: 16,
          letterSpacing: 1,
        },
      },
    },
  },
  {
    initialRouteName: "FindClinic",
  }
);
