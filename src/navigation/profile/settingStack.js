import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator  } from 'react-navigation-stack'

import editProfile from '../../components/editProfile'
import SettingPage from '../../screens/profile/setting'
import deletePage from '../../components/profile/deleteAccount'
import alergiesPage from '../../screens/profile/alergies'
import medSchedule from '../profile/scheduleStack'
import ProfileDetail from '../../screens/profile/profileDetail'

const settingStack = createSwitchNavigator({
    Setting: {
        screen: SettingPage,
        navigationOptions: {
            headerShown: false,
        }
    },
    EditProfile: {
        screen: editProfile,
        navigationOptions: {
            headerShown: false
        }
    },
    DeleteAccount: {
        screen: deletePage,
        navigationOptions: {
            headerShown: false
        }
    },
    // Delete allergi from this stack after everything works from home
    Allergies: {
        screen: alergiesPage,
        navigationOptions: {
            headerShown: false
        }
    },
    MedicationSchedule: {
        screen: medSchedule,
        navigationOptions: {
            headerShown: false
        }
    },
    ProfileDetail: {
        screen: ProfileDetail,
        navigationOptions: {
            headerShown: false,
        }
    }
},{
    initialRouteName: 'Setting'
})

export default createAppContainer(settingStack)