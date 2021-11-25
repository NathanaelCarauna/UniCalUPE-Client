import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';



export default function ButtonNavigation() {
    return (
        <TouchableOpacity style={styles.navButton}>
            <Text>
                button
            </Text>
        </TouchableOpacity>

    )}


    const styles = StyleSheet.create({
        navButton:{
            backgroundColor: Colors.Orange.background,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10
        
        },
    })