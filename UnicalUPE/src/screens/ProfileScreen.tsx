import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Alert  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import AppContext from '../contexts/appContext';
import { useContext } from 'react';
import navigation from '../navigation';


export default function ProfileScreen({ navigation}) {
  const {user} = useContext(AppContext)
  const navigate = () => {
    navigation.navigate('EditProfile')
  }
  return (
    <>
      <LinearGradient style = {styles.container} colors={["#ffffff","#ffc278"]}>
        <LinearGradient style={styles.bloco} colors={["#FF7648","#ffc278"]}>
          <Text style={styles.normal}>{user.name}</Text>
          <Text style={styles.normal}>{user.course.name}</Text>
          <Text style={styles.tipoLogin}>{user.accountType}</Text>
          
        </LinearGradient>
        <TouchableOpacity
        style={styles.button}
        onPress={navigate}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
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
  bloco:{
    backgroundColor: Colors.Orange.background,
    margin: 20,
    // marginBottom: 300,
    borderRadius: 16,
    padding: 20,
  }
});