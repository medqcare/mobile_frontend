import React from 'react'
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native'

import IconAnt from 'react-native-vector-icons/AntDesign'
import IconMI from 'react-native-vector-icons/MaterialIcons'
import IconFA from 'react-native-vector-icons/FontAwesome5'

const FilterSeacrh = (props) => {
    console.log(props, '----- props')
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.show} style={styles.filter}>
                <IconMI name='sort' size={30} />
                <Text>
                    Sort By
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.show} style={styles.filter}>
                <IconAnt name='filter' size={30} />
                <Text>
                    Categories
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Filter')} style={styles.filter}>
                <IconMI name='favorite-border' size={30} />
                <Text>
                    Favourite
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        borderTopColor: '#DCD6D6',
        borderTopWidth: 1
    },
    filter: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})
export default FilterSeacrh