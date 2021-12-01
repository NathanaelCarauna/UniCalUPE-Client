import * as React from 'react';
import { StyleSheet, Button} from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';

export default function NavigationScreen({ navigation, children }: RootTabScreenProps<'Navigation'>) {

  return (
    <View style={styles.back}>
      <View style={styles.container}>
        <View>
          {children}
        </View>
      </View>
      <View style={styles.navigation}>
    
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,    
    borderRadius: 16,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,        
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  back: {
    flex:1,
    backgroundColor: Colors.dark.background
  },
  navigation:{
    flex:1,
    backgroundColor: Colors.dark.background
  }
});
