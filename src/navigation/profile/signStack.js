import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignInPage from '../../screens/profile/sign/signIn';
import SignUpPage from '../../screens/profile/sign/signUp';
import SuccessSignUpPage from '../../screens/profile/sign/successSignup';
import resetPasswordStack from './resetPasswordStack';
import DataCompletion from '../../screens/profile/sign/registration';

//
import SignUp from '../../screens/auth/SignUp';
import RegistrationForm from '../../screens/auth/RegistrationForm';
import SignIn from '../../screens/auth/SignIn';
const SignStack = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        headerShown: false,
      },
    },
    SuccessSignUp: {
      screen: SuccessSignUpPage,
      navigationOptions: {
        headerShown: false,
      },
    },
    ResetPassword: {
      screen: resetPasswordStack,
      navigationOptions: {
        headerShown: false,
      },
    },
    UserDataCompletion: {
      screen: RegistrationForm,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'SignIn',
  }
);

export default createAppContainer(SignStack);
