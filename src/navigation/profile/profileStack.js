import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ProfilePage from '../../screens/profile/profile'
import SignPage from './signStack'
import RegistUser from '../../screens/profile/sign/registration'

const ProfileTab = createSwitchNavigator({
    // Loading: {
    //     screen: LoadingPage,
    //     navigationOptions: {
    //         headerShown: false
    //     }
    // },
    RegistrationUser: {
        screen: RegistUser,
        navigationOptions: {
            headerShown: false,
        },
    },
    ProfileSwitch: {
        screen: ProfilePage,
        navigationOptions: {
            headerShown: false
        }
    },
    Sign: {
        screen: SignPage,
        navigationOptions: {
            headerShown: false
        }
    },

}, {
    initialRouteName: 'ProfileSwitch',
    // initialRouteName: 'RegistrationUser'
})
export default createAppContainer(ProfileTab)