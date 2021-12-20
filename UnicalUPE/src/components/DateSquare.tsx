import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { Text} from './Themed';
import { LinearGradient } from 'expo-linear-gradient';

type propsType = { day: string, date: string, selected: boolean, func: Function }

export default function DateSquare({ day, date, selected, func }: propsType) {
    const setSelected = (selected: boolean) => {
        return selected
            ? { color: {color: 'white'}, backColorTop: '#EA3636', backColorBottom: '#FFAB91' }
            : { backColorTop: '#fff', backColorBottom: '#fff' }
    }
    const selectStyle = setSelected(selected);
    return (
        <TouchableOpacity onPress={func}>
            <LinearGradient style={styles.square} colors={[selectStyle.backColorTop, selectStyle.backColorBottom]}>
                <Text style={[styles.Text, selectStyle.color]}>{day}</Text>
                <Text style={[styles.number, selectStyle.color]}>{date}</Text>
            </LinearGradient>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    square: {
        width: 48,
        height: 70,
        //margin: 5,
        paddingVertical: 10,
        borderRadius: 15,
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
        color: '#BCC1CD'
        // color: '#BCC1CD'
    }
})