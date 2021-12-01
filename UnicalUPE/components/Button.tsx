import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';



export default function Button() {
    return (
        <TouchableOpacity style={styles.editButton}>
            <Text>
                Editar Perfil
            </Text>
        </TouchableOpacity>

    )}


    const styles = StyleSheet.create({
        editButton:{
            backgroundColor: Colors.Orange.background,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
        
        },
    })