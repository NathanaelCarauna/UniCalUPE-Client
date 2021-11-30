import * as React from 'react';
import { StyleSheet, Button} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ButtonNavigation from '../components/ButtonNavigation'
import Colors from '../constants/Colors';

export default function NavigationScreen({ navigation }: RootTabScreenProps<'Navigation'>) {

  return (
    <View style={styles.back}>
      <View style={styles.container}>
        <View style={styles.flex_display}>
          <ButtonNavigation buttonText='Login'
            destination='Login'
            navigation={navigation}
            backColor=''
            detailColor='yellow'
          />
           <ButtonNavigation buttonText='Perfil'
            destination='Profile'
            navigation={navigation}
            backColor=''
            detailColor='yellow'
          />
           <ButtonNavigation buttonText='Adicionar Evento'
            destination='AddEvent'
            navigation={navigation}
            backColor='indigo'
            detailColor='yellow'
          />
           <ButtonNavigation buttonText='Notificações'
            destination='Notifications'
            navigation={navigation}
            backColor='yellow'
            detailColor='yellow'
          />
          <ButtonNavigation buttonText='Sobre' 
            destination='About'
            navigation={navigation} 
            backColor={Colors.Red.background}  
            detailColor='red'         
          />
        </View>
      </View>
      <View style={styles.navegation}>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    alignItems: 'center',
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
  flex_display:{
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    margin: 10,
  },
  back: {
    flex:1,
    backgroundColor: Colors.dark.background
  },
  navegation:{
    flex:1,
    backgroundColor: Colors.dark.background
  }
});
