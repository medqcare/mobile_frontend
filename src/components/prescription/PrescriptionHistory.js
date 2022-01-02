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

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function PrescriptionTodaysList({props, prescriptions }) {
    const [load, setLoad] = useState(false)
    const [content, setContent] = useState(prescriptions)

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
            style={styles.eachPrescriptionContainer}
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
                                style={{paddingTop: dimHeight * 0.01219, paddingLeft: dimWidth * 0.01216}} 
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
                                style={styles.eachDrugContainer}    
                            >
                                <View style={index !== 0 ? {marginTop: dimHeight * 0.02438} : null}>
                                    <Text style={textStyles.lighterText}>{el.drugName} 200 mg {el.drugQuantity} Tablet</Text>
                                </View>

                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <View style={{paddingTop: dimHeight * 0.01219, flexDirection: "row", alignItems: "center"}}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <AntDesign 
                                                name="clockcircleo" 
                                                size={dimWidth * 0.030} 
                                                color="rgba(128, 128, 128, 1)" 
                                            />
                                            <Text style={[textStyles.darkerText, {paddingLeft: 10}]}>{el.ettiquete.length} x sehari</Text>
                                        </View>
                                        <View style={{paddingLeft: dimWidth * 0.01216}}>
                                            <Entypo name="dot-single" size={24} color="rgba(181, 181, 181, 1)" />
                                        </View>
                                        <View style={{paddingLeft: dimWidth * 0.01216}}>
                                            <Text style={textStyles.darkerText}>{el.dose[0]} Kapsul</Text>
                                        </View>
                                    </View>

                                    {el.information === 'Before Meal' ?
                                        <View 
                                            style={{
                                                flexDirection: "row", 
                                                alignItems: "center", 
                                                borderWidth: 1, 
                                                borderRadius: 20, 
                                                paddingVertical: dimHeight * 0.0061, 
                                                paddingHorizontal: dimWidth * 0.02431,
                                                borderColor: 'rgba(5, 102, 157, 1)'
                                            }}>
                                            <Entypo name="controller-play" size={15} color="rgba(5, 102, 157, 1)"  style={{transform: [{rotateY: '180deg'}]}}/>
                                            <Text style={[textStyles.lighterText, {paddingLeft: dimWidth * 0.00973}]}>Sebelum Makan</Text>
                                        </View> :
                                        <View 
                                            style={{
                                                flexDirection: "row", 
                                                alignItems: "center", 
                                                borderWidth: 1, 
                                                borderRadius: 20, 
                                                paddingVertical: dimHeight * 0.0061, 
                                                paddingHorizontal: dimWidth * 0.02431,
                                                borderColor: 'rgba(5, 157, 157, 1)'
                                            }}>
                                            <Entypo name="controller-play" size={15} color="rgba(5, 157, 157, 1)" />
                                            <Text style={[textStyles.lighterText, {paddingLeft: dimWidth * 0.00973}]}>Sesudah Makan</Text>
                                        </View>
                                    }
                                </View>

                                <View style={{paddingTop: dimHeight * 0.01219}}>
                                    <Text style={textStyles.lighterText}>Catatan: </Text>
                                    <Text style={textStyles.lighterText}>{el.notes}</Text>
                                </View>

                                <View style={styles.separator}/>
                            </View>
                        )
                    })}
                    
                    <TouchableOpacity 
                        style={{flexDirection: "row", alignItems: "center", paddingTop: 15}}
                        onPress={() => setSections(activeSections, true, _)}
                    >
                        <Text style={textStyles.redText}>Tutup</Text>
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
        load ? <ActivityIndicator color="blue" size={'small'}/> :
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
        width: dimWidth * 0.9
    },

    headerInnerContainer: {
        paddingVertical: dimHeight * 0.01219,
        paddingHorizontal: dimWidth * 0.02431
    },

    headerDate: {
        ...textStyles.lighterText,
    },

    drugAmount: {
        ...textStyles.lighterText,
        paddingTop: dimHeight * 0.01219
    },

    expandButton: {
        ...textStyles.redText,
        paddingTop: dimHeight * 0.01219
    },

    drugsContainer: {
        backgroundColor: 'rgba(47, 47, 47, 1)',
        width: dimWidth * 0.9,
    },

    contentInnerContainer: {
        paddingVertical: dimHeight * 0.01219,
        paddingHorizontal: dimWidth * 0.02431
    },

    eachDrugContainer: {
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