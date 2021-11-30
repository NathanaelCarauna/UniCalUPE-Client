import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import ButtonDetail from '../assets/images/ButtonDetail.svg';



export default function ButtonNavigation(props) {    
    const buttonText = props.buttonText
    const backgroundColor = props.backColor || Colors.Orange.background
    const details = props.detailColor
    const navigate = () => {
        props.navigation.navigate(props.destination)
    }
    return (
        <TouchableOpacity 
            style={[styles.navButton, {backgroundColor: backgroundColor}]}
            onPress={navigate}
        >
            <ButtonDetail fill='#123' style={styles.buttonDetail} />
            <Text style={styles.buttonName}>
                {buttonText}
            </Text>
        </TouchableOpacity>

    )
}

function SetDetail(){

}

const styles = StyleSheet.create({
    navButton: {
        flex: 1,
        backgroundColor: Colors.Orange.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: Layout.window.width / 2.6,
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