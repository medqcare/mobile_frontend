import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import DokumenList from '../../screens/home/dokumenMedis/DokumenList';
import RujukanList from '../../screens/home/rujukan/RujukanList';

export default StackRujukan = createStackNavigator(
  {
    ListRujukan: {
      screen: DokumenList,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'ListRujukan',
    initialRouteParams: {
      types: ['rujukan', 'surat sakit'],
      allowUploadDocument: false,
    },
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);
