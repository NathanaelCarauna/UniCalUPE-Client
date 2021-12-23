import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

import { Text, View, } from '../components/Themed';
import Colors from '../constants/Colors';

import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import AppContext from '../contexts/appContext';
import GoogleIcon from '../../assets/images/googleicon.svg'


export default function LoginScreen({ navigation }) {
  // const navigation = useNavigation();
  const { handleSignIn } = useContext(AppContext)



  // const testNavigation = () => { navigation.navigate('Profile') }
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
        <GoogleIcon />
        <Text style={styles.buttonText}>Entrar com google</Text>
      </TouchableOpacity>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
    margin: 40,
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: 15,
    // backgroundColor: 'yellow',
    paddingHorizontal: 20,
  },
  buttonText: {
    flex: 1,
    color: 'black',
    fontWeight: 'bold',
    padding: 15,
    marginLeft: 12,
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
