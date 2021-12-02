import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import ButtonDetail from '../../assets/images/ButtonDetail.svg';
import ButtonDetailRed from '../../assets/images/ButtonDetailRed.svg';
import ButtonDetailBlue from '../../assets/images/ButtonDetailBlue.svg';
import ButtonDetailGreen from '../../assets/images/ButtonDetailGreen.svg';
import ButtonDetailYellow from '../../assets/images/ButtonDetailYellow.svg';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type PropsButton = {
    detailColor: string,
    navigation: CompositeNavigationProp<BottomTabNavigationProp<RootTabParamList, "Navigation">, NativeStackNavigationProp<RootStackParamList, string>>
    buttonText: string,
    backColor: string,
    destination: string
}

export default function ButtonNavigation(props: PropsButton) {
    const buttonText = props.buttonText
    const backgroundColor = props.backColor || Colors.Orange.background
    //const details = props.detailColor 
    const navigate = () => {
        props.navigation.navigate(props.destination)
    }
    return (
        <TouchableOpacity
            style={[styles.navButton, { backgroundColor: backgroundColor }]}
            onPress={navigate}
        >
            {props.backColor == Colors.Red.background 
            ? <ButtonDetailRed fill='#123' style={styles.buttonDetail} /> 
            : <></>
            }
            {props.backColor == Colors.Blue.background 
            ? <ButtonDetailBlue fill='#123' style={styles.buttonDetail} /> 
            : <></>
            }
            {props.backColor == '' 
            ? <ButtonDetail fill='#123' style={styles.buttonDetail} /> 
            : <></>
            }
            {props.backColor == Colors.Green.background
            ? <ButtonDetailGreen fill='#123' style={styles.buttonDetail} /> 
            : <></>
            }
            {props.backColor == Colors.Yellow.background
            ? <ButtonDetailYellow fill='#123' style={styles.buttonDetail} /> 
            : <></>
            }
            <Text style={styles.buttonName}>
                {buttonText}
            </Text>
        </TouchableOpacity>

    )
}

function SetDetail() {

}

const styles = StyleSheet.create({
    navButton: {
        flex: 1,
        backgroundColor: Colors.Orange.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 140,
        width: 200,
        borderRadius: 16,
        margin: 10,
        overflow: 'hidden',

    },
    buttonDetail: {
        alignSelf: 'flex-end',
        color: 'white'
    },
    buttonName: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})