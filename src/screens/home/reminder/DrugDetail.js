import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import GreyHeader from "../../../components/headers/GreyHeader";
import { FontAwesome } from '@expo/vector-icons'; 
import VerticalLine from '../../../assets/svg/VerticalLine'
import { DataTable } from 'react-native-paper'

const dimension = Dimensions.get('window')
const dimHeight = dimension.height
const dimWidth = dimension.width

function DrugDetail({navigation, userData}){
    const  { drugDetail } = navigation.state.params
    const [notes, setNotes] = useState('Minum dengan air putih setelah makan')
    const duration = drugDetail.quantityTotal / drugDetail.ettiquete.length

    return (
        <View style={styles.container}>
            <GreyHeader 
                title="Rincian Konsumsi Obat"
                navigate={navigation.navigate}
                navigateBack="Reminder"
            />
            <ScrollView>

                {/* Top Container */}
                <View style={styles.topContainer}>
                    <Image source={{uri: drugDetail.imageUrl}} style={styles.imageContainer}/>
                    <View style={styles.topDetailContainer}>
                       <View style={styles.centeredSection}>
                           <Text style={styles.upperCenteredSectionText}>Frekuensi</Text>
                           <Text style={styles.lowerCenteredSectionText}>{`${drugDetail.ettiquete.length}x Sehari`}</Text>
                       </View>
                       <View style={styles.centeredSection}>
                           <Text style={styles.upperCenteredSectionText}>Dosis</Text>
                           <Text style={styles.lowerCenteredSectionText}>1.0 Tablet</Text>
                       </View>
                       <View style={styles.centeredSection}>
                           <Text style={styles.upperCenteredSectionText}>Durasi</Text>
                           <Text style={styles.lowerCenteredSectionText}>{`${duration} Hari`}</Text>
                       </View>
                    </View>
                </View>

                {/* Top Lower Container */}
                <View style={styles.upperMiddleContainer}>
                    <Text style={styles.drugNameText}>{drugDetail.drugName} 200 mg {drugDetail.drugQuantity} {drugDetail.type}</Text>
                    <Text style={styles.drugDescriptionText}>Cordarone bermanfaat untuk mengatasi irama jantung yang tidak teratur (aritmia). Obat ini digunakan sebagai pengobatan lanjutan apabila antiaritmia lain tidak memberikan perkembangan.</Text>
                    <Text style={[{paddingTop: 20, color: 'rgba(221, 221, 221, 1)'}]}>Notes: </Text>
                    <View style={styles.notesContainer}>
                        <TextInput
                            style={styles.inputText}
                            multiline={true}
                            autoCapitalize={"sentences"}
                            autoFocus={false}
                            placeholder={"Notes"}
                            placeholderTextColor="#8b8b8b"
                            onChangeText={(text) =>
                                setNotes(text)
                            }
                            value={notes}
                        />
                    </View>
                </View>

                {/* Middle Container */}
                <View style={styles.drugStatusDetailContainer}>
                    <View style={styles.centeredSection}>
                        <Text style={styles.upperCenteredSectionText}>21</Text>
                        <Text style={styles.lowerCenteredSectionText}>TOTAL OBAT</Text>
                    </View>
                    <View style={styles.centeredSection}>
                        <Text style={styles.upperCenteredSectionText}>04</Text>
                        <Text style={styles.lowerCenteredSectionText}>TERLEWAT</Text>
                    </View>
                    <View style={styles.centeredSection}>
                        <Text style={styles.upperCenteredSectionText}>17</Text>
                        <Text style={styles.lowerCenteredSectionText}>TERMINUM</Text>
                    </View>
                </View>

                {/* Calendar */}
                <View>
                    <Text style={styles.upperCenteredSectionText}>CALENDAR</Text>
                </View>

                {/* Bottom Container */}
                <DataTable style={styles.bottomContainer}>
                    <DataTable.Row style={{borderBottomWidth: 0 }}>
                        <DataTable.Cell style={{justifyContent: 'center', flex: 0.3}}><FontAwesome name="circle" size={10} color="#B5B5B5" /></DataTable.Cell>
                        <DataTable.Cell><Text style={{color: 'rgba(221, 221, 221, 1)'}}>07:00</Text></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={{borderBottomWidth: 0}}>
                        <DataTable.Cell style={{justifyContent: 'center', flex: 0.3}}><VerticalLine/></DataTable.Cell>
                        <DataTable.Cell><Text style={{color: 'green'}}>DIMINUM</Text></DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row style={{borderBottomWidth: 0 }}>
                        <DataTable.Cell style={{justifyContent: 'center', flex: 0.3}}><FontAwesome name="circle" size={10} color="#B5B5B5" /></DataTable.Cell>
                        <DataTable.Cell><Text style={{color: 'rgba(221, 221, 221, 1)'}}>13:00</Text></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={{borderBottomWidth: 0}}>
                        <DataTable.Cell style={{justifyContent: 'center', flex: 0.3}}><VerticalLine/></DataTable.Cell>
                        <DataTable.Cell><Text style={{color: 'red'}}>TERLEWAT</Text></DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(31, 31, 31, 1)',
    },

    topContainer: {
        flexDirection: "row",
        paddingVertical: 20,
        alignItems: "center",
        marginHorizontal: 20
    },

    imageContainer: {
        height: 150,
        width: 150,
    },

    centeredSection: {
        alignItems: "center",
        // justifyContent: "space-between",
        // height: 35,
    },

    topDetailContainer: {
        flex: 1,
        flexDirection: "row",
        marginHorizontal: 20,
        justifyContent: "space-between",
    },

    upperCenteredSectionText: {
        color: 'rgba(221, 221, 221, 1)',
        fontSize: 13,
        fontWeight: '300'
    },

    lowerCenteredSectionText: {
        color: 'rgba(221, 221, 221, 1)',
        fontSize: 13,
        fontWeight: '300',
        marginTop: 5
    },

    bottomDetailText: {
        color: 'rgba(221, 221, 221, 1)',
        fontSize: 14,
        fontWeight: '500'
    },

    upperMiddleContainer: {
        marginHorizontal: 20

    },
    
    inputText: {
        color: "rgba(131, 131, 131, 1)",
        paddingVertical: 5,
    },

    drugNameText: {
        color: 'rgba(221, 221, 221, 1)',
        fontSize: 20,
        fontWeight: '500'
    },

    drugDescriptionText: {
        color: 'rgba(181, 181, 181, 1)',
        fontSize: 18,
        fontWeight: '400'
    },

    notesContainer: {
        height: 80,
        borderWidth: 1,
        borderColor: 'rgba(71, 71, 71, 1)',
        paddingHorizontal: 20,
        borderRadius: 3,
    },

    drugStatusDetailContainer: {
        flexDirection: "row",
        alignSelf: 'stretch',
        paddingVertical: 20,
        marginTop: 20,
        backgroundColor: '#2F2F2F',
        justifyContent: "space-evenly"
    },

    bottomContainer: {
        width: dimWidth * 0.3,
        marginTop: 10,
    },

    eachDrugStatusContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    icon: {
        alignItems: "center",
        backgroundColor: 'yellow',

    },

    status: {
        paddingLeft: 7,
        backgroundColor: 'red',
    },
})

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(DrugDetail)