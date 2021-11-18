import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Schedule from '../../screens/profile/medSchedule/schedule'
import Add from '../../screens/profile/medSchedule/setDrug'
import detail from '../../components/profile/medSchedule/detailSchedule'
import edit from '../../components/profile/medSchedule/editSchedule'

const ScheduleStack = createSwitchNavigator({
    Schedule: {
        screen: Schedule,
        navigationOptions: {
            headerShown: false
        }
    },
    addSchedule: {
        screen: Add,
        navigationOptions: {
            headerShown: false
        }
    },
    detailSchedule: {
        screen: detail,
        navigationOptions: {
            headerShown: false
        }
    },
    editSchedule: {
        screen: edit,
        navigationOptions: {
            headerShown: false
        }
    }
}, {
    initialRouteName: 'Schedule'
})

export default createAppContainer(ScheduleStack)
