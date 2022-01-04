import * as React from 'react';
import { FlatList, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import DateSquare from '../components/DateSquare';

import EditScreenInfo from '../components/EditScreenInfo';
import EventComponent from '../components/EventComponent';
import MainView from '../components/MainView';
import { Text, View } from '../components/Themed';
import TitleMainScreen from '../components/TitleMainScreen';
import Colors from '../constants/Colors';
import { useEffect, useContext, useState } from 'react';
import AppContext from '../contexts/appContext';
import { useNavigation } from '@react-navigation/native';
import Navigation from '../navigation';
import Timeline from 'react-native-timeline-flatlist'

export default function EventsScreen() {

  const { eventsList, setEventByDateRequested, selectedDate } = useContext(AppContext)
  const [refresh, setRefresh, loading] = useState(false);
  const [dates, setDates] = useState(
    [
      { id: 0, day: 'Dom', date: '21', month: '0', year: '2022', selected: false },
      { id: 1, day: 'Seg', date: '22', month: '0', year: '2022', selected: false },
      { id: 2, day: 'Ter', date: '23', month: '0', year: '2022', selected: false },
      { id: 3, day: 'Qua', date: '24', month: '0', year: '2022', selected: false },
      { id: 4, day: 'Qui', date: '25', month: '0', year: '2022', selected: false },
      { id: 5, day: 'Sex', date: '26', month: '0', year: '2022', selected: false },
      { id: 6, day: 'Sab', date: '27', month: '0', year: '2022', selected: false },
    ]
  )



  const fillWeek = (pDates, selectedDate) => {
    var currentDay: Date;
    if (selectedDate.length > 3) {
      currentDay = new Date(selectedDate)
      currentDay.setDate(currentDay.getDate()+1)      
      console.log('Data refresh:', selectedDate)
    } else {
      currentDay = new Date();
      console.log('Current date initialized')
    }

    console.log('##########################################################################################')
    console.log(currentDay.getDay(), currentDay.getDate(), currentDay.getMonth(), currentDay.getFullYear());
    pDates.forEach(item => {
      item.month = currentDay.getMonth()
      item.year = currentDay.getFullYear()
      if (item.id === currentDay.getDay()) {
        item.date = currentDay.getDate()
        item.selected = true
      }
      else if (item.id == currentDay.getDay() - 6) {
        item.date = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() - 6).getDate()
        item.selected = false
      }
      else if (item.id == currentDay.getDay() - 5) {
        item.date = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() - 5).getDate()
        item.selected = false
      }
      else if (item.id == currentDay.getDay() - 4) {
        item.date = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() - 4).getDate()
        item.selected = false
      }
      else if (item.id == currentDay.getDay() - 3) {
        item.date = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() - 3).getDate()
        item.selected = false
      }
      else if (item.id == currentDay.getDay() - 2) {
        item.date = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() - 2).getDate()
        item.selected = false
      }
      else if (item.id == currentDay.getDay() - 1) {
        item.date = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() - 1).getDate()
        item.selected = false
      }
      else if (item.id == currentDay.getDay() + 1) {
        item.date = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 1).getDate()
        item.selected = false
      }
      else if (item.id == currentDay.getDay() + 2) {
        item.date = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 2).getDate()
        item.selected = false
      }
      else if (item.id == currentDay.getDay() + 3) {
        item.date = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 3).getDate()
        item.selected = false
      }
      else if (item.id == currentDay.getDay() + 4) {
        item.date = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 4).getDate()
        item.selected = false
      }
      else if (item.id == currentDay.getDay() + 5) {
        item.date = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 5).getDate()
        item.selected = false
      }
      else if (item.id == currentDay.getDay() + 6) {
        item.date = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 6).getDate()
        item.selected = false
      }
    })
    setDates(pDates);
  }

  useEffect(() => {
    console.log('tela de eventos')
    setEventByDateRequested(false)
    fillWeek(dates, selectedDate)
    setRefresh(!refresh)
  }, [selectedDate])



  const ItemSeprator = () => <View style={{
    width: 6,
    backgroundColor: 'transparent',
  }} />
  const ItemHorizontalSeprator = () => <View style={{
    height: 6,
    backgroundColor: 'transparent',
  }} />

  const renderDetail = (rowData, sectionID, rowID) => {

    return (
      <View style={{ flex: 1 }}>
        <EventComponent event={rowData}></EventComponent>
      </View>
    );
  };

  if (loading) {
    return (
      (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color='#666' />
        </View>
      )
    )
  }
  return (
    <>
      <MainView>
        <View style={styles.flat}>
          <FlatList
            ItemSeparatorComponent={ItemSeprator}
            horizontal={true}
            data={dates}
            extraData={refresh}
            style={styles.transparent}
            keyExtractor={item => item.day}
            renderItem={({ item }) => (
              <DateSquare
                day={item.day}
                date={item.date}
                selected={item.selected}
                month={item.month}
                year={item.year}
              />)}
          />
        </View>
        <View style={styles.legendContainer}>
          <Text style={styles.text}>Hora</Text>
          <Text style={styles.text}>Curso</Text>
          <Text style={styles.text}>Evento</Text>
        </View>
        {
          eventsList.length > 0 ? 
          <Timeline
            data={eventsList}
            descriptionStyle={{ color: 'gray' }}
            renderDetail={renderDetail}
            timeStyle={{ textAlign: 'center', backgroundColor: '#4ca9df', color: 'white', padding: 5, borderRadius: 13, marginTop: -4 }}
            lineWidth={0}
            rowContainerStyle={{ marginTop: 20 }}
            // eventDetailStyle={{ marginTop: -20 }}
            detailContainerStyle={{ marginTop: -26 }}
            style={{ margin: 10 }}
            innerCircle='dot'
            circleSize={20}
          />
          : <Text style={styles.notFound}>Nenhum evento encontrado para esse dia</Text>
      }

      </MainView >
    </>
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
