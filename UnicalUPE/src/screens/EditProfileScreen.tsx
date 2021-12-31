import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Alert, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from "react-native-modal";

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import AppContext from '../contexts/appContext';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useContext, useState } from 'react';



export default function EditProfileScreen({ navigation }) {
  const { user, saveUser, coursesList } = React.useContext(AppContext)
  const checkId = () => {
    return typeof user.id == 'number' ? user.id : null
  }
  const [userData, setUserData] = React.useState({ name: user.name, email: user.email, accountType: user.accountType || 'STUDENT', id: checkId() });

  const handleSubmit = () => {

    if (saveUser(userData)) {
      console.log('User data saved')
      navigation.navigate('Root')
    }
  }

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <LinearGradient style={styles.container} colors={["#ffffff", "#ffffff"]}>


        <TextInput style={styles.text} placeholder={user.name}
          onChangeText={(value) => setUserData({ ...userData, name: value })}
          value={userData.name}
        />
        <SelectDropdown
          data={coursesList}
          defaultButtonText={user.course ? user.course.name : 'Selecione o seu curso'}
          buttonStyle={styles.dropdownBtnStyle}
          dropdownStyle={styles.dropdown}
          buttonTextStyle={styles.dropdownBtnTxtStyle}
          dropdownIconPosition={"right"}
          rowStyle={styles.dropdownRowStyle}
          rowTextStyle={styles.dropdownRowTxtStyle}
          renderDropdownIcon={() => {
            return (
              <FontAwesome name="chevron-down" color={"#FFF"} size={18} style={styles.dropdownIcon} />
            );
          }}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            setUserData({ ...userData, course: { id: selectedItem.id } })
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem.name
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item.name
          }}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={toggleModal}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>


        <Modal isVisible={isModalVisible} >
          <View style={styles.modal}>
            <LinearGradient colors={["#ffffff", "#ffffff"]}>
              <Text style={styles.textModal} >Você realmente deseja salvar essas alterações ?</Text>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.buttonModalBack}
                  onPress={toggleModal}>
                  <TabBarIcon name="arrow-left" color={'white'} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonModal}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Salvar Alterações</Text>
                </TouchableOpacity>

              </View>
            </LinearGradient>
          </View>
        </Modal>
      </LinearGradient>

    </>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  style: object
}) {
  return <FontAwesome size={20} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
    alignItems: 'stretch',
  },
  separator: {
    margin: 15,
    marginTop: 30,
    height: 1,
    alignSelf: 'stretch',
    //width: '80%',
    color: "#004369",
  },
  modal: {
    overflow: 'hidden',
    borderRadius: 15,

  },
  button: {
    margin: 40,
    fontWeight: 'bold',
    backgroundColor: Colors.Orange.background,
    borderRadius: 15,
  },
  buttonModal: {
    //margin: 20,
    fontWeight: 'bold',
    backgroundColor: Colors.Orange.background,
    borderRadius: 15,
  },
  buttons: {
    margin: 15,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  buttonModalBack: {
    justifyContent: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.Orange.background,
    borderRadius: 15
  },
  icon: {
    padding: 10,    
  },
  buttonText: {
    // margin: 40,
    fontWeight: 'bold',
    padding: 15,
    paddingHorizontal: 40,
    textAlign: 'center',
    color: '#ffffff'
  },
  text: {
    fontSize: 18,
    //marginStart: 10,
    marginVertical: 5,
    padding: 12,
    color: 'gray',
    backgroundColor: '#E9E9E9',
    borderRadius: 16,
    alignSelf: 'stretch',
    textAlign: 'center',
    borderColor: 'white',
    borderWidth: 3
  },
  textModal: {
    fontSize: 23,
    margin: 30,
    color: 'gray',
    borderRadius: 16,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  bloco: {
    backgroundColor: Colors.Orange.background,
    margin: 20,
    // marginBottom: 300,
    borderRadius: 16,
    padding: 20,
  },
  dropdownBtnStyle: {
    //marginStart: 10,
    marginVertical: 5,
    padding: 12,
    backgroundColor: '#E9E9E9',
    borderRadius: 16,
    textAlign: 'center',
    borderColor: 'white',
    borderWidth: 3,
    width: '100%'
  },
  dropdownBtnTxtStyle: {
    fontSize: 18,
    alignSelf: 'stretch',
    color: 'gray',

  },
  dropdown: {
    borderRadius: 16,
    backgroundColor: Colors.Orange.background,
  },
  dropdownRowStyle: {

  },
  dropdownRowTxtStyle: {
    fontSize: 14,
    color: 'white',
  },
  dropdownIcon: {
    marginHorizontal: 10
  }
});
