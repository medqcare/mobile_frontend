import { createStackNavigator } from "react-navigation-stack";
import medicalStats from "../../screens/home/medicalStats/MedicalStats";
import DetailResumeMedis from "../../screens/home/medicalStats/DetailResumeMedis";

// import MedresList from '../../screens/home/medicalStats/MedicalStats'
// import DetailMedres from '../../components/home/medicalStats/detailMedicalStats'
// import ListDetailMedres from '../../components/home/medicalStats/listDetailMerRec'
// import ListDetalVSign from '../../components/home/medicalStats/listDetailVitalSign'
// import MedresList2 from '../../screens/profile/medicalHistory/medicalHistory'

export default StackMedres = createStackNavigator(
  {
    MedResList: {
      screen: medicalStats,
      navigationOptions: {
        headerShown: false,
      },
    },
    DetailResumeMedis: {
      screen: DetailResumeMedis,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "MedResList",
  }
);
