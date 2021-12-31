import * as React from 'react';
import { StyleSheet, Button, TouchableOpacityBase, TouchableOpacity, Image } from 'react-native';

import { Text, View } from './Themed';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import AppContext from '../contexts/appContext';

type eventType = {
    event: {
        id: string,
        title: string
        local: string
        presentor: string
        course: string
        category: string
        description: string
        endDate: string
        endHour: string
        link: string
        startDate: string
        startHour: string
    }
}
export default function EventComponent({event}) {

    const navigation = useNavigation();
    const { setCategoryColor } = useContext(AppContext)

    //const categoryColor = setCategoryColor(event)
    console.log(event)
    function navigateEvent(props: { event: eventType }) {
        navigation.navigate('Event', { event: event })
    }

    return (
        <View style={styles.container}>
                <TouchableOpacity style={{flex: 1}} onPress={navigateEvent}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        style={styles.eventContainer}
                        colors={['#4ca9df', '#a1ffb3']}
                    >
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{event.title}</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
        </View>
    );
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
    style: object
}) {
    return <FontAwesome size={20} {...props} />;
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'transparent',
        //marginHorizontal: 20,
        shadowColor: "#000",
        elevation: 10,
        borderRadius: 20,
    },
    container_out: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    titleContainer: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        paddingVertical: 5,
    },
    tagComponent: {
        backgroundColor: '#666',
        //paddingVertical: 60,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: 6,
        marginTop: 6,
        shadowColor: "#000",
        elevation: 2,
    },
    eventContainer: {
        borderRadius: 20,
        padding: 12,
        paddingLeft: 16,
        marginLeft: 10,
        backgroundColor: '#004369',
        flex: 1,
        
        

        //alignSelf:"stretch",
        //width: 230,
    },
    detailsText: {
        backgroundColor: 'transparent',
        color: 'white'
    }
});
