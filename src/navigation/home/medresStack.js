import { createStackNavigator } from "react-navigation-stack"
import MedresList from '../../screens/home/medicalStats/MedicalStats'
import DetailMedres from '../../components/home/medicalStats/detailMedicalStats'
import ListDetailMedres from '../../components/home/medicalStats/listDetailMerRec'
import ListDetalVSign from '../../components/home/medicalStats/listDetailVitalSign'

import MedresList2 from '../../screens/profile/medicalHistory/medicalHistory'

export default StackMedres = createStackNavigator({
    MedResList : {
        screen: MedresList,
        navigationOptions: {
            headerShown: false
        }
    },
    DetailMedRes : {
        screen: DetailMedres,
        navigationOptions: {
            headerShown: false
        }
    },
    ListDetailMedRes : {
        screen: ListDetailMedres,
        navigationOptions: {
            headerShown: false
        }
    },
    ListDetailVitalSign: {
        screen: ListDetalVSign,
        navigationOptions: {
            headerShown: false
        }
    }
})