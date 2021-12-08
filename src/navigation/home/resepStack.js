import { createStackNavigator } from "react-navigation-stack";
import ResepList from '../../screens/home/resep/ResepList'

export default StackResep = createStackNavigator(
  {
    ListResep: {
      screen: ResepList,
      navigationOptions: {
        headerShown: false
      },
    }
  },
  {
    initialRouteName: "ListResep"
  }
);
