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
import Stethoscope from "../../../assets/svg/home-blue/stethoscope-blue";
import DokFavorit from '../../../assets/svg/DokFavorit'
import Penunjang from '../../../assets/svg/Penunjang'

const heightDim = Dimensions.get("screen").height;

function MenuNavigator({ navigation, data }) {

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
        <DokFavorit />
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
          data ? navigation.navigate("Undefined") : navigation.navigate("Sign")
        }
      >
        <Penunjang />
        <Text style={{ marginTop: 10, fontSize: 12, color: "#B5B5B5" }}>
          Penunjang
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "rgba(17, 39, 82, 0.66)",
    position: "absolute",
    marginTop: heightDim * 0.03,
    width: "90%",
    paddingHorizontal: 10,
    height: heightDim * 0.11,
    top: heightDim * 0.15,
    flexDirection: "row",
    justifyContent: "space-between",
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
    flex: 1,
    maxHeight: heightDim * 0.08,
    padding: "2%",
    flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 100,
  },
});

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
});

module.exports = connect(mapStateToProps)(MenuNavigator);
