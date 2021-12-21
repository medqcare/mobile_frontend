import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { getFormattedDate } from "../../helpers/dateFormat";
import ButtonPrevious from "../../assets/svg/ic_previous";
import ButtonNext from "../../assets/svg/ic_next";
import BUttonClose from "../../assets/svg/ic_close";

export default function ModalResumeMedis({
  modal,
  setModal,
  data,
  activePage,
  setActivePage,
  lengthData,
}) {
  return (
      <Modal
        style={styles.modal}
        isVisible={modal}
        swipeDirection={"down"}
        animationType="slide"
        onBackdropPress={() => setModal(false)}
        onSwipeComplete={() => setModal(false)}
        onRequestClose={() => setModal(false)}
      >
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
              Taken Date {getFormattedDate(data?.createdAt)}
            </Text>
          </View>
          <View style={{}}>
            <TouchableOpacity style={{}} onPress={() => setModal(false)}>
              <BUttonClose />
            </TouchableOpacity>
          </View>
        </View>
        <SafeAreaView>
          <ScrollView>
            {data && (
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text style={styles.textHeader}>ANAMNESA</Text>
                  <View style={styles.line} />
                  <View style={styles.card}>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>Keluhan utama</Text>
                    </View>
                    <View style={styles.contentBox}>
                      <Text style={styles.textContent}>
                        {data.examination.anamnesa}
                        ksjhdfljksdhfjhjjjjjjkshdfjshdfkjhsdfkhsdjfhsjfhskhfsdhkjfhskjfhsjd
                      </Text>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>Pemeriksaan Fisik</Text>
                    </View>

                    <View style={styles.contentBox}>
                      <Text style={styles.textContent}>
                        {data.examination.physicalExam}
                        ksjhdfljksdhfjhjjjjjjkshdfjshdfkjhsdfkhsdjfhsjfhskhfsdhkjfhskjfhsjd
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.contentHeader}>
                  <Text style={styles.textHeader}>HISTORI PENYAKIT</Text>
                  <View style={styles.line} />
                  <View style={styles.card}>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>22 Nov 2018</Text>
                      <Text style={styles.textItem}>Tipes</Text>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>10 Jan 2014</Text>
                      <Text style={styles.textItem}>DBD</Text>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>18 Feb 2012</Text>
                      <Text style={styles.textItem}>Patah Kaki</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.contentHeader}>
                  <Text style={styles.textHeader}>TANDA VITAL</Text>
                  <View style={styles.line} />
                  <View style={styles.card}>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>Tinggi</Text>
                      <Text style={styles.textItem}>
                        {data.vitalSign.height}
                      </Text>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>Berat</Text>
                      <Text style={styles.textItem}>
                        {data.vitalSign.weight}
                      </Text>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>Systole</Text>
                      <Text style={styles.textItem}>
                        {data.vitalSign.systole}
                      </Text>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>Dyastole</Text>
                      <Text style={styles.textItem}>
                        {data.vitalSign.dyastole}
                      </Text>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>Suhu Tubuh</Text>
                      <Text style={styles.textItem}>
                        {data.vitalSign.temperature}
                      </Text>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>Detak Jantung</Text>
                      <Text style={styles.textItem}>
                        {data.vitalSign.heartRate}
                      </Text>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>Nutrisi</Text>
                      <Text style={styles.textItem}>
                        {data.vitalSign.nutrition}
                      </Text>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>BMI</Text>
                      <Text style={styles.textItem}>{data.vitalSign.bmi}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.contentHeader}>
                  <Text style={styles.textHeader}>PEMERIKSAAN</Text>
                  <View style={styles.line} />
                  {data.order.length ? (
                    data.order.map((item) => {
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
                                {item.facilityDest === "Laboratory" ? (
                                  <View style={styles.item}>
                                    <Text style={styles.textItem}>
                                      {action.group_name}
                                    </Text>
                                    <Text style={styles.textItem}>
                                      {action.name}
                                    </Text>
                                  </View>
                                ) : null}
                                {item.facilityDest === "Radiology" ? (
                                  <View style={styles.item}>
                                    <Text style={styles.textItem}>
                                      {action.HeadRad}
                                    </Text>
                                    <Text style={styles.textItem}>
                                      {action.NameTest}
                                    </Text>
                                  </View>
                                ) : null}
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
                    <View style={styles.item}>
                      <Text style={styles.textItem}>Diagnosa</Text>
                      <Text style={styles.textItem}>
                        {data.examination.diagnose}
                      </Text>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>ICD Kode</Text>
                      <Text style={styles.textItem}>
                        {data.examination.ICD}
                      </Text>
                    </View>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>ICD Info</Text>
                      <Text style={styles.textItem}>
                        {data.examination.icdInfo}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.contentHeader}>
                  <Text style={styles.textHeader}>PENGOBATAN</Text>
                  <View style={styles.line} />
                </View>
                <View style={styles.contentHeader}>
                  <Text style={styles.textHeader}>NOTES</Text>
                  <View style={styles.line} />
                  <View style={styles.card}>
                    <View style={{}}>
                      <Text style={styles.textItem}>
                        {data.soap.doctorNotes}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#181818",
    margin: 0,
    marginBottom: 20,
    padding: 15,
  },
  content: {
    height: "100%",
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
    // backgroundColor: "#B5B5B5",
    // borderColor: "#B5B5B5",
    // borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    minHeight: 50,
    padding: 8,
  },
  textContent: {
    color: "#B5B5B5",
  },
  textItem: {
    color: "#B5B5B5",
    fontSize: 12,
  },
});
