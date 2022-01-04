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
    deleteUser(user.email).then(response => {
      if(response){
        setResponseMessage({status: true, message: 'Perfil excluído'})
        toggleDeleteModal()
        toggleResponseModal()
      }
    }).catch(err => {
      setResponseMessage({status: false, message: 'Algo deu errado, tente novamente mais tarde'})
      toggleDeleteModal()
      toggleResponseModal()

    })    
  }
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isResponseModalVisible, setisResponseModalVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState({status: null, message: null});
  
  const toggleDeleteModal = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };
  const toggleResponseModal = () => {
    setisResponseModalVisible(!isResponseModalVisible);
  };
  
  const handleConfirmation = () => {
    if(responseMessage.status){
      navigation.navigate('Calendário')
    }
    else{
      toggleResponseModal()
    }
  }   

  return (
    <>
      <LinearGradient style={styles.container} colors={["#ffffff", "#ffffff"]}>
        <LinearGradient style={styles.bloco} colors={["#ffffff", "#ffffff"]}>
        <View style={styles.field}>
            <TabBarIcon name="user" color={Colors.Orange.background} style={styles.icon} size={20} />
            <Text style={styles.normal}>{user ? user.name : null}</Text>
            {/* <Text style={styles.tipoLogin}>Tipo{user.accountType}</Text> */}
          </View>
          <View style={styles.field}>
            <TabBarIcon name="certificate" color={Colors.Orange.background} style={styles.icon} size={20} />
            <Text style={styles.normal}>{user? user.course.name : null}</Text>
            
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.buttonEdit}
              onPress={navigate}>
              <TabBarIcon name="edit" color={'white'} style={styles.icon} size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={toggleDeleteModal}>
              <TabBarIcon name="user-times" color={'white'} style={styles.icon} size={20} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <Modal isVisible={isDeleteModalVisible}>
          <View style={styles.modal}>
            <LinearGradient colors={["#ffffff", "#ffffff"]}>
              <Text style={styles.textModal} >Você realmente deseja deletar seu perfil?</Text>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.buttonModalBack}
                  onPress={toggleDeleteModal}>
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

        <Modal isVisible={isResponseModalVisible}>
          <View style={styles.modal}>
            <LinearGradient colors={["#ffffff", "#ffffff"]}>
              <Text style={styles.textModal} >{responseMessage.message}</Text>

              <View style={styles.buttons}>              
                <TouchableOpacity
                  style={styles.buttonModal}
                  onPress={handleConfirmation}>
                  <Text style={styles.buttonText}>Ok</Text>
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
    fontSize: 16,
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
  field: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});