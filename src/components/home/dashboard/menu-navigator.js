import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import IconFontisto from "react-native-vector-icons/Fontisto";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import Stethoscope from "../../../assets/svg/home-blue/stethoscope-blue";
import Hospital from "../../../assets/svg/home-blue/hospital-blue";
import Clinic from "../../../assets/svg/home-blue/clinic-blue";
import Private from "../../../assets/svg/home-blue/private-blue";
import Scan from "../../../assets/svg/home-blue/qr-blue";

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
});

function MenuNavigator({ navigation, data }) {
  // console.log(navigation,'ini navigationnya')
  // console.log(navigation,'ini navigationnya')

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.borderIcon}
        onPress={() => navigation.navigate("Doctor")}
      >
        <Stethoscope />
        <Text style={{ marginTop: 10, fontSize: 12, color: "#B5B5B5" }}>
          Dokter
        </Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#0C6292",
          height: "80%",
          width: 1,
          backgroundColor: "#0C6292",
        }}
      ></View>
      <TouchableOpacity
        style={style.borderIcon}
        onPress={() =>
          data ? navigation.navigate("Filter") : navigation.navigate("Sign")
        }
      >
        <Image
          navigation={navigation}
          source={require("../../../assets/png/ic_keluarga.png")}
          style={{ width: 25, height: 24 }}
        />
        <Text style={{ marginTop: 10, fontSize: 12, color: "#B5B5B5" }}>
          Dokter Favorit
        </Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#0C6292",
          height: "80%",
          width: 1,
        }}
      ></View>
      <TouchableOpacity
        style={style.borderIcon}
        onPress={() => navigation.navigate("Hospital", { facility: "Clinic" })}
      >
        <Image
          navigation={navigation}
          source={require("../../../assets/png/ic_klinik.png")}
          style={{ width: 24, height: 24 }}
        />
        <Text style={{ marginTop: 10, fontSize: 12, color: "#B5B5B5" }}>
          Klinik
        </Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#0C6292",
          height: "80%",
          width: 1,
          backgroundColor: "#0C6292"
        }}
      ></View>

      <TouchableOpacity
        style={style.borderIcon}
        onPress={() =>
          data ? navigation.navigate("Filter") : navigation.navigate("Sign")
        }
      >
        <Image
          navigation={navigation}
          source={require("../../../assets/png/ic_keluarga.png")}
          style={{ width: 25, height: 24 }}
        />
        <Text style={{ marginTop: 10, fontSize: 12, color: "#B5B5B5" }}>
          Penunjang
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const heightDim = Dimensions.get("screen").height;
const style = StyleSheet.create({
  container: {
    backgroundColor: "rgba(17, 39, 82, 0.66)",
    position: "absolute",
    marginTop: 25,
    width: "92%",
    paddingHorizontal: 10,
    height: heightDim * 0.1,
    top: heightDim * 0.14,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(17, 39, 82, 0.85)",
    alignSelf: "center",
    alignItems: "center",
    shadowOffset: {
      width: 4,
      height: 7,
    },
    borderRadius: 15,
    shadowOpacity: 0.61,
    shadowRadius: 9.11,
    zIndex: 2,
  },
  borderIcon: {
    width: "23%",
    paddingVertical: "2%",
    flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 100,
  },
});

module.exports = connect(mapStateToProps)(MenuNavigator);
