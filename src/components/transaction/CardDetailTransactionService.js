import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import IconClinic from '../../assets/svg/IconClinic';
import IconTime from '../../assets/svg/IconTime';
import IconUser from '../../assets/svg/IconUser';
import { dateWithDDMMMYYYYFormat } from '../../helpers/dateFormat';
import { formatNumberToRupiah } from '../../helpers/formatRupiah';
import {
  BLACK_SECONDARY,
  GREY_BORDER_LINE,
  GREY_SECONDARY,
  ORANGE_PRIMARY,
  WHITE_PRIMARY,
  WHITE_SECONDARY,
} from '../../values/color';
import { INTER_400 } from '../../values/font';
import { shareFile, shareFilePDF } from '../../helpers/shareDocument';
import TransactionStatus from '../TransactionStatus';

function Gap({ height = 0, width = 0 }) {
  return <View style={{ width, height }}></View>;
}

export default function CardDetailTransactionService({
  transaction,
  status: transactionStatus,
  ...props
}) {
  const renderItem = ({ item }) => {
    return (
      <>
        <View style={styles.wrapperItem}>
          <Text style={styles.textItem}>{item.itemName}</Text>
          <Text style={styles.textItem}>{item.itemPrice}</Text>
        </View>
        <Gap height={4} />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.serviceTitle}>{transaction.services.name}</Text>
          <View style={styles.wrapperTextWithIcon}>
            <IconUser style={styles.icon} />
            <Text style={styles.iconText}>
              {transaction.patient.patientName}
            </Text>
          </View>
          <View style={styles.wrapperTextWithIcon}>
            <IconClinic style={styles.icon} />
            <Text style={styles.iconText}>
              {transaction.healthFacility.facilityName}
            </Text>
          </View>
          <View style={styles.wrapperTextWithIcon}>
            <IconTime style={styles.icon} />
            <Text style={styles.iconText}>
              {dateWithDDMMMYYYYFormat(
                new Date(
                  transaction.bookingSchedule.split('/').reverse().join('/')
                )
              )}
            </Text>
          </View>
        </View>
        <View></View>
      </View>
      <Gap height={10} />
      <View style={styles.borderLine}></View>
      <Gap height={10} />
      <View>
        <Text style={styles.payment}>Detail Pembayaran</Text>
        <View style={styles.wrapperPaymentMethod}>
          <Text style={styles.paymentMethodTitle}>Metode Pembayaran</Text>
          <Text style={styles.paymentMethodTitle}>Tunai</Text>
        </View>
        <Gap height={4} />
        <FlatList
          data={transaction.items}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
      <Gap height={10} />
      <View style={styles.borderLine}></View>
      <Gap height={10} />
      <View>
        <View style={styles.bottomInfoWrapper}>
          <TransactionStatus status={transaction.status}/>
          <View>
            <Text style={styles.titleTotalPrice}>Total Bayar</Text>
            <Gap height={4} />
            <Text style={styles.totalPriceText}>
              {formatNumberToRupiah(transaction.amount)}
            </Text>
            <Gap height={8} />
            {transaction.status === 'success' && transaction.file.url !== '' ? (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('ShowDokumen', {
                    uri: transaction.file.url,
                    name: 'Struk Pembayaran',
                    backTo: 'DetailTransaction',
                    option: {
                      name: 'share',
                      action: async () => {
                        const filename = `struk_pembayaran_layanan_${transaction.services.name}`;
                        await shareFilePDF(transaction.file.url, filename);
                      },
                    },
                  });
                }}
              >
                <Text style={styles.textShowReceipt}>lihat struk</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BLACK_SECONDARY,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 4,
  },
  wrapperTextWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 4,
  },
  iconText: {
    color: WHITE_SECONDARY,
    fontFamily: INTER_400,
    fontSize: 12,
  },
  serviceTitle: {
    fontFamily: INTER_400,
    color: WHITE_PRIMARY,
    fontSize: 16,
    marginBottom: 8,
  },
  borderLine: {
    height: 1,
    width: '100%',
    backgroundColor: GREY_BORDER_LINE,
  },
  textGrayNormal: {
    color: GREY_SECONDARY,
    fontFamily: INTER_400,
  },
  payment: {
    color: GREY_SECONDARY,
    textTransform: 'uppercase',
    marginBottom: 8,
    fontSize: 14,
  },
  wrapperPaymentMethod: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodTitle: {
    color: WHITE_SECONDARY,
    fontFamily: INTER_400,
    fontSize: 12,
  },
  textItem: {
    color: WHITE_SECONDARY,
    fontFamily: INTER_400,
    fontSize: 12,
  },
  bottomInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTotalPrice: {
    fontFamily: INTER_400,
    color: GREY_SECONDARY,
    textAlign: 'right',
    fontSize: 12,
  },
  totalPriceText: {
    color: WHITE_PRIMARY,
    fontFamily: INTER_400,
    fontSize: 16,
  },
  textShowReceipt: {
    textTransform: 'uppercase',
    textAlign: 'right',
    fontFamily: INTER_400,
    fontSize: 12,
    color: ORANGE_PRIMARY,
  },
});
