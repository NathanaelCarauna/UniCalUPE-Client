import React, { useEffect } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { eventType, PropsButtonNotification, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import TabBarIcon from './TabIcon';


export default function Notification({ title, category, date, event, notification, visualized, toggleModal, setSelectedNotification }: PropsButtonNotification) {
    const notificationDate = new Date(date);
    const navigation = useNavigation();
    const [showData, setShowData] = useState(false);

    const handleTogle = () => {
        setSelectedNotification(notification)
        toggleModal()
    }
    function navigateEvent(props: { event: eventType }) {
        if (event != null)
            navigation.navigate('Event', { event: event, notification })
    }
    return (
        <TouchableOpacity style={styles.bloco} onPress={navigateEvent}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.flex} colors={["#fff", "#fff"]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {category == "PESQUISA" ? 'Nova pesquisa: ' : 'Novo Evento: '} {title}
                    </Text>
                    <Text style={styles.data}>
                        {notificationDate.getDate()}/{notificationDate.getMonth()}/{notificationDate.getFullYear()} {notificationDate.getHours()}:{notificationDate.getMinutes()}
                    </Text>
                </View>
                <View style={styles.optionsContainer}>
                    {!visualized ? <TabBarIcon style={styles.options} name="exclamation" color={'orange'} />
                        : <TabBarIcon size={20} style={styles.options} name="check" color={'darkgreen'} />
                    }
                    <TouchableOpacity onPress={handleTogle}>
                        <TabBarIcon size={20} style={styles.options} name="trash" color={Colors.Red.background} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    title: {
        flex: 1,
        alignSelf: 'flex-start',
        // marginBottom:10,
        marginStart: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.Green.background
    },
    data: {
        //alignSelf: 'flex-end',
        marginStart: 20,
        marginBottom: 10,
        color: 'gray'
    },
    bloco: {
        flex:1,
        margin: 10,
        marginBottom: 10,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: Colors.Green.background
    },
    titleContainer: {
        flex: 5,
        marginVertical: 8,
        backgroundColor: 'transparent',
        alignContent: 'center',

    },
    options: {
        // alignSelf: 'flex-end',
        marginEnd: 15,
        marginVertical: 4,
        // marginTop: 15,
        fontSize: 16,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        position: 'absolute',
        backgroundColor: 'green',
        width: 80,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        borderRadius: 15,
        top: 1
    },
    optionsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    }
})