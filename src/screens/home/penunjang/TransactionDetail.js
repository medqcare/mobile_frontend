import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import ButtonPrimary from "../../../components/ButtonPrimary";
import { formatNumberToRupiah } from "../../../helpers/formatRupiah";

function TransactionDetail(props) {
  const { clinic, paymentMethod, tests } =
    props.navigation.getParam("penunjang");

  const renderTests = ({ item, index }) => {
    const isLastIndex = index === clinic.tests.length - 1;

    if (isLastIndex) {
      return (
        <>
          <View
            style={{
              paddingBottom: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#444444",
              marginBottom: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ color: "#B5B5B5", fontSize: 12 }}
            >{`Cek ${item.test_name} ${item.speciment}`}</Text>
            <Text style={{ color: "#B5B5B5", fontSize: 12 }}>
              {formatNumberToRupiah(item.price)}
            </Text>
          </View>

          <View
            style={{
              paddingBottom: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#444444",
              marginBottom: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#B5B5B5", fontSize: 12 }}>{`PPN`}</Text>
            <Text style={{ color: "#B5B5B5", fontSize: 12 }}>
              {formatNumberToRupiah(clinic.ppn)}
            </Text>
          </View>
          <View
            style={{
              paddingBottom: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#444444",
              marginBottom: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ color: "#B5B5B5", fontSize: 12 }}
            >{`Diskon MedQCare`}</Text>
            <Text style={{ color: "#B5B5B5", fontSize: 12 }}>
              -{formatNumberToRupiah(0)}
            </Text>
          </View>
        </>
      );
    }
    return (
      <View
        style={{
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#444444",
          marginBottom: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{ color: "#B5B5B5", fontSize: 12 }}
        >{`Cek ${item.test_name} ${item.speciment}`}</Text>
        <Text style={{ color: "#B5B5B5", fontSize: 12 }}>
          {formatNumberToRupiah(item.price)}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{
                uri: clinic.image_url,
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 3,
                marginRight: 12,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#DDDDDD",
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                {clinic.Lab_name}
              </Text>
              <View style={{ marginVertical: 6 }}>
                <Text
                  numberOfLines={2}
                  style={{ color: "#A5A5A5", fontSize: 12 }}
                >
                  {clinic.Alamat}
                </Text>
              </View>
              <Text style={{ color: "#A5A5A5", fontSize: 12 }}>
                27 November 2021, Pukul 11:00
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              marginVertical: 20,
            }}
          >
            <View>
              <Text style={{ color: "#DDDDDD", marginBottom: 4 }}>
                METODE PEMBAYARAN
              </Text>
              <Text style={{ color: "#DDDDDD" }}>{paymentMethod.name}</Text>
            </View>
            <Image source={paymentMethod.iconUrl} width={30} height={30} />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 4,
            backgroundColor: "#3A3A3A",
            marginBottom: 20,
          }}
        ></View>
        <View style={{ paddingHorizontal: 16 }}>
          {/* list item */}
          <View style={{ marginBottom: 20, maxHeight: "50%" }}>
            <FlatList
              data={clinic.tests}
              renderItem={renderTests}
              keyExtractor={(item) => `${item.test_id}`}
            />
          </View>
          {/* info */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{ color: "#DBAD69", fontSize: 12, fontStyle: "italic" }}
            >
              Menunggu Pembayaran
            </Text>
            <View>
              <Text
                style={{
                  color: "#B5B5B5",
                  fontSize: 12,
                  textTransform: "capitalize",
                }}
              >
                Total Tagihan
              </Text>
              <Text
                style={{ color: "#DDDDDD", fontSize: 18, fontWeight: "600" }}
              >
                {formatNumberToRupiah(clinic.totalPrice)}
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: "#B5B5B5",
              fontStyle: "italic",
              fontSize: 12,
              width: "95%",
            }}
          >
            Segera selesaikan tagihan pembayaran Anda agar selalu terhubung
            dengan layanan MedQCare
          </Text>
        </View>
      </View>
      <ButtonPrimary label="Bayar" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  card: {
    borderRadius: 4,
    backgroundColor: "#2F2F2F",
    paddingVertical: 20,
    maxHeight: "90%",
  },
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(TransactionDetail);
