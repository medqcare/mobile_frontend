import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import LoadingPage from '../screens/profile/loading'
import Card_Stack from './card'
import Profile_Stack from "./profile"
import Undefined from '../screens/404'
// import Activity_Stack from './activity'

const Switch = createSwitchNavigator({
    Loading: {
        screen: LoadingPage,
        navigationOptions: {
            headerShown: false
        }
    },
    Chat: {
        screen: Undefined,
    },
    CardStack: {
        screen: Card_Stack,
    },
    // ProfileStack: {
    //     screen: Profile_Stack,
    // }
}, {
    initialRouteName: 'Loading',
    // initialRouteName: 'RegistrationUser'
})
export default createAppContainer(Switch); 