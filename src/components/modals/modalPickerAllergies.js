import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

export default function SelectModalAllergies({
  modal,
  setModal,
  title,
  selectionType,
  subtitle,
  placeholder,
  inputAlergies,
  setInputAlergies,
  load,
  addAlergies,
  dataAlergi,
  setDataAlergi,
  editAlergi
}) {
  const [type, setType] = useState("");
  const [kustomType, setKustomType] = useState("");
  
  useEffect(() => {
    if(setInputAlergies){
      setType("")
      setInputAlergies('')
    }
  },[modal])
  
  useEffect(() => {
    dataAlergi && setType(dataAlergi.type)
  },[dataAlergi])


  return (
    <Modal
      isVisible={modal}
      swipeDirection={"down"}
      style={styles.modal}
      animationType="slide"
      onBackdropPress={() => setModal(false)}
      onSwipeComplete={() => setModal(false)}
      onRequestClose={() => setModal(false)}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.toogle} />
          <Text style={styles.title}>{title || "Tambah Alergi"}</Text>
        </View>
        <View style={styles.lowerContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.subtitle}>
              {"Kamu alergi apa ?"}
            </Text>
            {
              dataAlergi && dataAlergi.createBy == 'Dokter' &&
              <Text style={{...styles.subtitle, color: "#4BE395"}}>
                {"Alergi dari dokter tidak dapat diubah"}
              </Text>
            }
          </View>
          <View style={styles.inputTextArea}>
            <TextInput
              editable={dataAlergi && dataAlergi.createBy == 'Dokter' ? false : true}
              style={{color: dataAlergi && dataAlergi.createBy == 'Dokter' ? "#4BE395" : "#DDDDDD"}}
              autoCapitalize={"none"}
              autoFocus={false}
              placeholder={placeholder || "Cth: Amoxicilin, Udang, Dingin"}
              keyboardType={"default"}
              placeholderTextColor={"#8b8b8b"}
              onChangeText={(text) => {
                dataAlergi
                  ? setDataAlergi({
                      ...dataAlergi,
                      alergi: text,
                      type : type === "Kustom" ? kustomType : type
                    })
                  : setInputAlergies(text);
              }}
              value={dataAlergi ? dataAlergi.alergi : inputAlergies}
            />
          </View>
          <View>
            <Text style={styles.subtitle}>
              {subtitle || "Tipe alergi ?"}
            </Text>
          </View>
          <ScrollView
            style={styles.selectOption}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {selectionType.map((el, idx) => {
              return (
                <TouchableOpacity key={idx} onPress={() => setType(el)}>
                  <Text
                    style={type === el ? styles.optionSelected : styles.option}
                  >
                    {el}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity onPress={() => setType("Kustom")}>
              <Text
                style={
                  type === "Kustom" ? styles.optionSelected : styles.option
                }
              >
                Kustom
              </Text>
            </TouchableOpacity>
          </ScrollView>
          {type === "Kustom" && (
            <View style={styles.inputTextArea}>
              <TextInput
                style={styles.inputText}
                autoCapitalize={"none"}
                autoFocus={false}
                placeholder={placeholder || "Cth: Kulit, dll"}
                keyboardType={"default"}
                placeholderTextColor="#8b8b8b"
                onChangeText={(text) => {
                  setKustomType(text);
                }}
              />
            </View>
          )}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                if (addAlergies){
                  type === "Kustom" ? addAlergies(kustomType) : addAlergies(type);
                } else {
                  type === "Kustom" ? editAlergi(kustomType) : editAlergi(type);
                }
              }}
              style={styles.button}
            >
              {load ? (
                <ActivityIndicator size={"small"} color="#FFF" />
              ) : (
                <Text style={{ fontSize: 14, color: "#DDDDDD" }}>
                  Simpan Data
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    maxHeight: "100%",
    backgroundColor: "#2F2F2F",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  toogle: {
    position: "absolute",
    borderWidth: 2,
    width: 50,
    borderColor: "#6C6C6C",
    alignContent: "center",
    marginBottom: 20,
  },
  title: {
    color: "#DDDDDD",
    fontSize: 13,
    textAlign: "center",
    marginTop: 20,
  },
  selectOption: {
    display: "flex",
    flexDirection: "row",
    marginBottom: dimHeight * 0.02,
  },
  option: {
    color: "#B5B5B5",
    fontSize: 13,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderWidth: 0.8,
    borderColor: "#B5B5B5",
    borderRadius: 20,
    marginRight: dimWidth * 0.02,
  },
  optionSelected: {
    color: "#DDDDDD",
    backgroundColor: "#005ea2",
    fontSize: 13,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginRight: dimWidth * 0.02,
  },
  lowerContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
    flexDirection: "column",
  },
  subtitle: {
    color: "#B5B5B5",
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: dimHeight * 0.02,
  },
  allergyTypes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingBottom: 8,
  },
  radioForm: {
    color: "#DDDDDD",
  },
  inputTextArea: {
    borderBottomWidth: 1,
    borderRadius: 3,
    paddingBottom: 10,
    backgroundColor: "#2F2F2F",
    borderColor: "#545454",
    marginBottom: dimHeight * 0.02,
  },
  inputText: {
    color: "#DDDDDD",
  },
  button: {
    height: 50,
    width: "100%",
    backgroundColor: "#005ea2",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
