import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import DokumenList from '../../screens/home/dokumenMedis/DokumenList';
import DokumenMedisList from '../../screens/home/dokumenMedis/DokumenMedisList';
import ShowDokumen from '../../screens/home/dokumenMedis/ShowDokumen';

export default StackDokumenMedis = createStackNavigator(
  {
    ListDokumenMedis: {
      screen: DokumenList,
      navigationOptions: {
        headerShown: false,
      },
    },
    ShowDokumen: {
      screen: ShowDokumen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'ListDokumenMedis',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);
