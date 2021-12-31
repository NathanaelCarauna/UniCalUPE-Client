import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from "react-native-modal";

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import AppContext from '../contexts/appContext';
import { useContext, useState } from 'react';
import navigation from '../navigation';
import { FontAwesome } from '@expo/vector-icons';
import TabBarIcon from '../components/TabIcon';


export default function ProfileScreen({ navigation }) {
  const { user, deleteUser } = useContext(AppContext)
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
      <LinearGradient style={styles.container} colors={["#ffffff", "#ffffff"]}>
        <LinearGradient style={styles.bloco} colors={["#ffffff", "#ffffff"]}>
          <View>
            <Text style={styles.normal}>{user.name}</Text>
            <Text style={styles.normal}>{user.course.name}</Text>
            {/* <Text style={styles.tipoLogin}>Tipo{user.accountType}</Text> */}
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.buttonEdit}
              onPress={navigate}>
              <TabBarIcon name="edit" color={'white'} style={styles.icon} size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={toggleModal}>
              <TabBarIcon name="user-times" color={'white'} style={styles.icon} size={20} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <LinearGradient colors={["#ffffff", "#ffffff"]}>
              <Text style={styles.textModal} >Você realmente deseja deletar seu perfil?</Text>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.buttonModalBack}
                  onPress={toggleModal}>
                  <TabBarIcon name="arrow-left" color={'white'} style={styles.icon} size={20}/>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonModal}
                  onPress={calldelete}>
                  <Text style={styles.buttonText}>Deletar Perfil</Text>
                </TouchableOpacity>
              </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  normal: {
    fontSize: 18,
    textAlign: 'left',
    color: Colors.Orange.background,
    margin: 10,
  },
  textModal: {
    fontSize: 23,
    margin: 30,
    color: 'gray',
    borderRadius: 16,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  modal: {
    overflow: 'hidden',
    borderRadius: 15,
    
  },
  tipoLogin: {
    marginTop: 10,
    textAlign: 'right',
  },
  buttonEdit: {
    // flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.Orange.background,
    borderRadius: 15
  },
  buttonDelete: {
    // flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.Red.background,
    borderRadius: 15,
  },
  buttonModal: {

    fontWeight: 'bold',
    backgroundColor: Colors.Red.background,
    borderRadius: 15
  },
  buttonModalBack: {
    justifyContent: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.Red.background,
    borderRadius: 15
  },
  icon: {    
    padding: 10,    
  },
  buttons: {
    margin: 15,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    // padding: 10,
  },
  buttonText: {
    // margin: 40,
    fontWeight: 'bold',
    padding: 15,
    paddingHorizontal: 40,
    textAlign: 'center',
    color: '#ffffff'

  },  
  bloco: {
    // flexDirection: 'row',
    backgroundColor: 'white',
    margin: 20,
    // marginBottom: 300,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.Orange.background,
    width: '90%'
  },  
});