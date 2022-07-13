import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import settingStack from '../../navigation/profile/settingStack';
import ProfilePage from '../../screens/profile/profile';
import AddFamilyPage from './addFamilyStack';
import InsurancePage from './paymentStack';
import MedicalHistoryPage from './medicalHistoryStack';
import HistoryPage from '../../components/profile/dashboard/historyRegistration';
import ProfileDetailStack from './profileStack';
import ProfilePictureGallery from '../../screens/profile/profilePictureGallery';
import profilePictureCamera from '../../screens/profile/profilePictureCamera';
import VerifyPassword from '../../screens/home/medicalStats/VerifyPassword';

export default ProfileTab = createStackNavigator(
  {
    ProfileStack: {
      screen: ProfilePage,
      navigationOptions: {
        headerShown: false,
      },
    },
    ProfilePictureGallery: {
      screen: ProfilePictureGallery,
      navigationOptions: {
        headerShown: false,
      },
    },
    ProfilePictureCamera: {
      screen: profilePictureCamera,
      navigationOptions: {
        headerShown: false,
      },
    },
    ProfileDetail: {
      screen: ProfileDetailStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    SettingStack: {
      screen: settingStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    AddFamily: {
      screen: AddFamilyPage,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: () => {
          let tabBarVisible = true;
          if (navigation.state.index > 0) {
            tabBarVisible = false;
          }
          return {
            tabBarVisible,
          };
        },
      },
    },
    VerifyPassword: {
      screen: VerifyPassword,
      navigationOptions: {
        headerShown: false,
      },
    },
    Insurance: {
      screen: InsurancePage,
    },
    MedicalHistory: {
      screen: MedicalHistoryPage,
    },
    History: {
      screen: HistoryPage,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'ProfileStack',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
      cardStyle: {
        backgroundColor: '#1F1F1F',
        opacity: 1,
      },
    },
  }
);

ProfileTab.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
