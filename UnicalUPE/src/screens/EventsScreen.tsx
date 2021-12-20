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

export default function EventsScreen() {
  const { eventsList, setEventByDateRequested } = useContext(AppContext)
  const [dates, setDates] = useState(
    [
      { id: 0, day: 'Dom', date: '21', selected: false },
      { id: 1, day: 'Seg', date: '22', selected: false },
      { id: 2, day: 'Ter', date: '23', selected: false },
      { id: 3, day: 'Qua', date: '24', selected: true },
      { id: 4, day: 'Qui', date: '25', selected: false },
      { id: 5, day: 'Sex', date: '26', selected: false },
      { id: 6, day: 'Sab', date: '27', selected: false },
    ]
  )

  const fillWeek = (pDates) => {
    var today = new Date(2021, 11, 27);

    console.log(today.getDay(), today.getDate(), today.getMonth(), today.getFullYear());
    pDates.forEach(item => {
      if (item.id === today.getDay()) {
        item.date = today.getDate()
        item.selected = true
      }
      else if (item.id == today.getDay() - 6) {
        item.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6).getDate()
        item.selected = false
      }
      else if (item.id == today.getDay() - 5) {
        item.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5).getDate()
        item.selected = false
      }
      else if (item.id == today.getDay() - 4) {
        item.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4).getDate()
        item.selected = false
      }
      else if (item.id == today.getDay() - 3) {
        item.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3).getDate()
        item.selected = false
      }
      else if (item.id == today.getDay() - 2) {
        item.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2).getDate()
        item.selected = false
      }
      else if (item.id == today.getDay() - 1) {
        item.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).getDate()
        item.selected = false
      }
      else if (item.id == today.getDay() + 1) {
        item.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).getDate()
        item.selected = false
      }
      else if (item.id == today.getDay() + 2) {
        item.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).getDate()
        item.selected = false
      }
      else if (item.id == today.getDay() + 3) {
        item.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3).getDate()
        item.selected = false
      }
      else if (item.id == today.getDay() + 4) {
        item.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4).getDate()
        item.selected = false
      }
      else if (item.id == today.getDay() + 5) {
        item.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5).getDate()
        item.selected = false
      }
      else if (item.id == today.getDay() + 6) {
        item.date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6).getDate()
        item.selected = false
      }
    })
    setDates(pDates);
  }

  useEffect(() => {
    console.log('tela de eventos')
    setEventByDateRequested(false)
    fillWeek(dates)
  })


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
        <FlatList
          data={eventsList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (<EventComponent event={item} />)}
          style={styles.eventList}
        />
      </MainView >
      <View style={styles.flat}>
        <FlatList
          ItemSeparatorComponent={ItemSeprator}
          horizontal={true}
          data={dates}
          style={styles.transparent}
          keyExtractor={item => item.day}
          renderItem={({ item }) => (<DateSquare day={item.day} date={item.date} selected={item.selected} />)}
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
  }
});
