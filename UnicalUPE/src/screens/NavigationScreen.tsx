import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { RootTabScreenProps } from '../types';
import ButtonNavigation from '../components/ButtonNavigation'
import Colors from '../constants/Colors';
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
    const originalList = buttons
    if (user) {
      if (!user.course) {
        console.log('Usuário não tem curso')
        const filteredButtons = buttons.filter(b => b.buttonText != 'Perfil'
          && b.buttonText != 'Sair'
          && b.buttonText != 'Notificações'
        )
        setButtons(filteredButtons)
      } else {
        setButtons(originalList)
      }
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