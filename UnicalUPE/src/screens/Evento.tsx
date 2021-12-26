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

  const splitdate = (date:string) =>{
    var arrayDate = date.split("-")
    var arrayDate = arrayDate.reverse()
    return arrayDate.join("-")
  }
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <LinearGradient style = {styles.container} colors={["#ffffff","#4c669f"]}>
          <View style={styles.header}>
            <View style={styles.information}>
              <Text style={styles.title}>{event.title}</Text>
              <Text style={styles.sub_tittle}>{event.category}</Text>
            </View>

            <View style={styles.information}>
              {event.presentor? (<View style={styles.line}>
              <TabBarIcon name="user" color={Colors.Yellow.background} />
              <Text style={styles.text}>{event.presentor}</Text>
            </View>): null}
            
            {event.local? (<View style={styles.line}>
              <TabBarIcon name="map-marker" color={Colors.Yellow.background} />
              <Text style={styles.text}>{event.local}</Text>
            </View>) : null}
            
            {event.startHour? (<View style={styles.line}>
              <TabBarIcon name="clock-o" color={Colors.Yellow.background} />
              <Text style={styles.text}>{event.startHour}</Text>
            </View>) : null}
           

            <View style={{flexDirection: 'row', justifyContent:'space-between', height:60, flex:1, backgroundColor:'transparent', alignItems:'center'}}>
            <View style={styles.line}>
              <TabBarIcon name="calendar" color={Colors.Yellow.background} />
              <Text style={styles.text}>{splitdate(event.startDate)}</Text> 
            </View>
            {event.endDate? (
            <View style={styles.separatorMini}  />): null}
            {event.endDate? (<View style={styles.line}>
              <TabBarIcon name="calendar-check-o" color={Colors.Yellow.background} />
              <Text style={styles.text}>{splitdate(event.endDate)}</Text> 
            </View>) : null}
            
            </View>

            </View>
          </View>
          <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)" />

            <LinearGradient style={styles.bloco} colors={["#192f6a","#4c669f"]}>
              <Text style={styles.normal}>{event.description}</Text>
            </LinearGradient>

              {event.link?(<TouchableOpacity style={styles.link}>
          <LinearGradient colors={["#192f6a","#4c669f"]}>
            <Text style={styles.normal}>{event.link}</Text>
          </LinearGradient>
          </TouchableOpacity>):null}
            
          <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)" />
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
    color: "#192f6a",
    fontWeight: 'bold',

  },
  sub_tittle:{
    fontSize: 15,
    color: 'gray'
  },
  separator: {
    alignSelf:'center',
    marginVertical: 15,
    height: 1,
    width: '80%',
    color: "#004369",
  },
  separatorMini: {
    marginVertical: 15,
    height: 3,
    width: 5,
    color: "#192f6a",
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
    //marginBottom: 10,
    borderRadius: 16,
    borderBottomEndRadius:16,
    overflow: 'hidden',
    alignSelf:'stretch'
  },
  header:{
    //display:'flex',
    flexWrap: 'wrap',
    alignSelf:'stretch',
    //alignItems:'flex-start',
    margin: 20,
    backgroundColor: 'transparent'
  },
  text:{
    marginStart: 10,
    fontSize: 20,
    color: "#004369"
  },
  line:{
    padding: 8,
    margin: 6,
    //paddingHorizontal:12,
    display:'flex', 
    flexDirection: 'row', 
    alignItems:'baseline',  
    backgroundColor: 'white',
    borderRadius: 15
  },
  information:{
    backgroundColor: 'transparent', 
    //padding: 10,
    alignContent:'center'
  }
});
