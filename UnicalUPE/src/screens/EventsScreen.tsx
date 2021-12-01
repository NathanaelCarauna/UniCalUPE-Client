import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import MainView from '../components/MainView';
import { Text, View } from '../components/Themed';
import TitleMainScreen from '../components/TitleMainScreen';

export default function EventsScreen() {
  return (
    <MainView>
       <TitleMainScreen title='Eventos do Dia'/>
    </MainView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
