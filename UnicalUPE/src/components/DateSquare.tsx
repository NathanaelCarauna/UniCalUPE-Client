import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Alert, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

type propsType = { day: string, date: string, selected: boolean }

export default function DateSquare({ day, date, selected }: propsType) {
    const setSelected = (selected: boolean) => {
        return selected
            ? { color: {color: 'white'}, backColorTop: '#EA3636', backColorBottom: '#FFAB91' }
            : { backColorTop: '#fff', backColorBottom: '#fff' }
    }
    const selectStyle = setSelected(selected);
    return (
        <TouchableOpacity onPress={() => Alert.alert(date)}>
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
        margin: 8,
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