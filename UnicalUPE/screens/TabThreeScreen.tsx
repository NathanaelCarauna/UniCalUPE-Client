import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from '../components/Themed';
import Button from '../components/Button'

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient style = {styles.LinearGradient} colors={["#ffffff","#ffc278"]}>
    <Text style={styles.title}>Aluno: </Text>
    <Text style={styles.normal}>Juliana Valeria Doarte Silveira </Text>
    <Text></Text>
    <Text style={styles.title}>Curso: </Text>
    <Text style={styles.normal}>Engenharia de Software</Text>
  </LinearGradient>
  <Text></Text>
  <View style={styles.flex_display}><Button></Button></View>
  </View>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "#004369",
    margin:10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  normal: {
    fontSize: 20,
    color: "#004369",
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    justifyContent:'center',
    textAlign: 'center',
  },
  LinearGradient:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex_display:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    alignContent: 'stretch',
  }
});
