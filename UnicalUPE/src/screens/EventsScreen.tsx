import * as React from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
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

export default function EventsScreen() {

  const navigation = useNavigation();
  const { eventsList, setEventByDateRequested, getEventsByDate, selectedDate } = useContext(AppContext)
  const [refresh, setRefresh] = useState(false);
  const [dates, setDates] = useState(
    [
      { id: 0, day: 'Dom', date: '21', month: null, year: null, selected: false },
      { id: 1, day: 'Seg', date: '22', month: null, year: null, selected: false },
      { id: 2, day: 'Ter', date: '23', month: null, year: null, selected: false },
      { id: 3, day: 'Qua', date: '24', month: null, year: null, selected: false },
      { id: 4, day: 'Qui', date: '25', month: null, year: null, selected: false },
      { id: 5, day: 'Sex', date: '26', month: null, year: null, selected: false },
      { id: 6, day: 'Sab', date: '27', month: null, year: null, selected: false },
    ]
  )

  const fillWeek = (pDates, selectedDate) => {
    var currentDay: Date;
    if (selectedDate.length > 0) {
      currentDay = new Date(selectedDate)
      currentDay.setDate(currentDay.getDate())
      console.log('Custom date initialized', selectedDate)
    } else {
      currentDay = new Date();
      console.log('Current date initialized')
    }

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

  const GetEventsByDate = (item) =>{
    getEventsByDate(`${item.year}-${item.month + 1}-${item.date}`)
    navigation.navigate('Eventos')
  }

  const ItemSeprator = () => <View style={{
    width: 6,
    backgroundColor: 'transparent',
  }} />

  

  return (
    <>
      <MainView>
        <TitleMainScreen title='Eventos do Dia' />
        <View style={styles.legendContainer}>
          <Text style={styles.text}>Categoria</Text>
          <Text style={styles.text}>Evento</Text>
        </View>
        {
          eventsList.length > 0 ?
            <FlatList
              data={eventsList.filter(event => event.startDate == selectedDate)}
              extraData={refresh}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (<EventComponent event={item} />)}
              style={styles.eventList}
            />
            : <Text style={styles.notFound}>Nenhum evento encontrado para esse dia</Text>
        }
      </MainView >
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
              func={getEventsByDate}
            />)}
        />
      </View>
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
    marginStart: 25
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
    backgroundColor: Colors.dark.background,
  },
  flat: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: Colors.dark.background,
  },
  notFound: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 40,
  }
});
