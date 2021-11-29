import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';

export default function Evento() {
  return (
    <ScrollView>
        <LinearGradient style = {styles.container} colors={["#ffffff","#B7F2F4"]}>
          <Text style={styles.title}>Quem Somos Nós ?</Text>
          <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)" />
            <LinearGradient style={styles.bloco} colors={["#60D0D6","#B7F2F4"]}>
              <Text style={styles.normal}>Somos uma equipe de estudantes do quinto período de Engenharia de Software UPE Campus Garanhuns.</Text>
              <Text style={styles.normal}>Nossa equipe é formada pelos estudandes: Maria Clara V. Araújo, Dahise Dias e Nathanael Carauna </Text>
            </LinearGradient>
          <Text style={styles.title}>Qual a Nossa Missão ?</Text>
          <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)"/>
          <LinearGradient style={styles.bloco} colors={["#60D0D6","#B7F2F4"]}>
            <Text style={styles.normal}>Para estudantes e professores é sempre importante acompanhar as datas acadêmicas, para não perder prazos e oportunidades. Entretanto, é difícil acompanhar tantas datas, eventos, feriados, viagens técnicas, palestras etc. Como solução para auxiliar nesta questão, o app Unical UPE foi idealizado e desenvolvido.</Text>
          </LinearGradient>
        </LinearGradient>
    </ScrollView>
   
  );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 16
  }
});
