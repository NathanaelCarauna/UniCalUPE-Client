import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { StyleSheet, Image, Button, Alert, LogBox, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';
import Colors from '../constants/Colors';
import * as AuthSession from 'expo-auth-session';

type AuthResponse = {
  type: string;
  params: {
    access_token: string;
  }
}

export default function LoginScreen() {
  async function handleSignIn() {
    const CLIENT_ID = '162955034296-ah2keq2dk20d7qvpm0qj4h9bi7iratcr.apps.googleusercontent.com'
    const REDIRECT_URI = 'https://auth.expo.io/@dahisedias/UnicalUPE'
    const RESPONSE_TYPE = 'token'
    const SCOPE = encodeURI('profile email')

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
    
    const {type, params} = await AuthSession.startAsync({authUrl}) as AuthResponse

    if(type === 'success'){
      console.log(type)
    }
  
  }

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
        onPress={() => handleSignIn()}>
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
