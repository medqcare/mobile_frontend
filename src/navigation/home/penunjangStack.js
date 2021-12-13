import { createStackNavigator } from "react-navigation-stack";
import PenunjangList from "../../screens/home/penunjang/PenunjangList";

export default StackPenunjang = createStackNavigator(
  {
    PenunjangList: {
      screen: PenunjangList,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "PenunjangList",
  }
);
