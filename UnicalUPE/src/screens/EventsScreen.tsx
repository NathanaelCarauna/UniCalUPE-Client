import * as React from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import DateSquare from '../components/DateSquare';

import EditScreenInfo from '../components/EditScreenInfo';
import EventComponent from '../components/EventComponent';
import MainView from '../components/MainView';
import { Text, View } from '../components/Themed';
import TitleMainScreen from '../components/TitleMainScreen';
import Colors from '../constants/Colors';
import { useEffect, useContext } from 'react';
import AppContext from '../contexts/appContext';

const fakeData = [
  {
    id: '1',
    title: "Palestra",
    local: 'Auditorio',
    presentor: 'Claudio',
    course: 'Engenharia de software',
    category: 'SURVEY'
  },
  {
    id: '2',
    title: "Workshop",
    local: 'Online',
    presentor: 'Felipe',
    course: 'Licenciatura',
    category: 'COURSE'
  },
  {
    id: '3',
    title: "Mini curso",
    local: 'Online',
    presentor: 'Fernando',
    course: 'Publico',
    category: 'PUBLIC'
  },
  {
    id: '4',
    title: "Mini curso",
    local: 'Online',
    presentor: 'Fernando',
    course: 'Publico',
    category: 'PUBLIC'
  },
]

const FakeDates = [
  { day: 'Dom', date: '21', selected: false },
  { day: 'Seg', date: '22', selected: false },
  { day: 'Ter', date: '23', selected: false },
  { day: 'Qua', date: '24', selected: true },
  { day: 'Qui', date: '25', selected: false },
  { day: 'Sex', date: '26', selected: false },
  { day: 'Sab', date: '27', selected: false },
]

export default function EventsScreen() {
  const { eventsList } = useContext(AppContext)

  useEffect(() => {
    console.log('tela de eventos')
    console.log(eventsList)
  })
  return (
    <>
      <MainView>
        <TitleMainScreen title='Eventos do Dia' />
        <View style={styles.legendContainer}>
          <Text style={styles.text}>Categoria</Text>
          <Text style={styles.text}>Evento</Text>
        </View>
        <FlatList
          data={fakeData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (<EventComponent event={item} />)}
          style={styles.eventList}
        />
      </MainView >
      <View style={styles.transparent}>
        <FlatList
          horizontal={true}
          data={FakeDates}
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
    backgroundColor: Colors.dark.background
  }
});
