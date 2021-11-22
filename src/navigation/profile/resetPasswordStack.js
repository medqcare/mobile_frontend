import { createAppContainer, } from 'react-navigation'
import { createStackNavigator  } from 'react-navigation-stack'
import ResetPasswordd from '../../screens/profile/resetpassword/resetPassword'
import ResetPassworddEmail from '../../screens/profile/resetpassword/resetPasswordEmail'
import ResetPassworddPhone from '../../screens/profile/resetpassword/resetPasswordPhone'

const resetPasswordStack = createStackNavigator({
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
    }
}, {
    initialRouteName: 'ResetPassword'
})

export default createAppContainer(resetPasswordStack)