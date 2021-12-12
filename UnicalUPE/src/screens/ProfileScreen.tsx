import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import AppContext from '../contexts/appContext';
import { useContext } from 'react';


export default function CalendarScreen() {
  const {user} = useContext(AppContext)
  return (
    <>
      <LinearGradient style = {styles.container} colors={["#ffffff","#ffc278"]}>
        <LinearGradient style={styles.bloco} colors={["#FF7648","#ffc278"]}>
          <Text style={styles.normal}>{user.name}</Text>
          <Text style={styles.normal}>{user.course.name}</Text>
          <Text style={styles.tipoLogin}>{user.accountType}</Text>
          </LinearGradient>
      </LinearGradient>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
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
    margin: 20,
    // marginBottom: 300,
    borderRadius: 16,
    padding: 20,
  }
});
