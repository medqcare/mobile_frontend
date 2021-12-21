import { createStackNavigator } from "react-navigation-stack";
import FindClinic from "../../screens/home/penunjang/FindClinic";
import Payment from "../../screens/home/penunjang/Payment";
import PenunjangList from "../../screens/home/penunjang/PenunjangList";
import TransactionDetail from "../../screens/home/penunjang/TransactionDetail";

export default StackPenunjang = createStackNavigator(
  {
    PenunjangList: {
      screen: PenunjangList,
      navigationOptions: {
        headerShown: false,
      },
    },
    FindClinic: {
      screen: FindClinic,
      navigationOptions: {
        headerShown: true,
        title: "Temukan Klinik",
        headerStyle: {
          backgroundColor: "#2F2F2F",
        },
        headerTintColor: "#DDDDDD",
        headerTitleStyle: {
          fontSize: 16,
          letterSpacing: 1,
        },
      },
    },
    Payment: {
      screen: Payment,
      navigationOptions: {
        headerShown: true,
        title: "Metode Pembayaran",
        headerStyle: {
          backgroundColor: "#2F2F2F",
        },
        headerTintColor: "#DDDDDD",
        headerTitleStyle: {
          fontSize: 16,
          letterSpacing: 1,
        },
      },
    },
    TransactionDetail: {
      screen: TransactionDetail,
      navigationOptions: {
        headerShown: true,
        title: "Detail Transaksi",
        headerStyle: {
          backgroundColor: "#2F2F2F",
        },
        headerTintColor: "#DDDDDD",
        headerTitleStyle: {
          fontSize: 16,
          letterSpacing: 1,
        },
      },
    },
  },
  {
    initialRouteName: "PenunjangList",
  }
);
