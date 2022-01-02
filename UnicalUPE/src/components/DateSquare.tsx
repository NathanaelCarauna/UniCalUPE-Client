import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { Text} from './Themed';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

type propsType = { day: string, date: string, selected: boolean, func: Function }

export default function DateSquare({ day, date, selected, func }: propsType) {
    const setSelected = (selected: boolean) => {
        return selected
            ? { color: {color: 'white'}, background: '#4ca9df'}
            : { backColorTop: '#fff', backColorBottom: '#fff' }
    }
    const selectStyle = setSelected(selected);    

    return (
        <TouchableOpacity style={[styles.square, {backgroundColor: selectStyle.background}]} onPress={func}>
            <Text style={[styles.Text, selectStyle.color]}>{day }</Text>                                    
            <Text style={[styles.number, date == new Date().getDate() ? {color: Colors.dark.background} :  selectStyle.color]}>{date}</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    square: {
        width: 48,
        height: 65,
        paddingVertical: 5,
        borderRadius: 15,
        borderColor: Colors.dark.background,
        borderWidth: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    number: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },
    Text: {
        fontSize: 12,
        color: Colors.dark.background
        // color: '#BCC1CD'
    }
})