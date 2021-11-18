import { createStackNavigator } from 'react-navigation-stack'
import Allergies from '../../screens/profile/alergies'

const AllergyStack = createStackNavigator({
    MainAllergy: {
        screen: Allergies,
        navigationOptions: {
            headerShown: false
        }
    }
})

export default AllergyStack