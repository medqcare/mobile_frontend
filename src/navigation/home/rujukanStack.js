import { createStackNavigator } from 'react-navigation-stack';
import RujukanList from '../../screens/home/rujukan/RujukanList';

export default StackRujukan = createStackNavigator(
  {
    ListRujukan: {
      screen: RujukanList,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'ListRujukan',
  }
);
