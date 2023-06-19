import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { formatNumberToRupiah } from '../../../helpers/formatRupiah';
import LottieLoader from 'lottie-react-native';
import { dateWithDDMMMYYYYFormat } from '../../../helpers/dateFormat';
import {
  BLACK_SECONDARY,
  GREY_BORDER_LINE,
  GREY_SECONDARY,
  WHITE_PRIMARY,
} from '../../../values/color';
import { getAllTransactionHistory } from '../../../stores/action';
import TransactionStatus from '../../../components/TransactionStatus';
import Gap from '../../../components/Gap';

const dimHeight = Dimensions.get('window').height;
const DEFAULT_IMAGE_URL =
  'https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg';

function Transaksi(props) {
  const { userData } = props.userDataReducer;
  const [refreshing, setRefreshing] = useState(false);
  const { transactionHistory, transactionIsLoading } = props.historiesReducer;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchTransactionHistory();
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  async function fetchTransactionHistory() {
    const patientID = userData._id;
    const IDs = userData.family
      .map((e) => e._id)
      .concat(patientID)
      .join(',');

    await props.getAllTransactionHistory(patientID, IDs);
  }

  if (transactionIsLoading) {
    return (
      <LottieLoader
        source={require('../../animation/loading.json')}
        autoPlay
        loop
      />
    );
  }

  const getBookingSchedule = (bookingSchedule) => {
    let [dateNumber, month, year] = bookingSchedule.split('/');
    const date = new Date(`${year}-${month}-${dateNumber}`);
    return dateWithDDMMMYYYYFormat(date);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#181818' }}>
      {transactionHistory.length !== 0 ? (
        <View style={{ paddingHorizontal: 16 }}>
          <FlatList
            data={transactionHistory}
            keyExtractor={(item) => `${item._id}`}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    props.navigation.navigate('DetailTransaction', {
                      transaction: {
                        ...item,
                      },
                    });
                  }}
                >
                  <View style={styles.rowCenter}>
                    {item.doctor !== undefined ? (
                      <>
                        <View>
                          <View style={styles.borderImage}>
                            <Image
                              style={styles.image}
                              source={{
                                uri: item.doctor.doctorPhoto
                                  ? item.doctor.doctorPhoto
                                  : DEFAULT_IMAGE_URL,
                              }}
                            />
                          </View>
                        </View>
                        <Gap width={22} />
                        <View>
                          <Text style={styles.name}>
                            {item.doctor.title} {item.doctor.doctorName}
                          </Text>
                          <Text style={styles.textcontent}>
                            Spesialis {item.doctor.doctorSpecialist}
                          </Text>
                        </View>
                      </>
                    ) : (
                      <>
                        <View>
                          <Text style={styles.title}>
                            Layanan Medis {item.services?.name}
                          </Text>
                        </View>
                      </>
                    )}
                  </View>
                  <View style={styles.line} />
                  <View style={styles.cardContentWrapper}>
                    <Text style={styles.textcontent}>
                      {`Tempat Praktik : `}
                      <Text style={{ color: WHITE_PRIMARY }}>
                        {item.healthFacility.facilityName}
                      </Text>
                    </Text>
                    <Text style={styles.textcontent}>
                      {`Nama Pasien : `}
                      <Text style={{ color: WHITE_PRIMARY }}>
                        {item.patient.patientName}
                      </Text>
                    </Text>
                    <Text style={styles.textcontent}>
                      {`Tanggal : `}
                      <Text style={{ color: WHITE_PRIMARY }}>
                        {getBookingSchedule(item.bookingSchedule)}
                      </Text>
                    </Text>
                  </View>
                  <View style={[styles.rowCenter, styles.spaceBetween]}>
                    <TransactionStatus status={item.status} small={true} />
                    <View style={styles.cardPriceInfoWrapper}>
                      <View style={{ flexDirection: 'column', marginLeft: 12 }}>
                        <Text style={styles.cardPriceLabelText}>
                          Total Bayar
                        </Text>
                        <Gap height={8} />
                        <Text style={styles.cardPriceInfoText}>
                          {formatNumberToRupiah(item.amount)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <>
          <Gap height={25} />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.whiteColor}>Tidak ada riwayat transaksi</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  card: {
    backgroundColor: BLACK_SECONDARY,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 12,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: WHITE_PRIMARY,
    textTransform: 'capitalize',
  },
  cardContentWrapper: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1.14,
    borderBottomColor: GREY_BORDER_LINE,
  },
  cardPriceInfoText: {
    fontSize: 14,
    color: '#F37335',
    textAlign: 'right',
  },
  cardPriceLabelText: {
    fontSize: 12,
    color: GREY_SECONDARY,
    textAlign: 'right',
  },
  cardPriceInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '50%',
  },
  borderImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
    backgroundColor: 'transparent',
  },
  line: {
    backgroundColor: '#515151',
    height: 1,
    marginVertical: 10,
  },
  name: {
    fontSize: 12,
    color: '#DDDDDD',
    marginBottom: 4,
  },
  address: {
    color: '#B2BABB',
    fontSize: 14,
  },
  textcontent: {
    fontSize: 12,
    color: '#B5B5B5',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#B5B5B5',
  },
  dividingPoint: {
    height: 4,
    width: 4,
    borderRadius: 100,
    backgroundColor: '#B5B5B5',
    marginHorizontal: 8,
  },
  whiteColor: {
    color: WHITE_PRIMARY
  }
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  getAllTransactionHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaksi);
