import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

type PropsButton = {

    title: string,
    date: string,
    category: string,
    event: object
}

export default function Notification({ title, category, date, event }: PropsButton) {
    const notificationDate = new Date(date);
    const navigation = useNavigation();
    const [showData, setShowData] = useState(false);

    const ButtonDelete = () =>{
        Alert.alert("delete notification")
    }
    const showDataMode = () => {
        setShowData(!showData);
        console.log(date)
      };

    function navigateEvent(props: { event: eventType }) {
        if (event != null)
            navigation.navigate('Event', { event: event })
    }
    return (
        <TouchableOpacity style={styles.bloco} onPress={navigateEvent}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.flex} colors={["#2AB75A", "#A0FFA3"]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {category == "PESQUISA" ? 'Nova pesquisa: ' : 'Novo Evento: '} {title}
                    </Text>
                    <TouchableOpacity onPress={showDataMode}>
                        <TabBarIcon style={styles.options} name="ellipsis-v" color={'white'} />
                    </TouchableOpacity>
                    {showData &&(
                        <TouchableOpacity style={styles.button} onPress={ButtonDelete}>
                        <Text style={{color: 'black'}}>Delete</Text>
                    </TouchableOpacity>
                    )}
                    
                </View>
                <Text style={styles.data}>
                    {notificationDate.getDate()}/{notificationDate.getMonth()}/{notificationDate.getFullYear()}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
    style: object
}) {
    return <FontAwesome size={30} {...props} />;
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
        //alignSelf: 'flex-end',
        marginStart: 20,
        marginBottom: 10,
        color: 'white'
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
    },
    button:{
        position: 'absolute',
        backgroundColor: 'white',
        width: 80,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right:30,
        borderRadius:15,
        top:1
        
        
    }
})