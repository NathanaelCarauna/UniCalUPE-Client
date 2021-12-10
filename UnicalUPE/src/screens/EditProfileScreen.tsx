import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Alert, TextInput  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';


export default function EditProfileScreen() {
  return (
    <>
      <LinearGradient style = {styles.container} colors={["#ffffff","#ffc278"]}>
      
      
      <TextInput style={styles.text} placeholder="Nome do Usuário" />
      <TextInput style={styles.text} placeholder="Curso" />
      <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)" />

      <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Edição feita com sucesso')}>
          <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      </LinearGradient>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
    alignItems: 'stretch',
  },
  separator: {
    margin: 15,
    marginTop:30,
    height: 1,
    alignSelf: 'stretch',
    //width: '80%',
    color: "#004369",
  },
  button: {
    margin: 40,
    fontWeight: 'bold',
    backgroundColor: 'orange',
    borderRadius: 15
  },
  buttonText: {
    // margin: 40,
    fontWeight: 'bold',
    padding: 15,
    paddingHorizontal: 40,
    textAlign: 'center',
    color: '#ffffff' 
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
  bloco:{
    backgroundColor: Colors.Orange.background,
    margin: 20,
    // marginBottom: 300,
    borderRadius: 16,
    padding: 20,
  }
});
