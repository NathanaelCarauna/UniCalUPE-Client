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
import { useContext } from 'react';
import AppContext from '../contexts/appContext';
import { useEffect } from 'react';
import { useState } from 'react';

export default function NavigationScreen({ navigation }: RootTabScreenProps<'Navigation'>) {
  const { user, signOut } = useContext(AppContext)

  const [buttons, setButtons] = useState([
    {
      buttonText: 'Login',
      destination: 'Login',
      navigation: navigation,
      backColor: '',
    },
    {
      buttonText: 'Perfil',
      destination: 'Profile',
      navigation: navigation,
      backColor: Colors.Yellow.background,
    },
    {
      buttonText: 'Notificações',
      destination: 'Notifications',
      navigation: navigation,
      backColor: Colors.Green.background,
    },
    {
      buttonText: 'Sobre',
      destination: 'About',
      navigation: navigation,
      backColor: Colors.Red.background,
    },
    {
      buttonText: 'Adicionar Evento',
      destination: 'AddEvent',
      navigation: navigation,
      backColor: Colors.Blue.background,
    },
    {
      buttonText: 'Sair',
      destination: signOut,
      navigation: navigation,
      backColor: Colors.Blue.background,
    },
  ])

  useEffect(() => {
    console.log('Filter buttons called')
    console.log(user)
    const originalList = buttons
    if (!user) {
      console.log('Teste')
      const filteredButtons = buttons.filter(b => b.buttonText != 'Perfil'
        && b.buttonText != 'Sair'
        && b.buttonText != 'Notificações'
      )
      setButtons(filteredButtons)
    } else {
      setButtons(originalList)
    }
  }, [user])

  return (
    <MainView>
      <TitleMainScreen title='Navegação' />
      <FlatList
        key={'_'}
        data={buttons}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <ButtonNavigation
              buttonText={item.buttonText}
              destination={item.destination}
              navigation={item.navigation}
              backColor={item.backColor}
            />
          )
        }}
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
