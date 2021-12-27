import { createStackNavigator } from "react-navigation-stack";
import Prescription from '../../screens/home/prescription/prescription'

export default StackResep = createStackNavigator(
  {
    Prescription: {
      screen: Prescription,
      navigationOptions: {
        headerShown: false
      },
    }
  },
  {
    initialRouteName: "Prescription"
  }
);
