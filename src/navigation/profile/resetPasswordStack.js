import { createAppContainer, } from 'react-navigation'
import { createStackNavigator  } from 'react-navigation-stack'
import Otpp from '../../screens/profile/resetpassword/otp'
import AllertEmail from '../../screens/profile/resetpassword/allertEmailConfirmation'
import ResetPasswordd from '../../screens/profile/resetpassword/resetPassword'
import ResetPassworddEmail from '../../screens/profile/resetpassword/resetPasswordEmail'
import ResetPassworddPhone from '../../screens/profile/resetpassword/resetPasswordPhone'
import InputSecretCode from '../../screens/profile/resetpassword/InputSecretCode'
import ChangePasswordForm from '../../screens/profile/resetpassword/ChangePasswordForm'
import InputSecretCodeOTP from '../../screens/profile/resetpassword/InputSecretCodeOTP'


const resetPasswordStack = createStackNavigator({
    Ottp:{
        screen: Otpp,
        navigationOptions:{
            headerShown: false
        }
    },
    allertEmail: {
        screen: AllertEmail,
        navigationOptions:{
            headerShown: false
        }
    },
    ResetPassword: {
        screen:  ResetPasswordd,
        navigationOptions: {
            headerShown: false
        }
    },
    ResetPasswordEmail:{
        screen: ResetPassworddEmail,
        navigationOptions:{
            headerShown: false
        }
    },
    ResetPasswordPhone:{
        screen: ResetPassworddPhone,
        navigationOptions:{
            headerShown: false
        }
    },
    InputSecretCode: {
        screen: InputSecretCode,
        navigationOptions: {
            headerShown: false
        }
    },
    InputSecretCodeOTP : {
        screen: InputSecretCodeOTP,
        navigationOptions: {
            headerShown: false
        }
    },
    ChangePasswordForm: {
        screen: ChangePasswordForm,
        navigationOptions: {
            headerShown: false
        }
    }
}, {
    initialRouteName: 'ResetPassword'
})

export default createAppContainer(resetPasswordStack)