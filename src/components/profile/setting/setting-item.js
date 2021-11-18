import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconAnt from 'react-native-vector-icons/AntDesign'

const SettingItem = (props) => {
    let { data } = props
    console.log(data, '<<=== INI DATA DARI PROPS ===>>')
    let navigation = data.name.split(" ").join("")
    console.log(navigation)
    return (
        <TouchableOpacity style={viewStyles.container} onPress={() => { props.navigation.navigate(navigation) }}>
            <View style={{ width: 35, paddingHorizontal: 5, }}>
                <IconAnt
                    name={data.icon}
                    size={20}
                />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={textStyles.item}>{data.name}</Text>
            </View>
            <Icon
                name={'chevron-right'}
                size={18}
                color={'#33691E'}
                style={textStyles.chevronRight}
            />
        </TouchableOpacity>
    )
}

const viewStyles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        height: 27,
        paddingHorizontal: 23,
        paddingVertical: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
const textStyles = StyleSheet.create({
    item: {
        textTransform: 'capitalize',
        color: '#5C5C5C',
        fontSize: 16
    }
})
export default SettingItem
