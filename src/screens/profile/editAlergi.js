import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  ScrollView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAlergie, getAlergie, deleteAlergie, editAlergi } from "../../stores/action";
import { connect } from "react-redux";
import LottieLoader from "lottie-react-native";
import SelectPatient from "../../components/modals/selectPatient";
import SelectModalAllergies from "../../components/modals/modalPickerAllergies";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import GradientHeader from "../../components/headers/GradientHeader";

import IcEdit from "../../assets/svg/ic_edit"
import IcTrash from "../../assets/svg/ic_trash"

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

const EditAllergies = (props) => {
  const [accountOwner, setAccountOwner] = useState(props.userData);
  const [displayName, setDisplayName] = useState(
    props.userData.lastName
      ? props.userData.firstName + " " + props.userData.lastName
      : props.userData.firstName
  );

  const [Load, setLoad] = useState(false);
  const [inputAlergies, setInputAlergies] = useState("");

  const [allergies, setAlergies] = useState([]);
  const [modalW, setModalW] = useState(false);
  const [idAlergie, setId] = useState(null);
  const [idUser, setIduser] = useState({ firstName: null, _id: null });
  const [family, setFamily] = useState([]);
  const [modalPatient, setModalPatient] = useState(false);
  const [modalAllergyTypes, setModalAllergyTypes] = useState(false);
  const [dataAlergi, setDataAlergi] = useState(null)

  const [selectionType, setSelectionType] = useState([]);


  function getFamily() {
    let dataUser = {
      _id: props.userData._id,
      firstName: props.userData.lastName
        ? props.userData.firstName + " " + props.userData.lastName
        : props.userData.firstName,
    };
    const temp = [dataUser];
    props.userData.family.forEach((el) => {
      temp.push({
        _id: el._id,
        firstName: el.lastName
          ? el.firstName + " " + el.lastName
          : el.firstName,
      });
    });
    setIduser(temp[0]);
    setFamily(temp);
  }

  BackHandler.addEventListener("hardwareBackPress", () => {
    return props.navigation.pop();
  });

  async function _fetchDataAlergi() {
    setAlergies([]);
    setLoad(true);
    let token = await AsyncStorage.getItem("token");
    let temp = {
      OBAT: [],
      MAKANAN: [],
      CUACA: [],
    };
    props
      .getAlergie(idUser._id, JSON.parse(token).token)
      .then((allAlergi) => {
        for (let i = 0; i < allAlergi.data.length; i++) {
          const item = allAlergi.data[i];
          if (item.status == "Active") {
            if (!temp[item.alergieType.toUpperCase()]) {
              temp[item.alergieType.toUpperCase()] = [];
            }
            temp[item.alergieType.toUpperCase()].push({
              id: item._id,
              alergi: item.alergie,
              createBy: item.createBy,
            });
          }
        }

        const keySelection = Object.keys(temp);
        const index = keySelection.indexOf("");
        if (index !== -1) keySelection.splice(index, 1);
        setSelectionType(keySelection);

        if (temp.OBAT.length === 0) delete temp.OBAT;
        if (temp.MAKANAN.length === 0) delete temp.MAKANAN;
        if (temp.CUACA.length === 0) delete temp.CUACA;

        setAlergies(temp);
        setLoad(false);
      })
      .catch((error) => {
        console.log(error);
        setLoad(false);
      });
  }

  async function _DeleteAlergi(_idAlergie) {
    let token = await AsyncStorage.getItem("token");
    props
      .deleteAlergie(_idAlergie, JSON.parse(token).token)
      .then((backData) => {
        console.log('delete', backData);
        _fetchDataAlergi();
      });
  }

  async function editAlergi(type) {
    let token = await AsyncStorage.getItem("token");
    if (dataAlergi.alergi && type) {
      setModalAllergyTypes(false);
      props
        .editAlergi(
          dataAlergi.id,
          dataAlergi.alergi,
          type,
          JSON.parse(token).token
        )
        .then((backData) => {
          _fetchDataAlergi();
          setInputAlergies("");
        });
    } else {
      ToastAndroid.show(
        "please fill in allergy and type of allergy",
        ToastAndroid.LONG
      );
    }
  }

  useEffect(() => {
    getFamily();
  }, []);

  useEffect(() => {
    if (idUser._id) {
      _fetchDataAlergi();
    }
  }, [idUser]);

  function setSelectedValue(data) {
    const fullName = data.lastName
      ? data.firstName + " " + data.lastName
      : data.firstName;
    const _id = data._id;
    setDisplayName(fullName);
    setIduser({ fullName, _id });
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <GradientHeader
        navigate={props.navigation.navigate}
        navigateBack={"MainAllergy"}
        title="Edit Alergi"
        params={{refresh: true}}
      />

      {Load ? (
        <View style={{ flex: 1, width: "100%", backgroundColor: "#1F1F1F" }}>
          <LottieLoader
            source={require("../animation/loading.json")}
            autoPlay
            loop
          />
        </View>
      ) : (
        <>
          <View>
            <ScrollView style={{ height: dimHeight * 0.9 }}>
              {Object.keys(allergies).map((el, index) => {
                return (
                  <View style={styles.allergieBoxContainer} key={index}>
                    <View style={styles.allergiesTextContainerTop}></View>
                    <View style={styles.lowerBox} key={el.id}>
                      <Text style={styles.allergiesTextTop}>
                        {el || "Lainnya"}
                      </Text>
                      {allergies[el].map((item, idx) => {
                        return (
                          <View key={idx}>
                            <View style={styles.allergiesTextContainer}>
                              <Text style={item.createBy == "Patient" ? styles.allergiesPatientText : styles.allergiesDokterText}>
                                {item.alergi.length > 30
                                  ? item.alergi.slice(0, 30) + " ..."
                                  : item.alergi}
                              </Text>
                              <View style={{flexDirection: 'row', width: dimWidth * 0.13, justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={() => {
                                  setDataAlergi({
                                    ...item,
                                    type: el
                                  })
                                  setModalAllergyTypes(true)
                                }
                                  }>
                                  <IcEdit />
                                </TouchableOpacity>
                                {
                                  item.createBy !== "Dokter" && 
                                  <TouchableOpacity onPress={() => {
                                    setModalW(true);
                                    setId(item.id);
                                  }}>
                                    <IcTrash />
                                  </TouchableOpacity>
                                }
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </>
      )}
      <SelectModalAllergies
        modal={modalAllergyTypes}
        setModal={setModalAllergyTypes}
        inputAlergies={inputAlergies}
        setInputAlergies={setInputAlergies}
        load={Load}
        editAlergi={editAlergi}
        selectionType={selectionType}
        title={'Edit Alergi'}
        dataAlergi={dataAlergi}
        setDataAlergi={setDataAlergi}
      />
      <ConfirmationModal
        modal={modalW}
        optionLeftFunction={() => {
          setModalW(false);
        }}
        optionLeftText={"BATAL"}
        optionRightFunction={() => {
          _DeleteAlergi(idAlergie);
          setModalW(false);
        }}
        optionRightText={"HAPUS"}
        warning={"Yakin ingin menghapus alergi?"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
  },
  boxContainer: {
    padding: dimHeight * 0.02,
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#C2C2C2",
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 0.61,
    shadowRadius: 9.11,
    elevation: 9,
    width: "100%",
  },
  box: {
    width: "100%",
    paddingHorizontal: dimHeight * 0.02,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2F2F2F",
  },
  boxDokter: {
    backgroundColor: "#4BE395",
    height: dimHeight * 0.015,
    width: dimHeight * 0.03,
    borderRadius: 2,
  },
  boxPatient: {
    backgroundColor: "#A87F0B",
    height: dimHeight * 0.015,
    width: dimHeight * 0.03,
    borderRadius: 2,
  },
  allergieBoxContainer: {
    paddingHorizontal: dimHeight * 0.02,
    paddingVertical: 5,
    flexDirection: "column",
    shadowColor: "#C2C2C2",
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 0.61,
    shadowRadius: 9.11,
    elevation: 9,
  },
  lowerBox: {
    // width: '100%',
    paddingHorizontal: dimHeight * 0.02,
    borderRadius: 3,
    flexDirection: "column",
    backgroundColor: "#2F2F2F",
  },
  inputBox: {
    flex: 1,
  },
  alergie: {
    flexDirection: "row",
    borderColor: "#3a5756",
    borderWidth: 0.2,
    width: "90%",
    height: 60,
    margin: 8,
    padding: 8,
    marginBottom: 0,
    borderRadius: 3,
    alignSelf: "center",
    alignItems: "center",
  },
  allergiesTextContainerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: dimHeight * 0.01,
    paddingBottom: 5,
  },
  boxDetail: {
    flexDirection: "row",
    width: "100%",
    padding: dimHeight * 0.02,
  },
  itemBoxDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  textBoxDetail: {
    color: "#B5B5B5",
    fontStyle: "italic",
    fontSize: 12,
    paddingHorizontal: dimHeight * 0.02,
  },
  allergiesTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: dimHeight * 0.015,
  },
  allergiesTextTop: {
    color: "#A87F0B",
    textTransform: "uppercase",
    paddingVertical: dimHeight * 0.02,
  },
  allergiesDokterText: {
    color: "#4BE395",
  },
  allergiesPatientText: {
    color: "#DDDDDD",
  },
  addAlergiesContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: dimHeight * 0.02,
  },
  button: {
    height: 50,
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#545454",
    borderStyle: "dashed",
    borderRadius: 4,
    width: "100%",
  },
  picker: {
    height: 60,
    borderColor: "#3a5756",
    borderWidth: 0.2,
    paddingHorizontal: 8,
    paddingVertical: 10,
    width: "90%",
    margin: 8,
    marginBottom: 0,
    borderRadius: 3,
    alignSelf: "center",
    justifyContent: "center",
  },

  header: {
    paddingTop: StatusBar.currentHeight,
    height: StatusBar.currentHeight + 50,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "tomato",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  content: {
    height: 70,
  },
  inputText: {
    color: "#DDDDDD",
  },
});

const mapDispatchToProps = {
  setAlergie,
  getAlergie,
  deleteAlergie,
  editAlergi
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAllergies);
