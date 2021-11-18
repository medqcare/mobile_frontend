import React from 'react'
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    Modal
} from 'react-native'
import { useState } from 'react'
import SearchableDropdown from 'react-native-searchable-dropdown'

const ModalSettingDrug = ({ settingName, items, setVisible }) => {
    const [searchModal, setModal] = useState(true)
    const [drug, setItem] = useState(items)
    return (
        <Modal
            animationType={'fade'}
            visible={searchModal}
        // onRequestClose={() => { setModal(false) }}
        >
            <View style={{ flex: 1, }}>
                <ImageBackground source={require('../../../assets/png/Background-Pattern.png')} style={{ height: 65, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, color: '#ffff', fontWeight: 'bold', position: 'relative', }}>Select Medicine</Text>
                </ImageBackground>

                <SearchableDropdown
                    onTextChange={text => settingName(text)}
                    //On text change listner on the searchable input
                    onItemSelect={item => {
                        console.log(item)
                        settingName(item.name)
                    }}
                    //onItemSelect called after the selection from the dropdown
                    // containerStyle={{ flex:0, }}
                    //suggestion container style
                    textInputStyle={{
                        //inserted text style
                        height: 60,
                        width: '100%',
                        alignItems: 'center',
                        // marginVertical: 10,
                        paddingHorizontal: 10,
                        borderBottomWidth: 1,
                        borderColor: '#Cdcdcd'
                    }}
                    itemStyle={{
                        //single dropdown item style
                        width: Dimensions.get('screen').width,
                        paddingHorizontal: 10,
                        paddingVertical: 13,
                        // marginTop: 2,
                        backgroundColor: '#f4f4f4',
                    }}
                    itemTextStyle={{
                        //text style of a single dropdown item
                        color: '#222',
                    }}
                    itemsContainerStyle={{
                        //items container style you can pass maxHeight
                        //to restrict the items dropdown hieght
                        maxHeight: '40%',
                        width: '100%',
                        marginTop: 60,
                        position: 'absolute',
                        zIndex: 100,
                        backgroundColor: '#f4f4f4',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 4,
                            height: 7,
                        },
                        shadowOpacity: 0.61,
                        shadowRadius: 9.11,
                        elevation: 14,
                    }}
                    items={items}
                    //mapping of item array
                    defaultIndex={0}
                    //default selected item index
                    placeholder="Medicine Name"
                    //place holder for the search input
                    resetValue={false}
                //reset textInput Value with true and false state
                // underlineColorAndroid="transparent"
                //To remove the underline from the android input
                />
                <TouchableOpacity onPress={() => setVisible()}
                    style={{
                        backgroundColor: '#9e8', justifyContent: 'center', alignItems: 'center',
                        height: 40,
                        backgroundColor: '#3AD584',
                        borderColor: '#18A85D',
                    }}>
                    <Text style={{ color: '#FFF', fontSize: 20 }}> + </Text>
                </TouchableOpacity>

            </View>
        </Modal>
    )
}

export default ModalSettingDrug 