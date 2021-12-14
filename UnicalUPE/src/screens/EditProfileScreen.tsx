import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import AppContext from '../contexts/appContext';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useContext } from 'react';


export default function EditProfileScreen({ navigation }) {
  const { user, saveUser, coursesList} = React.useContext(AppContext)
  const checkId = () => {
    return typeof user.id == 'number' ? user.id : null
  }
  const [userData, setUserData] = React.useState({ name: user.name, email: user.email, accountType: 'STUDENT', id: checkId()});

  const handleSubmit = () => {
    
    if(saveUser(userData)){
      console.log('User data saved')
      navigation.navigate('Root')
    }
  }
  return (
    <>
      <LinearGradient style={styles.container} colors={["#ffffff", "#ffc278"]}>


        <TextInput style={styles.text} placeholder={user.name}
          onChangeText={(value) => setUserData({ ...userData, name: value })}
          value={userData.name}
        />
        <SelectDropdown
          data={coursesList}
          defaultButtonText={'Selecione o seu curso'}
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
            setUserData({ ...userData, course: {id: selectedItem.id} })
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
        <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)" />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </LinearGradient>

    </>
  );
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
  button: {
    margin: 40,
    fontWeight: 'bold',
    backgroundColor: Colors.Orange.background,
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
