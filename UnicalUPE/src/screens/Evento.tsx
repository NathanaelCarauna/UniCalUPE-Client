import * as React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import Layout from '../constants/Layout';

export default function Evento() {
  return (
    <ScrollView>
        <LinearGradient style = {styles.container} colors={["#ffffff","#B7F2F4"]}>
          <View style={styles.header}>
            <View style={{display:'flex', flexDirection: 'row', alignItems:'baseline',  backgroundColor: 'transparent'}}>
              <Text style={styles.title}>Evento</Text>
              <Text style={styles.sub_tittle}>Categoria</Text>
            </View>
            <View style={{display:'flex', flexDirection: 'row', alignItems:'baseline', marginTop: 10,  backgroundColor: 'transparent'}}>
              <TabBarIcon name="circle" color={Colors.blue.background} />
              <Text style={styles.text}>Apresentador</Text>
            </View>
            <View style={{display:'flex', flexDirection: 'row', alignItems:'baseline',  backgroundColor: 'transparent'}}>
              <TabBarIcon name="map-marker" color={Colors.blue.background} />
              <Text style={styles.text}>Local</Text>
            </View>
          </View>
          <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)" />
            <LinearGradient style={styles.bloco} colors={["#60D0D6","#B7F2F4"]}>
              <Text style={styles.normal}>Lorem ipsum molestie eleifend blandit iaculis quis rutrum, taciti euismod fusce quis vivamus ac ligula velit, fames placerat sociosqu eleifend iaculis sollicitudin. a ut nulla purus elementum, mollis maecenas accumsan. </Text>
              
            </LinearGradient>
            <TouchableOpacity style={styles.bloco}>
          <LinearGradient colors={["#60D0D6","#B7F2F4"]}>
            <Text style={styles.normal}>Mais Informações</Text>
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
    height: Layout.window.height - 80,
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
    marginStart: 10,
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
    marginStart: 10,
    fontSize: 25,
    color: "#004369"
  }
});
