import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { INTER_400 } from '../values/font';

export default function TransactionStatus({ status, small = false }) {
  let name = '';
  let style = {};

  switch (status) {
    case 'success': {
      name = 'Transaksi Sukses';
      style = { color: '#4ade80', backgroundColor: '#37423B' };
      break;
    }

    case 'fail': {
      name = 'Transaksi Gagal';
      style = { color: '#ef4444', backgroundColor: '#402829' };
      break;
    }

    default: {
      name = 'Menunggu Pembayaran';
      style = { color: '#facc15', backgroundColor: '#48380F' };
    }
  }

  return (
    <View
      style={{
        backgroundColor: style.backgroundColor,
        paddingHorizontal: small ? 5 : 10,
        paddingVertical: small ? 3 : 6,
        borderRadius: 99,
      }}
    >
      <Text
        style={[
          {
            color: style.color,
            fontFamily: INTER_400,
            fontSize: small ? 12 : 14,
          },
        ]}
      >
        {name}
      </Text>
    </View>
  );
}
