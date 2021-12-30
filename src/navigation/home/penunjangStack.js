import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import FindClinic from '../../screens/home/penunjang/FindClinic';
import Payment from '../../screens/home/penunjang/Payment';
import PenunjangList from '../../screens/home/penunjang/PenunjangList';
import TransactionDetail from '../../screens/home/penunjang/TransactionDetail';

import { Animated, Easing, Platform } from 'react-native';

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
      screen: Payment,
      navigationOptions: {
        headerShown: true,
        title: 'Metode Pembayaran',
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
    initialRouteName: 'PenunjangList',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);
