import * as React from 'react';
import { StyleSheet, Image, Button, Alert, LogBox } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';

export default function LoginScreen() {
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Button 
      title="  Sign in with google  "
      color="#a9a9a9"
      onPress={()=>Alert.alert('Logando com sua conta Google')}
      />
    </View>
    </>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom:100,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
