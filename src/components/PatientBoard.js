import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import getFullName from '../helpers/getFullName';

export default function PatientBoard({ patient, onBoardPress }) {
  const name = getFullName(patient);
  return (
    <TouchableOpacity
      style={{
        borderColor: '#545454',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onPress={onBoardPress}
    >
      <Text style={{ color: '#DDDDDD', fontSize: 16 }}>{name}</Text>
      <Text style={{ textTransform: 'uppercase', color: '#F37335' }}>ubah</Text>
    </TouchableOpacity>
  );
}
