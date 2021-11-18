import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator  } from 'react-navigation-stack'

import MedicalHistory from '../../screens/profile/medicalHistory/medicalHistory'

const medicalHistoryStack = createSwitchNavigator({
    MedicalHistory: {
        screen: MedicalHistory,
        navigationOptions: {
            headerShown: false
        }
    },
},{
    initialRouteName: 'MedicalHistory'
})

export default createAppContainer(medicalHistoryStack)
