import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { RootTabScreenProps } from '../types';
import ButtonNavigation from '../components/ButtonNavigation'
import TitleMainScreen from '../components/TitleMainScreen';
import MainView from '../components/MainView';
import { useContext } from 'react';
import AppContext from '../contexts/appContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { anonymousButtons, studentButtons, adminButtons} from '../constants/NavigationButtons';
export default function NavigationScreen({ navigation }: RootTabScreenProps<'Navigation'>) {
  const { user, signOut } = useContext(AppContext)
  const [buttons, setButtons] = useState()

  useEffect(() => {
    console.log('Filter buttons called')
    if (user) {
      if(user.accountType == 'STUDENT')
        setButtons(studentButtons(navigation, signOut))
      else if(user.accountType == 'ADM')
        setButtons(adminButtons(navigation, signOut))
      else
        setButtons(anonymousButtons(navigation, signOut))      
    } else {
      setButtons(anonymousButtons(navigation, signOut))
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