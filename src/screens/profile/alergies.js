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
import { getAlergie, deleteAlergie, getPatientAllergies, createAllergy, deleteSelectedAllergy } from "../../stores/action";
import { connect } from "react-redux";
import LottieLoader from "lottie-react-native";
import SelectPatient from "../../components/modals/selectPatient";
import SelectModalAllergies from "../../components/modals/modalPickerAllergies";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import GradientHeader from "../../components/headers/GradientHeader";

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

const Allergies = (props) => {
  const { userData } = props.userDataReducer
  const { allergies, isLoading, needInfo: needInfoReducer, error } = props.allergiesReducer
  const [accountOwner, setAccountOwner] = useState(userData);
  const [displayName, setDisplayName] = useState(
    userData.lastName
      ? userData.firstName + " " + userData.lastName
      : userData.firstName
  );

  const [Load, setLoad] = useState(false);
  const [inputAlergies, setInputAlergies] = useState("");
  const [needInfo, setNeedInfo] = useState(false)

  const [idUser, setIduser] = useState({ firstName: userData.firstName, _id: userData._id });
  const [modalPatient, setModalPatient] = useState(false);
  const [modalAllergyTypes, setModalAllergyTypes] = useState(false);

  const [selectionType, setSelectionType] = useState(['OBAT', 'CUACA', 'MAKANAN'])

	async function addAlergies(type) {
		try {
			if (inputAlergies && type) {
				setModalAllergyTypes(false);

				const patientID = idUser._id
				const allergy = { 
					alergie: inputAlergies, 
					alergieType: type
				}

				await props.createAllergy(patientID, allergy, allergies, setInputAlergies)
			}
			else {
				ToastAndroid.show(
					"please fill in allergy and type of allergy",
					ToastAndroid.LONG
				);
		   }
		} catch (error) {
			console.log(error)
		}
	
	}
  
  	async function _fetchDataAlergi() {
		try {
			setNeedInfo(false)
			setLoad(true);
			const patientID = idUser._id
			await props.getPatientAllergies(patientID)
			setLoad(false)

		} catch (error) {
			setLoad(false)
			console.log(error)
		}
  	}

  useEffect(() => {
    if (idUser._id) {
      _fetchDataAlergi();
    } else {
      console.log('_id is undefined')
    }
  }, [idUser, props.navigation.state.params]);

//   console.log(selectionType)

	function setSelectedValue(data) {
		const fullName = data.lastName
		? data.firstName + " " + data.lastName
		: data.firstName;
		const _id = data._id;
		setDisplayName(fullName);
		setIduser({ fullName, _id });
	}

	BackHandler.addEventListener("hardwareBackPress", () => {
		return props.navigation.pop();
	});

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <GradientHeader
        navigate={props.navigation.navigate}
        navigateBack={"Home"}
        title="Alergi Pasien"
      />

      {/* Name box */}
      <View style={styles.boxContainer}>
        <TouchableOpacity
          onPress={() => setModalPatient(true)}
          style={{ ...styles.box, height: 50 }}
        >
          <Text style={styles.inputText}>{displayName}</Text>
          <Image source={require("../../assets/png/ArrowDown.png")} />
        </TouchableOpacity>

        <SelectPatient
          modal={modalPatient}
          setModal={setModalPatient}
          accountOwner={accountOwner}
          family={[userData, ...userData.family]}
          title="Alergi siapa yang ingin anda lihat?"
          setSelectedValue={setSelectedValue}
          navigateTo={props.navigation.navigate}
        />
      </View>
      {isLoading ? (
        <View style={{ flex: 1, width: "100%", backgroundColor: "#1F1F1F" }}>
          <LottieLoader
            source={require("../animation/loading.json")}
            autoPlay
            loop
          />
        </View>
      ) : (
        <>
          {/* Lower View */}
          {Object.keys(allergies).length ? (
            // Allergy Box
            <View style={{ height: dimHeight * 0.7 }}>
              {
                needInfoReducer && 
              <View style={styles.boxDetail}>
                <View style={styles.itemBoxDetail}>
                  <View style={styles.boxDokter} />
                  <Text style={styles.textBoxDetail}>Dibuat oleh Dokter</Text>
                </View>
                <View style={styles.itemBoxDetail}>
                  <View style={styles.boxPatient} />
                  <Text style={styles.textBoxDetail}>Dibuat oleh Pasien</Text>
                </View>
              </View>
              }
              <ScrollView>
                {Object.keys(allergies).map((el, index) => {
                  return (
                    <View style={styles.allergieBoxContainer} key={index}>
                      <View style={styles.allergiesTextContainerTop}>
                        <Text style={styles.allergiesTextTop}>{el || 'Lainnya'}</Text>
                      </View>
                      <TouchableOpacity style={styles.lowerBox} onPress={() => props.navigation.navigate('EditAllergy', {data: allergies, selected: el, selectionType})}>
                        <View style={styles.allergiesTextContainer}>
                          <Text>
                            {allergies[el].map((item, idx) => {
                              return (
                                <Text
                                  key={idx}
                                  style={
                                    item.createBy == "Patient"
                                      ? styles.allergiesPatientText
                                      : styles.allergiesDokterText
                                  }
                                >
                                  {item.alergi}
                                  {allergies[el].length - 1 !== idx
                                    ? ", "
                                    : null}
                                </Text>
                              );
                            })}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Text style={{ padding: 10, color: "#fff" }}>
                Tidak ada alergi
              </Text>
            </View>
          )}
          {/* Add Allergy Button */}
          <View style={styles.addAlergiesContainer}>
            <TouchableOpacity
              onPress={() => {
                setModalAllergyTypes(true);
              }}
              style={styles.button}
            >
              {isLoading ? (
                <ActivityIndicator size={"small"} color="#FFF" />
              ) : (
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
                      color: "#FFF",
                      paddingLeft: 15,
                      color: "#4398D1",
                    }}
                  >
                    Ketuk untuk menambah alergi
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
      <SelectModalAllergies
        modal={modalAllergyTypes}
        setModal={setModalAllergyTypes}
        inputAlergies={inputAlergies}
        setInputAlergies={setInputAlergies}
        load={Load}
        addAlergies={addAlergies}
        selectionType={selectionType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F"
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
    width: "100%",
    paddingVertical: dimHeight * 0.02,
  },
  allergiesTextTop: {
    color: "#A0A0A0",
    textTransform: "uppercase",
  },
  allergiesDokterText: {
    color: "#4BE395",
  },
  allergiesPatientText: {
    color: "#A87F0B",
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
  getAlergie,
  deleteAlergie,
  getPatientAllergies, 
  createAllergy, 
  deleteSelectedAllergy
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(Allergies);
