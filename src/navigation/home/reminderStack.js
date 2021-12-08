import { createStackNavigator } from "react-navigation-stack";
import Reminder from "../../screens/home/reminder/Reminder";

export default StackReminder = createStackNavigator(
  {
    Reminder: {
      screen: Reminder,
      navigationOptions: {
        headerShown: false
      },
    }
  },
  {
    initialRouteName: "Reminder"
  }
);
