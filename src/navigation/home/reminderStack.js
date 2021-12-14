import { createStackNavigator } from "react-navigation-stack";
import Reminder from "../../screens/home/reminder/Reminder";
import AddReminderForm from "../../screens/home/reminder/AddReminderForm";

export default StackReminder = createStackNavigator(
  {
    Reminder: {
      screen: Reminder,
      navigationOptions: {
        headerShown: false
      },
    },
    AddReminderForm: {
      screen: AddReminderForm,
      navigationOptions: {
        headerShown: false
      }
    }
  },
  {
    initialRouteName: "Reminder"
  }
);
