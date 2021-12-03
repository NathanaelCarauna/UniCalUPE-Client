import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { StyleSheet, Image, Button, Alert, LogBox, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';
import Colors from '../constants/Colors';
export default function LoginScreen() {
  return (
    <LinearGradient 
                style={styles.container}
                colors={['#fff', Colors.dark.background]}
            >
      <Image source={require('./Unical-Logo.png')} style={styles.logo} />
      {/* <UnicalLogo style={styles.logo} /> */}
      <Text style={styles.title}>Login</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Logando com sua conta Google')}>
        <Text style={styles.buttonText}>Sign in with google</Text>
      </TouchableOpacity>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#004369',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    // marginBottom: 200,
  },
  button: {
    margin: 40,
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: 15
  },
  buttonText: {
    // margin: 40,
    fontWeight: 'bold',
    padding: 15,
    paddingHorizontal: 40,
    
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  logo: {
    // backgroundColor: 'black',
    width: 200,
    height: 200
  }
});
