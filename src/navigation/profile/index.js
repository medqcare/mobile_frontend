import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import settingStack from '../../navigation/profile/settingStack'
import ProfilePage from './profileStack'
import AddFamilyPage from './addFamilyStack'
import InsurancePage from './paymentStack'
import MedicalHistoryPage from './medicalHistoryStack'
import SchedulePage from './scheduleStack'
import HistoryPage from '../../components/profile/dashboard/historyRegistration'
import ResetPasswordPage from  '../../navigation/profile/resetPasswordStack'


export default ProfileTab = createStackNavigator({
    ProfileStack: {
        screen: ProfilePage,
        navigationOptions: {
            headerShown: false,
        }
    },
    SettingStack: {
        screen: settingStack,
        navigationOptions: {
            headerShown: false,
        }
    },
    // EditFamily: {
    //     screen: AddFamilyPage,
    //     navigationOptions: {
    //         headerShown: false,
    //         tabBarVisible: () => {
    //             let tabBarVisible = true
    //             if (navigation.state.index > 0) {
    //                 tabBarVisible = false
    //             }
    //             return {
    //                 tabBarVisible,
    //             }
    //         },
    //     }
    // },

    AddFamily: {
        screen: AddFamilyPage,
        navigationOptions: {
            headerShown: false,
            tabBarVisible: () => {
                let tabBarVisible = true
                if (navigation.state.index > 0) {
                    tabBarVisible = false
                }
                return {
                    tabBarVisible,
                }
            },
        }
    },
    ResetPassword: {
        screen: ResetPasswordPage,
        navigationOptions: {
            headerShown: false,
            tabBarVisible: () =>  {
                let tabBarVisible = true
                if (navigation.state.index > 0){
                    tabBarVisible = false
                }
                return {
                    tabBarVisible
                }
            },
        }
    },
    Insurance: {
        screen: InsurancePage,
    },
    MedicalHistory: {
        screen: MedicalHistoryPage,
    },
    History: {
        screen: HistoryPage,
        navigationOptions: {
            headerShown: false,
        }
    }
}, {
    initialRouteName: 'ProfileStack'
})

ProfileTab.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};