import * as React from 'react';
import { StyleSheet, Button} from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';

export default function NavigationScreen({ navigation, children }: {navigation: RootTabScreenProps<'Navigation'>,  children: React.ReactNode}) {

  return (
    <View style={styles.back}>
      <View style={styles.container}>
          {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    paddingTop: 15,
    // justifyContent: 'center'
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
    flex: 1,
    backgroundColor: Colors.dark.background,
    
  },
});
