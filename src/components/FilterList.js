import * as React from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
export default function FilterList({ items, itemSelected, onItemSelected }) {
  const filterCardBehaviour = (type) => ({
    container: {
      backgroundColor: type === itemSelected ? '#212D3D' : '#2F2F2F',
      borderWidth: 1,
      borderColor: type === itemSelected ? '#77BFF4' : 'transparent',
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 99,
      alignSelf: 'flex-start',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    text: {
      color: type === itemSelected ? '#77BFF4' : '#B5B5B5',
      fontSize: 12,
      textTransform: 'capitalize',
    },
  });

  const renderFilterCard = ({ item }) => {
    const { container, text } = filterCardBehaviour(item);
    return (
      <TouchableOpacity
        style={container}
        onPress={() => {
          if (typeof onItemSelected === 'function') {
            onItemSelected(item);
          }
        }}
      >
        <Text style={text}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderFilterCard}
      keyExtractor={(_, index) => `${index}-type`}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}
