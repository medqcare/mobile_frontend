import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, MaterialIcons, FontAwesome  } from '@expo/vector-icons';
import ToggleSwitch from 'toggle-switch-react-native'
import * as Animatable from 'react-native-animatable';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
  } from 'react-native-reanimated';

import Accordion from 'react-native-collapsible/Accordion';
import ReminderSkippedLogo from '../../assets/svg/ReminderSkippedLogo'
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

    useEffect(() => {
    }, [])


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
        const date = `${created.getDate()}/${created.getMonth()}/${created.getFullYear()}`
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
                        <Text style={styles.drugAmount}>Total {drugAmount} Obat</Text>
                        <View
                            style={{flexDirection: "row", alignItems: "center"}}    
                        >
                            <Text style={styles.expandButton}>Selengkapnya</Text>
                            <MaterialIcons 
                                name="keyboard-arrow-down" 
                                size={dimWidth * 0.05} 
                                color="rgba(243, 115, 53, 1)"
                                style={{paddingTop: dimHeight * 0.01219, paddingLeft: 5}} 
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
                            <View key={index}>
                                <Text style={textStyles.lighterText}>{el.drugName}</Text>
                            </View>
                        )
                    })}
                </View>
            </Animatable.View>
        );
    };
  
    return (
        load ? <ActivityIndicator color="blue" size={'small'}/> :
        content?.length > 0 ? 
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
                <Text style={styles.lighterText}>Belum Ada Pengingat</Text>
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
});


export default PrescriptionTodaysList