import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import { Text, View } from './Themed';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type eventType = {
    event: {
        id: string,
        title: string
        local: string
        presentor: string
        course: string
        category: string
    }
}
export default function EventComponent({ event }: eventType) {
    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'COURSE':
                return '#F9FA9B'
            case 'SURVEY':
                return '#FF7777'
            case 'PUBLIC':
                return '#CEECF0'
        }
    }
    const categoryColor = getCategoryColor(event.category)

    return (
        <View style={styles.container}>
            <View style={[styles.tagComponent, { backgroundColor: categoryColor }]}></View>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.eventContainer}
                colors={['#4c669f', '#3b5998', '#192f6a']}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{event.title}</Text>
                </View>
                <Text style={styles.detailsText}>Curso:{event.course}</Text>
                <View style={styles.localContainer}>
                    <TabBarIcon name="map-marker" color={'white'} style={styles.icon} />
                    <Text style={styles.detailsText}>{event.local}</Text>
                </View>
                <View style={styles.presentorContainer}>
                    <TabBarIcon name="user" color={'white'} style={styles.icon} />
                    <Text style={styles.detailsText}>{event.presentor}</Text>
                </View>
            </LinearGradient>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        marginHorizontal: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        backgroundColor: '#004369',
        width: 230,
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
