import * as React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import Layout from '../constants/Layout';

export default function Evento() {
  return (
    <ScrollView style={styles.scroll}>
        <LinearGradient style = {styles.container} colors={["#ffffff","#B7F2F4"]}>
          <View style={styles.header}>
            <View style={{display:'flex', flexDirection: 'row', alignItems:'baseline',  backgroundColor: 'transparent'}}>
              <TextInput style={styles.title} placeholder="Nome do Evento"/>
              <TextInput style={styles.text} placeholder="Categoria"/>
            </View>
            <View style={{display:'flex', flexDirection: 'row', alignItems:'baseline', marginTop: 10,  backgroundColor: 'transparent'}}>
              <TabBarIcon name="circle" color={Colors.Blue.background} />
              <TextInput style={styles.text} placeholder="Apresentador"/>
            </View>
            <View style={{display:'flex', flexDirection: 'row', alignItems:'baseline',  backgroundColor: 'transparent'}}>
              <TabBarIcon name="map-marker" color={Colors.Blue.background} />
              <TextInput style={styles.text} placeholder="Local"/>
            </View>
          </View>
          <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)" />
            <TextInput style={styles.text} placeholder="Descrição do evento"/>
            <TextInput style={styles.text} placeholder="link"/>
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
  scroll:{
    backgroundColor: 'black', 
    flex: 1
  },
  container: {
    height: Layout.window.height - 80,
    //alignSelf:'stretch',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    padding:20,
    //width:110,
    //height:40,
    color: "#60D0D6",
    fontWeight: 'bold',
    backgroundColor: '#E9E9E9',
    borderRadius: 16,
    borderColor: 'white',
    borderWidth: 3

  },
  sub_tittle:{
    fontSize: 15,
    marginStart: 10,
    padding:20,
    color: 'gray',
    backgroundColor: '#E9E9E9',
    borderRadius: 16,
    borderColor: 'white',
    borderWidth: 3
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
    backgroundColor: Colors.Red.background,
    margin: 10,
    marginBottom: 10,
    borderRadius: 16,
    overflow: 'hidden'
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
    fontSize: 15,
    marginStart: 10,
    marginVertical: 5,
    padding:15,
    color: 'gray',
    backgroundColor: '#E9E9E9',
    borderRadius: 16,
    alignSelf:'stretch',
    textAlign: 'center',
    borderColor: 'white',
    borderWidth: 3
  }
});
