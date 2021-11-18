import { createStackNavigator } from "react-navigation-stack"
import Favorito from '../../screens/home/activity/FavouriteDoctor'

export default FilterDocterStack = createStackNavigator({
    Favorite: {
        screen: Favorito,
        navigationOptions: {
            headerShown: false
        }
    },
},{
        initialRouteName: 'Favorite'
    }
)
