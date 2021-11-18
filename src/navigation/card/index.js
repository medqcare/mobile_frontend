import { createAppContainer } from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'
import HospitalsPage from '../../screens/card/hospitalsCard'
import HospitalDetailPage from '../../screens/card/hospitalCardDetail'
import RegisterHospitalPage from '../../screens/card/registerHospital'
import CardStack from '../../navigation/card/cardStack'

const CardNavigation = createStackNavigator({
    Card_stack: {
        screen: CardStack,
        navigationOptions: {
            headerShown: false
        }
    },
    Hospitals: {
        screen: HospitalsPage
    },
    HospitalDetail: {
        screen: HospitalDetailPage
    },
    RegisterHospital: {
        screen: RegisterHospitalPage
    }
},{
    initialRouteName: 'Card_stack'
})

export default createAppContainer(CardNavigation)