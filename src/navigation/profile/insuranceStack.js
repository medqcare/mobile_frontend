import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator  } from 'react-navigation-stack'
import AddInsurance from '../../screens/profile/addInsurance'
import ListInsurance from '../../screens/profile/listInsurance'
import AddInsuranceForm from '../../screens/profile/InsuranceForm'

const addFamilyStack = createSwitchNavigator({
    AddInsurance: {
        screen: AddInsurance,
        navigationOptions: {
            headerShown: false
        }
    },
    ListInsurance: {
        screen: ListInsurance,
        navigationOptions: {
            headerShown: false
        }
    },
    InsuranceForm: {
        screen: AddInsuranceForm,
        navigationOptions: {
            headerShown: false
        }
    }
},{
    initialRouteName: 'AddInsurance'
})

export default createAppContainer(addFamilyStack)
