import * as React from 'react';
import { StyleSheet, Button, FlatList } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ButtonNavigation from '../components/ButtonNavigation'
import Colors from '../constants/Colors';
import { TabBarItem } from 'react-native-tab-view';
import { isTemplateElement } from '@babel/types';
import TitleMainScreen from '../components/TitleMainScreen';
import MainView from '../components/MainView';

export default function NavigationScreen({ navigation }: RootTabScreenProps<'Navigation'>) {

  const DATA = [
    {
      buttonText: 'Login',
      destination: 'Login',
      navigation: navigation,
      backColor: '',
      detailColor: 'yellow',
    },
    {
      buttonText: 'Perfil',
      destination: 'Profile',
      navigation: navigation,
      backColor: '',
      detailColor: 'yellow',
    },
    {
      buttonText: 'Notificações',
      destination: 'Notifications',
      navigation: navigation,
      backColor: '#2AB75A',
      detailColor: 'yellow',
    },
    {
      buttonText: 'Sobre',
      destination: 'About',
      navigation: navigation,
      backColor: Colors.Red.background,
      detailColor: 'red',
    },
    {
      buttonText: 'Adicionar Evento',
      destination: 'AddEvent',
      navigation: navigation,
      backColor: '#60D0D6',
      detailColor: 'yellow',
    },
  ]
  return (
    <MainView>
      <TitleMainScreen title='Navegação' />
      <FlatList
        key={'_'}
        data={DATA}
        horizontal={false}
        renderItem={({ item }) => (
          <ButtonNavigation
            buttonText={item.buttonText}
            destination={item.destination}
            navigation={item.navigation}
            backColor={item.backColor}
            detailColor={item.detailColor}
          />
        )}
        keyExtractor={(item) => item.buttonText}
        numColumns={2}
        style={{
          alignSelf: 'stretch',
          margin: 10,          
        }}
      />
    </MainView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 11,
    //alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    //marginBottom: 20

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
  flex_display: {
    flex: 1,
    display: 'flex',
    //flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    //flexWrap: 'wrap',
    margin: 10,
  },
  back: {
    flex: 1,
    backgroundColor: Colors.dark.background
  },
});
