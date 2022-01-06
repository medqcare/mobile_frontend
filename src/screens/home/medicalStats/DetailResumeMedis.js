import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { getFormattedDate } from "../../../helpers/dateFormat";
import ButtonPrevious from "../../../assets/svg/ic_previous";
import ButtonNext from "../../../assets/svg/ic_next";
import BUttonClose from "../../../assets/svg/ic_close";
import Swiper from "react-native-swiper";
import { ActivityIndicator } from "react-native-paper";

export default function DetailResumeMedis(props) {
  const { data, idx } = props.navigation.state.params;
  const lengthData = data.length;

  const [resumeMedis, setResumeMedis] = useState(data[idx]);
  const [activePage, setActivePage] = useState(idx);

  // useEffect(() => {
  //   setResumeMedis(data[activePage]);
  // }, [activePage]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <View style={{}}>
            <TouchableOpacity
              style={{ paddingRight: 10 }}
              onPress={() => {
                setActivePage(activePage - 1);
              }}
              disabled={activePage <= 0}
            >
              <ButtonPrevious
                color={activePage === 0 ? "#B5B5B5" : "#DDDDDD"}
              />
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <TouchableOpacity
              style={{ paddingLeft: 10 }}
              onPress={() => {
                setActivePage(activePage + 1);
              }}
              disabled={activePage === lengthData - 1}
            >
              <ButtonNext
                color={activePage === lengthData - 1 ? "#B5B5B5" : "#DDDDDD"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginLeft: -15 }}>
          <Text style={styles.title}>
            Taken Date {getFormattedDate(resumeMedis?.createdAt)}
          </Text>
        </View>
        <View style={{}}>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <BUttonClose />
          </TouchableOpacity>
        </View>
      </View>
      <Swiper
        showsPagination={false}
        index={activePage}
        onIndexChanged={(index) => {
          setActivePage(index);
          setResumeMedis(data[index]);
        }}
        loop={false}
        loadMinimal={true}
        loadMinimalSize={1}
      >
        {data.map((_, index) => {
          return (
            <SafeAreaView key={`${index}-medical resume`}>
              <ScrollView>
                {resumeMedis && (
                  <View style={styles.content}>
                    <View style={styles.contentHeader}>
                      <Text style={styles.textHeader}>ANAMNESA</Text>
                      <View style={styles.line} />
                      <View style={styles.card}>
                        <View style={styles.item}>
                          <Text style={styles.textSubHeader}>
                            Keluhan utama
                          </Text>
                        </View>
                        <View style={styles.contentBox}>
                          <Text style={styles.textContent}>
                            {resumeMedis.examination.anamnesa}
                          </Text>
                        </View>
                        <View style={styles.item}>
                          <Text style={styles.textSubHeader}>
                            Pemeriksaan Fisik
                          </Text>
                        </View>

                        <View style={styles.contentBox}>
                          <Text style={styles.textContent}>
                            {resumeMedis.examination.physicalExam}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.contentHeader}>
                      <Text style={styles.textHeader}>HISTORI PENYAKIT</Text>
                      <View style={styles.line} />
                      <View style={styles.card}>
                        <View style={styles.item}>
                          <Text style={styles.textItem}>Belum ada history</Text>
                        </View>
                        {/* <View style={styles.item}>
                          <Text style={styles.textItem}>10 Jan 2014</Text>
                          <Text style={styles.textItem}>DBD</Text>
                        </View>
                        <View style={styles.item}>
                          <Text style={styles.textItem}>18 Feb 2012</Text>
                          <Text style={styles.textItem}>Patah Kaki</Text>
                        </View> */}
                      </View>
                    </View>
                    <View style={styles.contentHeader}>
                      <Text style={styles.textHeader}>TANDA VITAL</Text>
                      <View style={styles.line} />
                      <View style={styles.card}>
                        <View style={styles.item}>
                          <Text style={styles.textItem}>Tinggi</Text>
                          <Text style={styles.textItem}>
                            {resumeMedis.vitalSign.height}
                          </Text>
                        </View>
                        <View style={styles.item}>
                          <Text style={styles.textItem}>Berat</Text>
                          <Text style={styles.textItem}>
                            {resumeMedis.vitalSign.weight}
                          </Text>
                        </View>
                        <View style={styles.item}>
                          <Text style={styles.textItem}>Systole</Text>
                          <Text style={styles.textItem}>
                            {resumeMedis.vitalSign.systole}
                          </Text>
                        </View>
                        <View style={styles.item}>
                          <Text style={styles.textItem}>Dyastole</Text>
                          <Text style={styles.textItem}>
                            {resumeMedis.vitalSign.dyastole}
                          </Text>
                        </View>
                        <View style={styles.item}>
                          <Text style={styles.textItem}>Suhu Tubuh</Text>
                          <Text style={styles.textItem}>
                            {resumeMedis.vitalSign.temperature}
                          </Text>
                        </View>
                        <View style={styles.item}>
                          <Text style={styles.textItem}>Detak Jantung</Text>
                          <Text style={styles.textItem}>
                            {resumeMedis.vitalSign.heartRate}
                          </Text>
                        </View>
                        <View style={styles.item}>
                          <Text style={styles.textItem}>Nutrisi</Text>
                          <Text style={styles.textItem}>
                            {resumeMedis.vitalSign.nutrition}
                          </Text>
                        </View>
                        <View style={styles.item}>
                          <Text style={styles.textItem}>BMI</Text>
                          <Text style={styles.textItem}>
                            {resumeMedis.vitalSign.bmi}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.contentHeader}>
                      <Text style={styles.textHeader}>PEMERIKSAAN</Text>
                      <View style={styles.line} />
                      {resumeMedis.order.length ? (
                        resumeMedis.order.map((item) => {
                          return (
                            <View style={styles.card} key={item._id}>
                              <View style={styles.item}>
                                <Text
                                  style={{
                                    ...styles.textItem,
                                    fontSize: 15,
                                    color: "#DDDDDD",
                                  }}
                                >
                                  {item.facilityDest}
                                </Text>
                              </View>
                              {item.orderDetail.map((action, idx) => {
                                return (
                                  <View key={idx}>
                                      <View style={styles.item}>
                                        <Text style={styles.textItem}>
                                          {action.name || action.NameTest}
                                        </Text>
                                      </View>
                                  </View>
                                );
                              })}
                            </View>
                          );
                        })
                      ) : (
                        <View style={styles.card}>
                          <View style={styles.item}>
                            <Text style={styles.textItem}>
                              Tidak ada pemeriksaan laboratorium
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                    <View style={styles.contentHeader}>
                      <Text style={styles.textHeader}>DIAGNOSIS</Text>
                      <View style={styles.line} />
                      <View style={styles.card}>
                        {resumeMedis.examination.diagnose !== '' && (
                            <View style={styles.item}>
                              <Text style={styles.textItem}>Diagnosa</Text>
                              <Text style={styles.textItem}>
                                {resumeMedis.examination.diagnose}
                              </Text>
                            </View>
                        )}
                        {resumeMedis.examination.ICD !== '' && (
                          <View style={styles.item}>
                            <Text style={styles.textItem}>ICD Kode</Text>
                            <Text style={styles.textItem}>
                              {resumeMedis.examination.ICD}
                            </Text>
                          </View>
                        )}
                        {resumeMedis.examination.icdInfo !== '' && (
                          <View style={styles.item}>
                            <Text style={styles.textItem}>ICD Info</Text>
                            <Text style={styles.textItem}>
                              {resumeMedis.examination.icdInfo}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                    <View
                      style={{ ...styles.contentHeader, marginBottom: "20%" }}
                    >
                      <Text style={styles.textHeader}>NOTES</Text>
                      <View style={styles.line} />
                      {resumeMedis.soap ? (
                        <View style={styles.card}>
                          <View style={{}}>
                            <Text style={styles.textItem}>
                              {resumeMedis.soap.doctorNotes}
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View style={styles.card}>
                          <View style={{}}>
                            <Text style={styles.textItem}>Tidak ada Notes</Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </ScrollView>
            </SafeAreaView>
          );
        })}
      </Swiper>
      {/* <View style={{ height: 100 }} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#181818",
    margin: 0,
    padding: 15,
  },
  content: {
    height: "95%",
    backgroundColor: "#2F2F2F",
    borderRadius: 10,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  contentHeader: {
    marginBottom: 10,
  },
  textHeader: {
    color: "#FBB632",
    fontSize: 14,
  },
  line: {
    backgroundColor: "#515151",
    height: 1.5,
    marginVertical: 10,
  },
  title: {
    color: "#DDDDDD",
    fontSize: 14,
  },
  card: {
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  contentBox: {
    marginBottom: 10,
    borderRadius: 5,
    minHeight: 40,
    padding: 8,
  },
  textContent: {
    color: "#B5B5B5",
  },
  textSubHeader: {
    color: "#fff",
    fontSize: 12,
  },
  textItem: {
    color: "#B5B5B5",
    fontSize: 12,
  },
});
