import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
//import ButtonDetail from '../../assets/images/ButtonDetail.svg';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

type PropsButton = {

    navigation: CompositeNavigationProp<BottomTabNavigationProp<RootTabParamList, "Navigation">, NativeStackNavigationProp<RootStackParamList, string>>
    Text: string,
    destination: string
}

export default function Notification(props: PropsButton) {
    const buttonText = props.Text
    const navigate = () => {
        props.navigation.navigate(props.destination)
    }
    return (
        <TouchableOpacity style={styles.bloco} onPress={navigate}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.flex} colors={["#2AB75A", "#A0FFA3"]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {buttonText}
                    </Text>
                    <TabBarIcon style={styles.options} name="ellipsis-v" color={'white'} />
                </View>
                <Text style={styles.data}>
                    00/00/00
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({

    title: {
        flex: 1,
        alignSelf: 'flex-start',
        // marginBottom:10,
        marginStart: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    data: {
        alignSelf: 'flex-end',
        marginEnd: 20,
        marginBottom: 10,
        color: Colors.blue.background
    },
    bloco: {
        alignSelf: 'stretch',
        backgroundColor: Colors.Red.background,
        margin: 10,
        marginBottom: 10,
        borderRadius: 16,
        overflow: 'hidden',

    },
    titleContainer: {        
        flex: 1,
        marginVertical: 8,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
        
    },
    options: {
        // alignSelf: 'flex-end',
        marginEnd: 15,
        // marginTop: 15,
        fontSize: 20,        
    },
    flex: {
        alignItems: 'baseline'
    }
})