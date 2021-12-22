import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Alert  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from "react-native-modal";

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import AppContext from '../contexts/appContext';
import { useContext, useState } from 'react';
import navigation from '../navigation';


export default function ProfileScreen({ navigation}) {
  const {user, deleteUser} = useContext(AppContext)
  const navigate = () => {
    navigation.navigate('EditProfile')
  }
  const calldelete = () => {
    deleteUser(user.email)
    // navigation.navigate('EditProfile')
  }
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const backnavigate = () => {
    navigation.backnavigate('Profile')
  }

  return (
    <>
      <LinearGradient style = {styles.container} colors={["#ffffff","#ffc278"]}>
        <LinearGradient style={styles.bloco} colors={["#FF7648","#ffc278"]}>
          <Text style={styles.normal}>{user.name}</Text>
          <Text style={styles.normal}>{user.course.name}</Text>
          <Text style={styles.tipoLogin}>{user.accountType}</Text>
          
        </LinearGradient>
        <TouchableOpacity
        style={styles.button}
        onPress={navigate}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.buttonDelete}
        onPress={toggleModal}>
        <Text style={styles.buttonTextDelete}>Deletar Perfil</Text>
        </TouchableOpacity>

        <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <LinearGradient colors={["#ffffff", "#ffc278"]}>
          <Text style={styles.textModal} >Você realmente deseja deletar seu perfil ?</Text>

          <TouchableOpacity
          style={styles.buttonModal}
          onPress={calldelete}>
          <Text style={styles.buttonText}>Deletar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.buttonModalBack}
          onPress={toggleModal}>
          <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

        </LinearGradient>
        </View>
      </Modal>

      </LinearGradient>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  normal: {
    fontSize: 18,
    textAlign: 'left',
    color: 'white',
    margin: 10,
  },
  textModal: {
    fontSize: 23,
    margin:30,
    color: 'gray',
    borderRadius: 16,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  modal: {
    borderRadius: 15,
    borderColor: Colors.Orange.background,
    borderWidth: 10,
  },
  tipoLogin:{
    marginTop: 10,
    textAlign: 'right',
  },
  button: {
    margin: 40,
    fontWeight: 'bold',
    backgroundColor: Colors.Orange.background,
    borderRadius: 15
  },
  buttonModal: {
    margin: 20,
    fontWeight: 'bold',
    backgroundColor: Colors.Red.background,
    borderRadius: 15
  },
  buttonModalBack: {
    marginBottom:30,
    marginTop:10,
    marginLeft:80,
    marginRight:80,
    fontWeight: 'bold',
    backgroundColor: Colors.Red.background,
    borderRadius: 15
  },
  buttonDelete: {
    margin:80,
    marginTop:10,
    fontWeight: 'bold',
    backgroundColor: Colors.Red.background,
    borderRadius: 15
  },
  buttonText: {
    // margin: 40,
    fontWeight: 'bold',
    padding: 15,
    paddingHorizontal: 40,
    textAlign: 'center',
    color: '#ffffff'
    
  },
  buttonTextDelete: {
    // margin: 40,
    fontWeight: 'bold',
    padding: 15,
    paddingHorizontal: 40,
    textAlign: 'center',
    color: '#ffffff'
    
  },
  bloco:{
    backgroundColor: Colors.Orange.background,
    margin: 20,
    // marginBottom: 300,
    borderRadius: 16,
    padding: 20,
  }
});