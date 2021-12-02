import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import EventComponent from '../components/EventComponent';
import MainView from '../components/MainView';
import { Text, View } from '../components/Themed';
import TitleMainScreen from '../components/TitleMainScreen';
import Colors from '../constants/Colors';

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

export default function EventsScreen() {
  return (
    <View style={styles.back}>
      <View style={styles.container}>
        <View>
          <TitleMainScreen title='Eventos do Dia' />
          <FlatList
            data={fakeData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (<EventComponent event={item} />)}
            style={styles.eventList}
          />
        </View>
      </View>
      <View style={styles.navigation}>

      </View>
    </View>      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    borderRadius: 16,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  eventList: {
    margin: 10,
    height: '85%',    
  },
  back: {
    flex: 1,
    backgroundColor: Colors.dark.background
  },
  navigation: {
    flex: 1,
    backgroundColor: Colors.dark.background
  }
});
