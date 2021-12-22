import * as React from 'react';
import { StyleSheet, Button, TouchableOpacityBase, TouchableOpacity } from 'react-native';

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
export default function EventComponent({ event }: eventType) {
    const navigation = useNavigation();
    const { setCategoryColor} = useContext(AppContext)
    
    const categoryColor = setCategoryColor(event)

    function navigateEvent(props: { event: eventType }) {
        navigation.navigate('Event', { event: event })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={navigateEvent}>
            <View style={[styles.tagComponent, { backgroundColor: categoryColor }]}></View>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.eventContainer}
                colors={['#4c669f', '#3b5998', '#192f6a']}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{event.title}</Text>
                </View>
                {
                    event.course ? <Text style={styles.detailsText}>Curso: {event.course.name}</Text>
                    : <></>
                }
                
                <View style={styles.localContainer}>
                    <TabBarIcon name="map-marker" color={'white'} style={styles.icon} />
                    <Text style={styles.detailsText}>{event.local}</Text>
                </View>
                <View style={styles.presentorContainer}>
                    <TabBarIcon name="user" color={'white'} style={styles.icon} />
                    <Text style={styles.detailsText}>{event.presentor}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
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
        flexDirection: 'row',
        //alignItems: 'stretch',
        //justifyContent: 'space-around',
        marginTop: 15,
        marginHorizontal: 20,
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
        paddingVertical: 60,
        paddingHorizontal: 25,
        borderRadius: 22,
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
    localContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    presentorContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    icon: {
        marginRight: 10,
    },
    detailsText: {
        backgroundColor: 'transparent',
        color: 'white'
    }
});
