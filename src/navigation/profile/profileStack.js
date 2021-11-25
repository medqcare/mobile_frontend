import { createStackNavigator } from 'react-navigation-stack'
import DetailPage from '../../screens/profile/profileDetail'
import EditPage from '../../components/editProfile'

export default ProfileDetailStack = createStackNavigator({
    ProfileDetail: {
        screen: DetailPage,
        navigationOptions: {
            headerShown: false,
        },
    },
    EditProfile: {
        screen: EditPage,
        navigationOptions: {
            headerShown: false,
        },
    }
}, {
    initialRouteName: 'ProfileDetail'
})