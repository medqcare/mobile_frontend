import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Header from "../../../components/headers/GradientHeader";

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

export default function PenunjangList(props) {
  // const data = null
  const data = [
    {
      klinik: "Klinik Mulia Tama",
      name: "Medical Checkup",
      date: "22 December 2021",
      patientName: 'Halim Syarif',
      status: 'booked'
    },
    {
      klinik: "Klinik Mulia Tama",
      name: "Medical Checkup",
      date: "16 November 2021",
      patientName: 'Halim Syarif',
      status: 'finished'
    },
  ];
  return (
    <View style={styles.container}>
      <Header title="Penunjang" navigate={props.navigation.navigate} />
      <View style={styles.content}>
        <View>
          {data ? (
            data.map((el, idx) => {
              return (
                <View key={idx}>
                  <TouchableOpacity style={{marginBottom: 15}} >
                    
                      <View style={{height: 30, backgroundColor: el.status === 'finished' ? '#454545' : '#005EA2', alignItems: 'center', borderTopEndRadius: 5, borderTopStartRadius: 5}}>
                          <Text style={{color: '#DDDDDD', fontStyle: 'italic', marginTop: 7, fontSize: 12}}>{el.status === 'finished' ? 'Telah selesai' : 'Telah dipesan'} </Text>
                      </View>
                      <View style={{flexDirection: 'row', backgroundColor: '#2F2F2F', padding: 14, borderBottomStartRadius:5, borderBottomEndRadius:5}}>
                      <View style={styles.borderImage}>
                          <Image
                              style={styles.image}
                              source={{ uri: "https://www.isteducation.com/wp-content/plugins/learnpress/assets/images/no-image.png" }} />
                      </View>
                      <View style={{ flex: 1 }}>
                          <View style={{ marginRight: 30 }}>
                              <Text style={{...styles.textItem, fontWeight: 'bold'}}>{el.klinik}</Text>
                              <Text style={styles.textItem}>{el.name}</Text>
                          </View>
                          
                          <View style={styles.line}></View>
                          <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
                              <Text style={{color: '#B5B5B5'}}>Patient Name : </Text>
                              <Text style={{  color: '#DDDDDD' }}>{el.patientName}</Text>
                          </View>
                          <Text style={styles.textItem}>{el.date}</Text>
                      </View>
                      </View>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
              <Text style={styles.textItem}>Belum ada list penunjang</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Hospital", { facility: "Clinic" })
          }
          style={styles.buttonAdd}
        >
          <Text style={styles.textButton}>Cari Klinik</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
  },
  content: {
    height: dimHeight * 0.92,
    justifyContent: "space-between",
    padding: 20,
  },
  buttonAdd: {
    alignItems: "center",
    alignSelf: "center",
    width: dimWidth * 0.4,
    backgroundColor: "#005EA2",
    borderRadius: 25,
    padding: 10,
  },
  borderImage: {
    height: 55,
    width: 55,
    borderRadius: 55,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#33E204',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'transparent',
  },
  textItem: {
    color: "#B5B5B5",
  },
  textButton: {
    color: "#B5B5B5",
    fontSize: 12,
  },
});
