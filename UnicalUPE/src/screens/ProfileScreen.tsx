import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';


export default function CalendarScreen() {
  return (
    <>
      <LinearGradient style = {styles.container} colors={["#ffffff","#ffc278"]}>
        <LinearGradient style={styles.bloco} colors={["#FF7648","#ffc278"]}>
          <Text style={styles.normal}>Aluno Santos da Silva</Text>
          <Text style={styles.normal}>Engenharia de Software</Text>
          <Text style={styles.tipoLogin}>Estudante</Text>
          </LinearGradient>
      </LinearGradient>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  normal: {
    fontSize: 18,
    textAlign: 'left',
    color: 'white',
    margin: 10,
  },
  tipoLogin:{
    marginTop: 10,
    textAlign: 'right',
  },
  bloco:{
    backgroundColor: Colors.Orange.background,
    margin: 10,
    marginBottom: 300,
    borderRadius: 16,
    padding: 30,
  }
});
