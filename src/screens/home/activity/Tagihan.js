import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import Header from "../../../components/headers/GradientHeader";

const dimHeight = Dimensions.get('window').height

function Tagihan(props) {
  const data = {
    doctor: {
      title: "Dr.",
      doctorName: "Corrie James Sp.JP, FIHA",
      doctorSpecialist: "Jantung",
    },
    bookingSchedule: "27 November 2021",
    bookingTime: "11.00",
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#181818" }}>
      <StatusBar hidden />
      <Header
        title="Detail Transaksi"
        navigate={props.navigation.navigate}
        navigateBack="Home"
      />
      {data ? (
        <TouchableOpacity style={styles.container}>
          <View
            style={{ backgroundColor: "#2F2F2F", padding: 10, borderRadius: 5 }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ }}>
                <View style={styles.borderImage}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://awsimages.detik.net.id/community/media/visual/2017/07/05/165087b7-e1d9-471b-9b82-c8ccb475de94_43.jpg?w=700&q=90",
                    }}
                  />
                </View>
              </View>
              <View style={{ marginLeft: dimHeight * 0.01 }}>
                <Text style={styles.name}>
                  {data.doctor.title} {data.doctor.doctorName}
                </Text>
                <Text style={styles.textcontent}>
                  Spesialis {data.doctor.doctorSpecialist}
                </Text>
                <View style={styles.time}>
                  <Text style={styles.textcontent}>{data.bookingSchedule}, Pukul </Text>
                  <Text style={styles.textcontent}>{data.bookingTime}</Text>
                </View>
              </View>
            </View>
            <View style={styles.line} />
            <View style={{flexDirection: "row", justifyContent: 'space-between', marginBottom: dimHeight * 0.01, marginBottom: dimHeight * 0.01 }}>
                <Text style={styles.textcontent}>
                  Biaya Admin
                </Text>
                <Text style={styles.textcontent}>
                  Rp 25.000
                </Text>
              </View>
              <View style={{flexDirection: "row", justifyContent: 'space-between', marginBottom: dimHeight * 0.01 }}>
                <Text style={styles.textcontent}>
                  Biaya Admin
                </Text>
                <Text style={styles.textcontent}>
                  Rp 25.000
                </Text>
              </View>
              <View style={{flexDirection: "row", justifyContent: 'space-between', marginBottom: dimHeight * 0.01 }}>
                <Text style={styles.textcontent}>
                  Jasa Konsultasi
                </Text>
                <Text style={styles.textcontent}>
                  Rp 100.000
                </Text>
              </View>
              <View style={{flexDirection: "row", justifyContent: 'space-between', marginBottom: dimHeight * 0.01 }}>
                <Text style={styles.textcontent}>
                  Rekomendasi Obat
                </Text>
                <Text style={styles.textcontent}>
                  Rp 0
                </Text>
              </View>
              <View style={{flexDirection: "row", justifyContent: 'space-between', marginBottom: dimHeight * 0.01 }}>
                <Text style={styles.textcontent}>
                  Cek Lab
                </Text>
                <Text style={styles.textcontent}>
                  Rp 0
                </Text>
              </View>
              <View style={{flexDirection: "row", justifyContent: 'space-between', marginBottom: dimHeight * 0.01 }}>
                <Text style={styles.textcontent}>
                  Metode Pembayaran
                </Text>
                <Text style={styles.textcontent}>
                  Transfer Mandiri
                </Text>
              </View>
              <View style={styles.line} />
              <View style={{flexDirection: "row", justifyContent: 'space-between', marginVertical: dimHeight * 0.01 }}>
                <Text style={{ color: '#EB5959', fontSize: 12, fontStyle: 'italic', marginTop: dimHeight * 0.02}}>
                  Transaksi Gagal
                </Text>
                <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 12, color: "#B5B5B5", textAlign: 'right'}}>
                  Total Bayar
                </Text>
                <Text style={{fontSize: 12, color: "#F37335", textAlign: 'right', marginTop: dimHeight * 0.01}}>
                  Rp 125.000
                </Text>
                </View>
              </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={{ alignItems: "center", marginTop: 25 }}>
          <Text style={{ color: "#fff" }}>Belum ada tagihan</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  borderImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: "transparent",
  },
  line: {
    backgroundColor: "#515151",
    height: 1,
    marginVertical: 10,
  },
  name: {
    fontSize: 12,
    color: "#DDDDDD",
  },
  address: {
    color: "#B2BABB",
    fontSize: 14,
  },
  textcontent: {
    fontSize: 12,
    color: "#B5B5B5",
    marginTop: 5,
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 5
  },
  date: {
    fontSize: 14,
    color: "#B5B5B5",
  },
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tagihan);
