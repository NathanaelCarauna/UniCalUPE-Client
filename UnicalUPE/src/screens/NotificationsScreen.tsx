import * as React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import Notification from '../components/Notification';
import { FontAwesome } from '@expo/vector-icons';

export default function NotificationsScreen({ navigation }: RootTabScreenProps<'Navigation'>) {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#fff","#A0FFA3"]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.categoria}>
          <Text style={styles.normal}>Categoria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filtrar}>
          <Text style={styles.normal_n}>Filtrar</Text>
        </TouchableOpacity>
        <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)"/>
      </View>
      <Notification Text = "Notificação" destination='Event' navigation={navigation}></Notification>
      <Notification Text = "Notificação" destination='Event' navigation={navigation}></Notification>
      <Notification Text = "Notificação" destination='Event' navigation={navigation}></Notification>
      <Notification Text = "Notificação" destination='Event' navigation={navigation}></Notification>
      <Notification Text = "Notificação" destination='Event' navigation={navigation}></Notification>
      <Notification Text = "Notificação" destination='Event' navigation={navigation}></Notification>
      <Notification Text = "Notificação" destination='Event' navigation={navigation}></Notification>
      <Notification Text = "Notificação" destination='Event' navigation={navigation}></Notification>
      </LinearGradient>
    </ScrollView >
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex:1,
    backgroundColor: 'white'
  
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    color: "#004369",
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
    color: "#004369",
  },
  normal: {
    fontSize: 15,
    justifyContent:'center',
    textAlign: 'left',
    color: 'white',
    paddingEnd:20
  },
  normal_n: {
    fontSize: 15,
    justifyContent:'center',
    textAlign: 'left',
    color: 'white',
    paddingHorizontal: 5
    
  },
  header:{
    alignItems:'center',
    backgroundColor: 'transparent'
  },
  categoria:{
    backgroundColor: '#2AB75A',
    padding: 15,
    alignSelf: 'flex-start',
    margin:15,
    marginBottom: 10,
    borderRadius: 16
    
  },
  filtrar:{
    backgroundColor:'#FFDD63',
    padding: 15,
    borderRadius: 16,
    alignSelf: 'flex-end',
    marginEnd:20,
  }
});
