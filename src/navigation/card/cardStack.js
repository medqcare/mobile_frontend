import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import CardLoading from '../../screens/card/loading_card'
import CardPage from '../../screens/card/card'
import SignPage from '../profile/signStack'

const CardTab = createSwitchNavigator({
    Card_loading: {
        screen: CardLoading,
        navigationOptions: {
            headerShown: false
        }
    },
    Card_landing: {
        screen: CardPage,
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
    initialRouteName: 'Card_landing'
})

export default createAppContainer(CardTab)