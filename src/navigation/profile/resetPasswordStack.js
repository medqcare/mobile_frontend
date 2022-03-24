import { createAppContainer } from 'react-navigation';
import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import Otpp from '../../screens/profile/resetpassword/otp';
import AllertEmail from '../../screens/profile/resetpassword/allertEmailConfirmation';
import ResetPasswordd from '../../screens/profile/resetpassword/resetPassword';
import ResetPassworddEmail from '../../screens/profile/resetpassword/resetPasswordEmail';
import ResetPassworddPhone from '../../screens/profile/resetpassword/resetPasswordPhone';
import InputSecretCode from '../../screens/profile/resetpassword/InputSecretCode';
import ChangePasswordForm from '../../screens/profile/resetpassword/ChangePasswordForm';
import InputSecretCodeOTP from '../../screens/profile/resetpassword/InputSecretCodeOTP';
import ForgotPassword from '../../screens/auth/ForgotPassword';
import { BLACK_PRIMARY, WHITE_PRIMARY } from '../../values/color';
import ChangePassword from '../../screens/auth/ChangePassword';

const resetPasswordStack = createStackNavigator(
  {
    Ottp: {
      screen: Otpp,
      navigationOptions: {
        headerShown: false,
      },
    },
    allertEmail: {
      screen: AllertEmail,
      navigationOptions: {
        headerShown: false,
      },
    },
    ResetPassword: {
      // screen: ResetPasswordd,
      screen: ForgotPassword,
      navigationOptions: {
        headerShown: true,
        title: '',
        headerStyle: {
          backgroundColor: BLACK_PRIMARY,
        },
        headerTintColor: WHITE_PRIMARY,
      },
    },
    ResetPasswordEmail: {
      screen: ResetPassworddEmail,
      navigationOptions: {
        headerShown: false,
      },
    },
    ResetPasswordPhone: {
      screen: ResetPassworddPhone,
      navigationOptions: {
        headerShown: false,
      },
    },
    InputSecretCode: {
      screen: InputSecretCode,
      navigationOptions: {
        headerShown: false,
      },
    },
    InputSecretCodeOTP: {
      screen: InputSecretCodeOTP,
      navigationOptions: {
        headerShown: false,
      },
    },
    ChangePasswordForm: {
      screen: ChangePasswordForm,
      navigationOptions: {
        headerShown: false,
      },
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: {
        headerShown: true,
        title: '',
        headerStyle: {
          backgroundColor: BLACK_PRIMARY,
        },
        headerTintColor: WHITE_PRIMARY,
      },
    },
  },
  {
    initialRouteName: 'ResetPassword',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);

export default createAppContainer(resetPasswordStack);
