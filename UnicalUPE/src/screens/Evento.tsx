import * as React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import Layout from '../constants/Layout';

export default function Evento({route, navigation}) {
  const{event} = route.params
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <LinearGradient style = {styles.container} colors={["#ffffff","#B7F2F4"]}>
          <View style={styles.header}>
            <View style={{backgroundColor: 'transparent'}}>
              <Text style={styles.title}>{event.title}</Text>
              <Text style={styles.sub_tittle}>{event.category}</Text>
            </View>
            <View style={styles.line}>
              <TabBarIcon name="user" color={Colors.Blue.background} />
              <Text style={styles.text}>{event.presentor}</Text>
            </View>
            <View style={styles.line}>
              <TabBarIcon name="map-marker" color={Colors.Blue.background} />
              <Text style={styles.text}>{event.local}</Text>
            </View>
            <View style={styles.line}>
              <TabBarIcon name="calendar" color={Colors.Blue.background} />
              <Text style={styles.text}>{event.startDate}</Text> 
            </View>
            <View style={styles.line}>
              <TabBarIcon name="calendar-check-o" color={Colors.Blue.background} />
              <Text style={styles.text}>{event.endDate? event.endDate : event.startDate}</Text> 
            </View>
          </View>
          <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)" />

            <LinearGradient style={styles.bloco} colors={["#60D0D6","#B7F2F4"]}>
              <Text style={styles.normal}>{event.description}</Text>
            </LinearGradient>

            <TouchableOpacity style={styles.link}>
          <LinearGradient colors={["#60D0D6","#B7F2F4"]}>
            <Text style={styles.normal}>{event.link}</Text>
          </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
    </ScrollView>
   
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
    flex: 1,
    //height: Layout.window.height - 80,

    alignSelf:'stretch',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: "#60D0D6",
    fontWeight: 'bold',

  },
  sub_tittle:{
    fontSize: 15,
    color: 'gray'
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
    color: "#004369",
  },
  normal: {
    fontSize: 18,
    justifyContent:'center',
    textAlign: 'center',
    color: 'white',
    padding: 15
  },
  bloco:{
    flex:1,
    margin: 15,
    marginBottom: 10,
    borderRadius: 16,
    alignSelf:'stretch'
  },
  link:{
    flex:1,
    margin: 15,
    marginBottom: 10,
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf:'stretch'
  },
  header:{
    display:'flex',
    flexWrap: 'wrap',
    alignSelf:'stretch',
    alignItems:'flex-start',
    margin: 20,
    backgroundColor: 'transparent'
  },
  text:{
    marginStart: 10,
    fontSize: 25,
    color: "#004369"
  },
  line:{
    margin: 6,
    display:'flex', 
    flexDirection: 'row', 
    alignItems:'baseline',  
    backgroundColor: 'transparent',
  }
});
