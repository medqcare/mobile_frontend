import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import doctorStack from './doctorStack';
import hospitalStack from './hospitalStack';
import Home from '../../screens/home/dashboard/Home';
import ScanMe from '../../screens/home/dashboard/ScanMe';
import Appointment from '../../screens/home/appointment/AppointmentList';
import Tagihan from '../../screens/home/activity/Tagihan';
import AllergyStack from './allergystack';
import Undefined from '../../screens/404';
import profileStack from '../profile';
import SignStack from '../profile/signStack';
import Activity_Stack from '../activity';
import riwayatStack from './riwayatStack';
import medresStack from './medresStack';
import dokumenMedisStack from './dokumenMedisStack';
import penunjangStack from './penunjangStack';
import rujukanStack from './rujukanStack';
import prescriptionStack from './prescriptionStack';
import reminderStack from './reminderStack';

export default StackHome = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    Doctor: {
      screen: doctorStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    ScanMe: {
      screen: ScanMe,
      navigationOptions: {
        headerShown: false,
      },
    },
    Hospital: {
      screen: hospitalStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    Appointment: {
      screen: Appointment,
      navigationOptions: {
        headerShown: false,
      },
    },
    MedicalStats: {
      screen: medresStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    Allergy: {
      screen: AllergyStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    Tagihan: {
      screen: Tagihan,
      navigationOptions: {
        headerShown: false,
      },
    },
    ActivityStack: {
      screen: Activity_Stack,
      navigationOptions: {
        headerShown: false,
      },
    },
    ProfileStack: {
      screen: profileStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    RiwayatStack: {
      screen: riwayatStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    DokumenMedisStack: {
      screen: dokumenMedisStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    PenunjangStack: {
      screen: penunjangStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    RujukanStack: {
      screen: rujukanStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    PrescriptionStack: {
      screen: prescriptionStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    ReminderStack: {
      screen: reminderStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    Sign: {
      screen: SignStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    Undefined: {
      screen: Undefined,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      ...TransitionPresets.ModalSlideFromBottomIOS
    },
  }
);

StackHome.navigationOptions = ({ navigation }) => {
  console.log(navigation.state.index, 'Ini adalah jumlah stack di home');
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
