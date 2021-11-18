import { createStackNavigator } from "react-navigation-stack"
import Activity_page from '../../screens/activity/activity'
import ListToday from '../../screens/activity/listToday'
import ActivityListPage from '../../screens/activity/activityList'

export default ActivityStack = createStackNavigator({
  Activity_landing: {
    screen: Activity_page,
    navigationOptions: {
      headerShown: false
    }
  },
  Activity_List: {
    screen: ActivityListPage,
    navigationOptions: {
      headerShown: false
    }
  },
  List_Today:{
    screen: ListToday,
  }
}, {
  initialRouteName: 'Activity_List'
})
