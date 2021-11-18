import { createAppContainer, } from 'react-navigation'
import { createStackNavigator  } from 'react-navigation-stack'

import List from '../../screens/profile/family/addFamily'
import AddFamForm from '../../screens/profile/family/addFamilyForm'
import FamilyDetail from '../../screens/profile/family/familyDetail'
import EditFamilyDetail from '../../components/profile/dashboard/editFamilyData'

const addFamilyStack = createStackNavigator({
    FamilyList: {
        screen: List,
        navigationOptions: {
            headerShown: false
        }
    },
    EditFamilyForm: {
        screen: EditFamilyDetail,
        navigationOptions: {
            headerShown: false
        }
    },
    AddFamilyForm: {
        screen: AddFamForm,
        navigationOptions: {
            headerShown: false
        }
    },
    FamilyDetail : {
        screen: FamilyDetail,
        navigationOptions: {
            headerShown: false
        }
    }
},{
    initialRouteName: 'FamilyList'
})

export default createAppContainer(addFamilyStack)
