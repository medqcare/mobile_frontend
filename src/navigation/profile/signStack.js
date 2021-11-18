import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import SignInPage from '../../screens/profile/sign/signIn'
import SignUpPage from '../../screens/profile/sign/signUp'
import SignPage from '../../screens/profile/sign/sign'
import SuccessSignUpPage from '../../screens/profile/sign/successSignup'

const SignStack = createStackNavigator({
    // SignStack: {
    //     screen: SignPage,
    //     navigationOptions: {
    //         headerShown: false
    //     }
    // },
    SignStack: {
        screen: SignInPage,
        navigationOptions: {
            headerShown: false
        }
    },
    // SignIn: {
    //     screen: SignInPage,
    //     navigationOptions: {
    //         headerShown: false,
    //     },
    // },
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
    }
    
})


export default createAppContainer(SignStack)