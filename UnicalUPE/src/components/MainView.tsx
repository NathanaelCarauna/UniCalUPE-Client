import * as React from 'react';
import { StyleSheet, Button} from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';

export default function NavigationScreen({ navigation, children }: RootTabScreenProps<'Navigation'>) {

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
    flex: 11,
    //alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 16,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    //marginBottom: 20
    paddingTop: 15,
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
  flex_display: {
    flex: 1,
    display: 'flex',
    //flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    //flexWrap: 'wrap',
    margin: 10,
  },
  back: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    
  },
});
