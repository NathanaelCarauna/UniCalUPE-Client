import * as React from 'react';
import MainView from '../components/MainView';
import { ScrollView, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from "react-native-modal";

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import AppContext from '../contexts/appContext';
import { useContext, useState } from 'react';
import navigation from '../navigation';
import { FontAwesome } from '@expo/vector-icons';
import TabBarIcon from '../components/TabIcon';
import Timeline from 'react-native-timeline-flatlist'
import EventComponent from '../components/EventComponent';


export default function MyEvents() {
    const { user, getEventByUser, myEventsList } = useContext(AppContext)

    const renderDetail = (rowData, sectionID, rowID) => {

        return (
          <View style={{ flex: 1 }}>
            <EventComponent event={rowData}></EventComponent>
          </View>
        );
      };






    return (
        <MainView>
        <View style={styles.legendContainer}>
          <Text style={styles.text}>Hora</Text>
          <Text style={styles.text}>Curso</Text>
          <Text style={styles.text}>Evento</Text>
        </View>
        <Timeline
          data={myEventsList}
          descriptionStyle={{ color: 'gray' }}
          renderDetail={renderDetail}
          timeStyle={{ textAlign: 'center', backgroundColor: '#4ca9df', color: 'white', padding: 5, borderRadius: 13, marginTop: -4 }}
          lineWidth={0}
          rowContainerStyle={{ marginTop: 20 }}
          
          detailContainerStyle={{ marginTop: -26 }}
          style={{ margin: 10 }}
          innerCircle='dot'
          circleSize={20}
        />
        
        </MainView>


    );
}

const styles = StyleSheet.create({
    container: {
      flex: 5,
      borderRadius: 16,
      borderTopStartRadius: 0,
      borderTopEndRadius: 0,
    },
    legendContainer: {
      marginTop: 15,
      flexDirection: 'row',
    },
    text: {
      fontSize: 12,
      color: 'gray',
      marginStart: 15
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    eventList: {
      flex: 1,
      marginBottom: 10,
      marginHorizontal: 10,
      height: '85%',
  
    },
    back: {
      flex: 1,
      backgroundColor: Colors.dark.background
    },
    navigation: {
      flex: 1,
      backgroundColor: Colors.dark.background
    },
    transparent: {
      backgroundColor: 'white',
    },
    flat: {
      alignItems: 'center',
      padding: 5,
      
    },
    notFound: {
      fontSize: 16,
      alignSelf: 'center',
      marginTop: 40,
    },
    title: {
      padding: 16,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    rowTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    descriptionContainer: {
      flexDirection: 'row',
      paddingRight: 50,
    },
    imageStyle: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    textDescriptionStyle: {
      marginLeft: 10,
      color: 'gray',
    },
  

});