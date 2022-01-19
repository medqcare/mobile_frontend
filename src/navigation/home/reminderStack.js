import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import Reminder from '../../screens/home/reminder/Reminder';
import AddReminderForm from '../../screens/home/reminder/AddReminderForm';
import DrugDetail from '../../screens/home/reminder/DrugDetail';
import DrugPictureCamera from '../../screens/home/reminder/DrugPictureCamera';
import DrugPictureGallery from '../../screens/home/reminder/DrugPictureGallery';

export default StackReminder = createStackNavigator(
  {
    Reminder: {
      screen: Reminder,
      navigationOptions: {
        headerShown: false,
      },
    },
    AddReminderForm: {
      screen: AddReminderForm,
      navigationOptions: {
        headerShown: false,
      },
    },
    DrugDetail: {
      screen: DrugDetail,
      navigationOptions: {
        headerShown: false,
      },
    },
    DrugPictureCamera: {
      screen: DrugPictureCamera,
      navigationOptions: {
        headerShown: false,
      },
    },
    DrugPictureGallery: {
      screen: DrugPictureGallery,
      navigationOptions: {
        headerShown: false,
      },
    }
  },
  {
    initialRouteName: 'Reminder',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);
