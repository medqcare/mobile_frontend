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

const dimHeight = Dimensions.get("window").height;
const dimWidth = Dimensions.get("window").width;

function PrescriptionTodaysList({props, prescriptions }) {
    const [load, setLoad] = useState(false)
    const [content, setContent] = useState(prescriptions)

    useEffect(() => {
        // if(drugs.length > 0){
        //     Promise.all(drugs.map(el => {
        //         const newObject = {
        //             ...el,
        //             type: 'Tablet',
        //             imageUrl: 'https://d2qjkwm11akmwu.cloudfront.net/products/25c2c4a4-0241-403c-a9c0-67b51923ba4d_product_image_url.webp',
        //         }
        //         return newObject
        //     }))
        //     .then(result => {
        //         setContent(result)
        //         setLoad(false)
        //     })
        // } else {
        //     setContent([])
        //     setLoad(false)
        // }
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
        return (
          <Animatable.View
            key={_}
            duration={400}
            style={styles.eachDrugContainer}
            transition="backgroundColor"
        >
           
        </Animatable.View>
        );
    };

    const renderContent = (section, _, isActive) => {
        
        return (
            <Animatable.View
                key={_}
                duration={400}
                style={styles.reminderContainer}
                transition="backgroundColor">
                    
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
	
});


export default PrescriptionTodaysList