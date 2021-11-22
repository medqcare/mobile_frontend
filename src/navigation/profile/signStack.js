import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import SignInPage from '../../screens/profile/sign/signIn'
import SignUpPage from '../../screens/profile/sign/signUp'
import SuccessSignUpPage from '../../screens/profile/sign/successSignup'

const SignStack = createStackNavigator({
    SignIn: {
        screen: SignInPage,
        navigationOptions: {
            headerShown: false
        }
    },
    SignUp: {
        screen: SignUpPage,
        navigationOptions: {
            headerShown: false
        }
    },
    SuccessSignUp: {
        screen: SuccessSignUpPage,
        navigationOptions: {
            headerShown: false
        }
    },
}, {
    initialRouteName: 'SignIn'
})


export default createAppContainer(SignStack)