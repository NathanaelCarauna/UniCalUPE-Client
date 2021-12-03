import * as React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import Layout from '../constants/Layout';

export default function Evento() {
  return (
    <LinearGradient style={styles.container} colors={["#ffffff", "#8F98FF"]}>
      <ScrollView style={styles.scroll}>

        <TextInput style={styles.text} placeholder="Nome do Evento" />
        <TextInput style={styles.text} placeholder="Categoria" />

        <View style={styles.textView}>
          <TabBarIcon style={styles.icons} name="user" color={Colors.Blue.background} />
          <TextInput style={styles.text} placeholder="Apresentador" />
        </View>
        <View style={styles.textView}>
          <TabBarIcon style={styles.icons} name="map-marker" color={Colors.Blue.background} />
          <TextInput style={styles.text} placeholder="Local" />
        </View>

        <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)" />
        <TextInput style={styles.text} multiline={true} placeholder="Descrição do evento" />
        <TextInput style={styles.text} placeholder="link" />
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Evento salvo com sucesso')}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>

  );

}
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  style: object
}) {
  return <FontAwesome size={30}  {...props} />;
}


const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'transparent',
    flex: 1
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'stretch',

    //justifyContent: 'center',
  },
  separator: {
    margin: 15,
    height: 1,
    alignSelf: 'stretch',
    //width: '80%',
    color: "#004369",
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    //justifyContent: 'space-between',
    //margin: 20,
    backgroundColor: 'transparent'
  },
  text: {
    fontSize: 18,
    //marginStart: 10,
    marginVertical: 5,
    padding: 12,
    color: 'gray',
    backgroundColor: '#E9E9E9',
    borderRadius: 16,
    alignSelf: 'stretch',
    textAlign: 'center',
    borderColor: 'white',
    borderWidth: 3
  },
  icons: {
    padding: 10,
    marginTop: 5,
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
  },
  textView: {
    flexDirection: 'row',
    marginTop: 10,
    // alignSelf: 'stretch',
    backgroundColor: 'transparent',
    justifyContent: 'space-evenly',
    alignSelf: 'flex-start',
  },
  button: {
    margin: 40,
    fontWeight: 'bold',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: "#8F98FF",
    borderColor: 'white',
    borderWidth: 3
  },
  buttonText: {
    fontWeight: 'bold',
    padding: 15,
    fontSize: 18,
    color: 'white'
  },
});
