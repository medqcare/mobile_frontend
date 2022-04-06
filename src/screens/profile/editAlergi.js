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
import {
  editSelectedAllergy,
  deleteSelectedAllergy,
} from "../../stores/action";
import { connect } from "react-redux";
import SelectModalAllergies from "../../components/modals/modalPickerAllergies";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import GradientHeader from "../../components/headers/GradientHeader";

import IcEdit from "../../assets/svg/ic_edit";
import IcTrash from "../../assets/svg/ic_trash";

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

const EditAllergies = (props) => {
  const { data, selected, selectionType } = props.navigation.state.params;
  const { allergies } = props.allergiesReducer

  const [Load, setLoad] = useState(false);
  const [inputAlergies, setInputAlergies] = useState("");

  const [allAlergi, setAllAlergi] = useState(data);
  const [allergiesSelected, setAllergiesSelected] = useState(data[selected]);

  const [modalW, setModalW] = useState(false);
  const [idAlergie, setId] = useState(null);

  const [modalAllergyTypes, setModalAllergyTypes] = useState(false);
  const [dataAlergi, setDataAlergi] = useState(null);

  const [action, setAction] = useState({
    edit: [],
    delete: [],
  });

  BackHandler.addEventListener("hardwareBackPress", () => {
    return props.navigation.pop();
  });

  function saveEditState(type) {
    if (dataAlergi.alergi && type) {
      setModalAllergyTypes(false);
      const newData = allergiesSelected.filter((el) => {
        if (el.id === dataAlergi.id) {
          (el.alergi = dataAlergi.alergi), type;
        }
        return el;
      });
      setAllergiesSelected(newData);
      const filter = action.edit.filter((el) => el.id !== dataAlergi.id);
      setAction({
        ...action,
        edit: [
          ...filter,
          {
            id: dataAlergi.id,
            alergi: dataAlergi.alergi,
            type,
          },
        ],
      });
    } else {
      ToastAndroid.show("please fill in allergy type", ToastAndroid.LONG);
    }
  }

  function deleteState(id) {
    const newData = allergiesSelected.filter((el) => {
      return el.id !== id;
    });
    setAllergiesSelected(newData);
    const newEditAction = action.edit.filter((el) => {
      if (el.id !== id) {
        return el;
      }
    });
    setAction({
      edit: [...newEditAction],
      delete: [...action.delete, id],
    });
  }

  async function deleteAlergi(id) {
    try {
      return props.deleteSelectedAllergy(id, allergies, selected)
    } catch (error) {
      console.log(error)
    }
  }

  async function editAlergi(item) {
    try {
      return props.editSelectedAllergy(item.id, item.alergi, item.type, allergies, selected)
    } catch (error) {
      console.log(error)
    }
  }

  async function actionAsync() {
    return new Promise((resolve, reject) => {
      if (action.delete.length) {
        action.delete.map(async (el) => {
          await deleteAlergi(el)
        });
        console.log('1');
      }
      if (action.edit.length) {
        action.edit.map(async (item) => {
          await editAlergi(item);
        });
        console.log('2');
      }
      resolve()
    })
  }

  const saveAction = async () => {
    if (!action.edit.length && !action.delete.length) {
      ToastAndroid.show("Tidak ada perubahan yang disimpan", ToastAndroid.LONG);
      setModalW(false);
      props.navigation.navigate("MainAllergy");
    } else {
      setLoad(true);
      if (action.delete.length) {
        await Promise.all(action.delete.map(async (el) => {
          await deleteAlergi(el)
        }))
      }
      if (action.edit.length) {
        await Promise.all(action.edit.map(async (item) => {
          await editAlergi(item);
        }))
      }
      ToastAndroid.show("Perubahan berhasil disimpan", ToastAndroid.LONG)
      setLoad(false);
      setModalW(false);
      props.navigation.navigate("MainAllergy", { refresh: true });
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <GradientHeader
        navigate={props.navigation.navigate}
        navigateBack={"MainAllergy"}
        title="Edit Alergi"
        params={{ refresh: true }}
      />
      <View>
        <ScrollView style={{ height: dimHeight * 0.78 }}>
          <View style={styles.allergieBoxContainer}>
            <View style={styles.allergiesTextContainerTop}></View>
            <View style={styles.lowerBox}>
              <Text style={styles.allergiesTextTop}>{selected}</Text>
              {allergiesSelected.map((item, idx) => {
                return (
                  <View key={idx}>
                    <View style={styles.allergiesTextContainer}>
                      <Text
                        style={
                          item.createBy == "Patient"
                            ? styles.allergiesPatientText
                            : styles.allergiesDokterText
                        }
                      >
                        {item.alergi.length > 30
                          ? item.alergi.slice(0, 30) + " ..."
                          : item.alergi}
                      </Text>
                      {action.edit.length > 0 &&
                        action.edit.map((edit) => {
                          if (item.id === edit.id) {
                            return (
                              <Text
                                key={edit.id}
                                style={{
                                  width: dimWidth * 0.3,
                                  color: "#A87F0B",
                                }}
                              >
                                {"=> " + edit.type}
                              </Text>
                            );
                          }
                        })}
                      <View
                        style={{
                          flexDirection: "row",
                          width: dimWidth * 0.13,
                          justifyContent: "space-between",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setDataAlergi({
                              ...item,
                              type: selected,
                            });
                            setModalAllergyTypes(true);
                          }}
                        >
                          <IcEdit />
                        </TouchableOpacity>
                        {item.createBy !== "Dokter" && (
                          <TouchableOpacity
                            onPress={() => {
                              deleteState(item.id);
                            }}
                          >
                            <IcTrash />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Add Allergy Button */}
      <View style={styles.addAlergiesContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("MainAllergy");
          }}
          style={styles.button}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#DDDDDD",
              }}
            >
              BATAL
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalW(true);
          }}
          style={styles.buttonSimpan}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#DDDDDD",
              }}
            >
              SIMPAN
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <SelectModalAllergies
        modal={modalAllergyTypes}
        setModal={setModalAllergyTypes}
        inputAlergies={inputAlergies}
        setInputAlergies={setInputAlergies}
        load={Load}
        editAlergi={saveEditState}
        selectionType={selectionType}
        title={"Edit Alergi"}
        dataAlergi={dataAlergi}
        setDataAlergi={setDataAlergi}
      />
      <ConfirmationModal
        modal={modalW}
        optionLeftFunction={() => {
          setModalW(false);
        }}
        load={Load}
        optionLeftText={"BATAL"}
        optionRightFunction={() => {
          saveAction();
        }}
        optionRightText={"SIMPAN"}
        warning={"Simpan Perubahan ini?"}
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
    width: dimWidth * 0.25,
  },
  allergiesPatientText: {
    color: "#DDDDDD",
    width: dimWidth * 0.25,
  },
  addAlergiesContainer: {
    flexDirection: "row",
    width: dimWidth * 0.92,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: dimWidth * 0.04,
  },
  button: {
    height: 50,
    width: dimWidth * 0.43,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#545454",
    borderRadius: 4,
  },
  buttonSimpan: {
    height: 50,
    width: dimWidth * 0.43,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#005EA2",
    borderRadius: 4,
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
  editSelectedAllergy,
  deleteSelectedAllergy
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAllergies);
