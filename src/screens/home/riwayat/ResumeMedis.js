import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { baseURL } from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getFormattedDate } from "../../../helpers/dateFormat";
import Qrcode from "../../../assets/svg/Qrcode";
import QRCode from "react-native-qrcode-svg";

import IcInformation from "../../../assets/svg/ic_information";
import IcClose from "../../../assets/svg/ic_closenoborder";
import Iconclose from "../../../assets/svg/ic_close";

const dimHeight = Dimensions.get("window").height;

function ResumeMedis({ navigation }) {
  const [dataMedRes, setDataMedres] = useState(null);
  const [resumeMedis, setResumeMedis] = useState(null);
  const [activePage, setActivePage] = useState(null);
  const [lengthData, setLengthData] = useState(0);
  const [modalQR, setModalQR] = useState(false);
  const [modalKonfirmasi, setModalKonfirmasi] = useState(false);

  useEffect(() => {
    if (dataMedRes) {
      setResumeMedis(dataMedRes[activePage]);
    }
  }, [activePage]);

  const _getData = async () => {
    let token = await AsyncStorage.getItem("token");
    try {
      let { data } = await axios({
        url: `${baseURL}/api/v1/members/getMedicalResume`,
        method: "POST",
        headers: { Authorization: JSON.parse(token).token },
      });
      console.log(data.data);
      setDataMedres(data.data);
      setLengthData(data.data.length);
    } catch (error) {
      console.log(error, "ini error di resume medis");
    }
  };

  useEffect(() => {
    _getData();
  }, []);

  return (
    <View>
      <View
        style={{
          position: "absolute",
          marginTop: -dimHeight * 0.16,
          alignSelf: "flex-end",
          paddingRight: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setModalKonfirmasi(true);
          }}
        >
          <Qrcode />
        </TouchableOpacity>
      </View>
      <View style={Styles.container}>
        <View style={Styles.cardName}>
          <Text style={Styles.textName}>Gunawan Irawan</Text>
          <TouchableOpacity>
            <Text style={Styles.button}>UBAH</Text>
          </TouchableOpacity>
        </View>
        {dataMedRes?.map((item, idx) => {
          return (
            <View style={Styles.card} key={idx}>
              <Text style={{ color: "#B5B5B5" }}>
                Taken Date {getFormattedDate(item.createdAt)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DetailResumeMedis", {
                    data: dataMedRes,
                    idx,
                  });
                }}
              >
                <Text style={Styles.button}>LIHAT</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        {!dataMedRes && (
          <View style={{ alignItems: "center", marginTop: 25 }}>
            <Text style={{ color: "#fff" }}>
              Tidak ada riwayat Resume Medis
            </Text>
          </View>
        )}
      </View>
      <Modal visible={modalKonfirmasi} animationType="fade" transparent={true}>
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            flex: 1,
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              marginBottom: 15,
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={() => setModalKonfirmasi(false)}>
              <IcClose />
            </TouchableOpacity>
          </View>
          <View
            style={{
              maxHeight: "60%",
              minHeight: "35%",
              padding: 10,
              borderRadius: 5,
              backgroundColor: "#2F2F2F",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                margin: 5,
                justifyContent: "space-evenly",
              }}
            >
              <View>
                <IcInformation />
              </View>
              <Text
                style={{
                  color: "#B5B5B5",
                  textAlign: "center",
                  marginTop: 20,
                  fontStyle: "italic",
                  fontSize: 15,
                }}
              >
                Data ini bersifat pribadi untuk anda dan dokter yang anda
                izinkan untuk melihatnya, anda yakin ingin membagikan data ini?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  width: "100%",
                }}
              >
                <TouchableOpacity onPress={() => setModalKonfirmasi(false)}>
                  <Text
                    style={{ fontSize: 16, color: "#B5B5B5", marginTop: 20 }}
                  >
                    BATAL
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalKonfirmasi(false);
                    setModalQR(true);
                  }}
                >
                  <Text
                    style={{ fontSize: 16, color: "#FBB632", marginTop: 20 }}
                  >
                    BAGIKAN
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={modalQR} animationType="fade" transparent={true}>
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            flex: 1,
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View style={{flexDirection: 'row', marginBottom: '10%', backgroundColor: '#3B2F03', padding: 5, borderRadius: 5}}>
            <View style={{padding: dimHeight * 0.01}}>
              <IcInformation size='20'/>
            </View>
            <Text style={{ color: "#8C8C8C", fontStyle: "italic", marginLeft: 5, width: '90%' }}>
              <Text style={{fontWeight: 'bold'}}>Disclaimer : </Text>
              Data ini bersifat pribadi untuk Anda dan dokter yang
              Anda izinkan untuk melihatnya
            </Text>
          </View>
          <View
            style={{
              minHeight: "50%",
              padding: 20,
              borderRadius: 5,
              backgroundColor: "#2F2F2F",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                margin: 5,
                justifyContent: "space-evenly",
                marginVertical: 20,
              }}
            >
              <View
                style={{
                  padding: 3,
                  borderRadius: 10,
                  borderColor: "#fff",
                  borderWidth: 5,
                  backgroundColor: "#2F2F2F",
                }}
              >
                <QRCode size={180} value={"test"} />
              </View>
              <Text
                style={{ color: "#B5B5B5", textAlign: "center", marginTop: 20 }}
              >
                Perlihatkan QR Code ini kepada dokter yang ingin melihat data
                Resume Medis Anda
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#2F2F2F",
                padding: 7,
                borderRadius: 20,
                marginTop: 10,
              }}
              onPress={() => setModalQR(false)}
            >
              <Iconclose name="close" color="#FFFFFF" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  cardName: {
    borderColor: "#545454",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#2F2F2F",
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 50,
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    color: "#F37335",
  },
  textName: {
    color: "#fff",
    fontSize: 16,
  },
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResumeMedis);
