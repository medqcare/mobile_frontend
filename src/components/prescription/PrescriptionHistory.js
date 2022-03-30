import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
  } from 'react-native-reanimated';

import Accordion from 'react-native-collapsible/Accordion';
import { ActivityIndicator } from "react-native-paper";
import withZero from "../../helpers/withZero";
import { getSelectedDate } from "../../helpers/todaysDate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fullMonthFormat } from '../../helpers/dateFormat'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function PrescriptionTodaysList({props }) {
    const { prescriptionHistory, isLoading, error } = props.prescriptionsReducer
    const [content, setContent] = useState(prescriptionHistory)

    const [activeSections, setActiveSections] = useState([]);
    const setSections = (sections, isClose, index) => {
        if(isClose){
            const newSections = sections.filter(el => {
                return el !== index
            })
            setActiveSections(newSections)
        } else {
            setActiveSections(sections.includes(undefined) ? [] : sections);
        }
    }; 

    

    const renderHeader = (section, _, isActive,) => {
        const created = new Date(section.createdAt)
        const date = `${withZero(created.getDate())}/${created.getMonth()}/${created.getFullYear()}`
        const formattedDate = `${fullMonthFormat(date, created.getDay())}`
        const drugAmount = section.drugs.length
        return (
          <Animatable.View
            key={_}
            duration={400}
            style={_ !== 0 ? styles.eachPrescriptionContainer : [styles.eachPrescriptionContainer, { marginTop: 0}]}
            transition="backgroundColor"
        >
           <View style={styles.headerInnerContainer}>
                <Text style={styles.headerDate}>{formattedDate}</Text>
                {isActive ? null : 
                    <>
                        <View
                            style={{flexDirection: "row", alignItems: "center"}}    
                        >
                            <Text style={styles.expandButton}>Selengkapnya</Text>
                            <MaterialIcons 
                                name="keyboard-arrow-down" 
                                size={dimWidth * 0.05} 
                                color="rgba(243, 115, 53, 1)"
                                style={styles.arrowDown} 
                            />
                        </View>
                    </>
                }
           </View>
        </Animatable.View>
        );
    };

    const renderContent = (section, _, isActive) => {
        const { drugs } = section
        return (
            <Animatable.View
                key={_}
                duration={400}
                style={styles.drugsContainer}
                transition="backgroundColor"
            >
                <View style={styles.contentInnerContainer}>
                    {drugs.map((el, index) => {
                        return (
                            <View 
                                key={index}
                                style={index !== 0 ? styles.afterIndexZero : null}      
                            >
                                <View style={{flexDirection: "row", }}>
                                    {el.information === 'Before Meal' ?
                                            <View style={styles.beforeMeal}>
                                                <Entypo name="controller-play" size={15} color="rgba(5, 102, 157, 1)"  style={{transform: [{rotateY: '180deg'}]}}/>
                                                <Text style={styles.information}>Sebelum Makan</Text>
                                            </View> :
                                            <View style={styles.afterMeal}>
                                                <Entypo name="controller-play" size={15} color="rgba(5, 157, 157, 1)" />
                                                <Text style={styles.information}>Sesudah Makan</Text>
                                            </View>
                                    }
                                </View>

                                <View style={{marginTop: dimHeight * 0.010024}}>
                                    <Text style={[
                                        textStyles.lighterText, 
                                        // { fontSize: RFValue(10, dimHeight) }
                                    ]}>{el.drugName} 200 mg {el.drugQuantity} Tablet</Text>
                                </View>

                                <View style={styles.contentMiddleLeftContainer}>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <AntDesign 
                                            name="clockcircleo" 
                                            size={dimWidth * 0.030} 
                                            color="rgba(128, 128, 128, 1)" 
                                        />
                                        <Text style={styles.ettiqueteText}>{el.etiquette.length} x sehari</Text>
                                    </View>
                                    <View style={styles.paddingLeftFive}>
                                        <Entypo name="dot-single" size={24} color="rgba(181, 181, 181, 1)"  />
                                    </View>
                                    <View style={styles.paddingLeftFive}>
                                        <Text style={
                                            [textStyles.darkerText, 
                                            // { fontSize: RFValue(10, dimHeight)}
                                        ]}>{el.dose[0]} Kapsul</Text>
                                    </View>
                                </View>

                                <View style={{paddingTop: dimHeight * 0.01219}}>
                                    <Text style={[
                                        textStyles.lighterText, 
                                        {fontStyle: 'italic', color: '#B5B5B5'} 
                                        // { fontSize: RFValue(12, dimHeight) }
                                    ]}>Catatan: </Text>
                                    {el.notes ? (
                                        <Text style={[
                                            textStyles.lighterText, 
                                            // { fontSize: RFValue(12, dimHeight) }
                                        ]}>{el.notes}</Text>
                                    ) : 
                                        <Text style={[
                                            textStyles.lighterText,
                                            {fontStyle: 'italic', color: '#B5B5B5'} 
                                            // { fontSize: RFValue(12, dimHeight) }
                                        ]}>Tidak ada catatan</Text>
                                    }
                                </View>

                                <View style={styles.separator}/>
                            </View>
                        )
                    })}
                    
                    <TouchableOpacity 
                        style={{flexDirection: "row", alignItems: "center", paddingTop:  dimHeight * 0.01829}}
                        onPress={() => setSections(activeSections, true, _)}
                    >
                        <Text style={[
                            textStyles.redText, 
                            // { fontSize: RFValue(10, dimHeight)} 
                        ]}>Tutup</Text>
                        <MaterialIcons 
                                name="keyboard-arrow-up" 
                                size={dimWidth * 0.05} 
                                color="rgba(243, 115, 53, 1)" 
                        />
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        );
    };
  
    return (
        content.length > 0 ? 
            <Accordion
                activeSections={activeSections}
                sections={content}
                touchableComponent={TouchableWithoutFeedback}
                expandMultiple={true}
                renderHeader={renderHeader}
                renderContent={renderContent}
                duration={400}
                onChange={setSections}
                containerStyle={{alignItems: "center"}}
            /> 
        : (
            <View style={styles.noDataContainer}>
                <Text style={textStyles.lighterText}>Belum Ada Resep</Text>
            </View>
        )
    );
}

// dimWidth = 411.42857142857144
// dimHeight = 820.5714285714286

const textStyles = {
	darkerText : {
		color: 'rgba(181, 181, 181, 1)', 
	},

	lighterText: {
		color: "rgba(221, 221, 221, 1)"
	},

    redText: {
        color: 'rgba(243, 115, 53, 1)'
    }
}

const styles = StyleSheet.create({
	eachPrescriptionContainer: {
        backgroundColor: 'rgba(47, 47, 47, 1)',
        width: dimWidth * 0.9,
        marginTop: dimHeight * 0.015,
    },

    headerInnerContainer: {
        paddingVertical: dimHeight * 0.01219,
        paddingHorizontal: dimWidth * 0.02431
    },

    headerDate: {
        ...textStyles.lighterText,
        // fontSize: RFValue(10, dimHeight)
        textTransform: 'uppercase'
    },

    drugAmount: {
        ...textStyles.lighterText,
        paddingTop: dimHeight * 0.01219,
        // fontSize: RFValue(10, dimHeight)
    },

    expandButton: {
        ...textStyles.redText,
        paddingTop: dimHeight * 0.01219,
        // fontSize: RFValue(10, dimHeight)
    },

    arrowDown: {
        paddingTop: dimHeight * 0.01219, 
        paddingLeft: dimWidth * 0.01216
    },

    drugsContainer: {
        backgroundColor: 'rgba(47, 47, 47, 1)',
        width: dimWidth * 0.9,
    },

    contentInnerContainer: {
        paddingBottom: dimHeight * 0.01219,
        paddingHorizontal: dimWidth * 0.04431
    },

    eachDrugContainer: {
    },

    afterIndexZero: {
        marginTop: dimHeight * 0.02438
    },

    contentMiddleContainer: {
        paddingTop: dimHeight * 0.01219, 
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center",
    },

    contentMiddleLeftContainer: {
        paddingTop: dimHeight * 0.01219,
        flexDirection: "row", 
        alignItems: "center"
    },

    ettiqueteText: {
        ...textStyles.darkerText,
        paddingLeft: dimWidth * 0.01631,
        // fontSize: RFValue(10, dimHeight)
    },

    paddingLeftFive: {
        // paddingLeft: dimWidth * 0.01331
    },

    beforeMeal: {
        flexDirection: "row", 
        alignItems: "center", 
        borderWidth: 1, 
        borderRadius: 20, 
        paddingVertical: dimHeight * 0.0061, 
        paddingHorizontal: dimWidth * 0.02431,
        borderColor: 'rgba(5, 102, 157, 1)'
    },

    afterMeal: {
        flexDirection: "row", 
        alignItems: "center", 
        borderWidth: 1, 
        borderRadius: 20, 
        paddingVertical: dimHeight * 0.0061, 
        paddingHorizontal: dimWidth * 0.02431,
        borderColor: 'rgba(5, 157, 157, 1)'
    },

    information: {
        ...textStyles.lighterText,
        paddingLeft: dimWidth * 0.00973,
        // fontSize: RFValue(10, dimHeight)
    },

    separator: {
        backgroundColor: '#545454',
        marginTop: 20,
        height: dimHeight * 0.0018279944
    },

    noDataContainer: {
        paddingTop: dimHeight * 0.015,
        justifyContent: "center",
        alignItems: "center"
    },
});


export default PrescriptionTodaysList   