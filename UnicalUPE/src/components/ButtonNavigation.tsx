import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';

type PropsButton = {
    navigation: CompositeNavigationProp<BottomTabNavigationProp<RootTabParamList, "Navigation">, NativeStackNavigationProp<RootStackParamList, string>>
    buttonText: string,
    backColor: string,
    destination: string | Function
}

export default function ButtonNavigation(props: PropsButton) {

    const buttonText = props.buttonText
    const backgroundColor = props.backColor || Colors.Orange.background
    //const details = props.detailColor 
    const navigate = () => {
        if (typeof props.destination == 'function') {
            props.destination()
            return
        }
        props.navigation.navigate(props.destination)
    }
    return (
        <TouchableOpacity
            style={[styles.navButton, { backgroundColor: 'white', borderColor: backgroundColor }]}
            onPress={navigate}
        >
            <TabBarIcon name={buttonText} color={props.backColor} style={styles.icon} />
        </TouchableOpacity>

    )
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
    style: object
}) {
    return <FontAwesome size={20} {...props} />;
}

const styles = StyleSheet.create({
    navButton: {
        // flex: 1,
        backgroundColor: Colors.Orange.background,
        alignItems: 'center',
        justifyContent: 'center',
        height: 42,
        width: 45,
        borderRadius: 16,
        margin: 10,
        overflow: 'hidden',
        borderWidth: 2,

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
    },
    icon: {
        alignSelf: 'center'
    }
})