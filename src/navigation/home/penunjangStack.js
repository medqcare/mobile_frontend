import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import FindClinic from '../../screens/home/penunjang/FindClinic';
import Payment from '../../screens/home/penunjang/Payment';
import MedicalServices from '../../screens/home/penunjang/PenunjangList';
import TransactionDetail from '../../screens/home/penunjang/TransactionDetail';
import MakeAppointment from '../../screens/home/penunjang/BuatJanji'

import { Animated, Easing, Platform } from 'react-native';
import MedicalServiceDetail from '../../screens/home/penunjang/MedicalServiceDetail';

function fromLeft(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ layout, position, scene }) => {
      const { index } = scene;
      const { initWidth } = layout;

      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [-initWidth, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { opacity, transform: [{ translateX }] };
    },
  };
}

export default StackPenunjang = createStackNavigator(
  {
    MedicalServices: {
      screen: MedicalServices,
      navigationOptions: {
        headerShown: false,
      },
    },

    MedicalServiceDetail: {
      screen: MedicalServiceDetail,
      navigationOptions: {
        headerShown: false,
      }
    },
    
    FindClinic: {
      screen: FindClinic,
      navigationOptions: {
        headerShown: true,
        title: 'Temukan Klinik',
        headerStyle: {
          backgroundColor: '#2F2F2F',
        },
        headerTintColor: '#DDDDDD',
        headerTitleStyle: {
          fontSize: 16,
          letterSpacing: 1,
        },
      },
    },
    Payment: {
      screen: MakeAppointment,
      navigationOptions: {
        headerShown: false,
        // title: 'Metode Pembayaran',
        // headerStyle: {
        //   backgroundColor: '#2F2F2F',
        // },
        // headerTintColor: '#DDDDDD',
        // headerTitleStyle: {
        //   fontSize: 16,
        //   letterSpacing: 1,
        // },
      },
    },
    TransactionDetail: {
      screen: TransactionDetail,
      navigationOptions: {
        headerShown: true,
        title: 'Detail Transaksi',
        headerStyle: {
          backgroundColor: '#2F2F2F',
        },
        headerTintColor: '#DDDDDD',
        headerTitleStyle: {
          fontSize: 16,
          letterSpacing: 1,
        },
      },
    },
  },
  {
    initialRouteName: 'MedicalServices',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);
