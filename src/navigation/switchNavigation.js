import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import LoadingPage from '../screens/profile/loading'
import Card_Stack from './card'
import Undefined from '../screens/404'


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
}, {
    initialRouteName: 'Loading'
})
export default createAppContainer(Switch); 