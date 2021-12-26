import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';


import { RootTabScreenProps } from '../types';
import ButtonNavigation from '../components/ButtonNavigation'
import TitleMainScreen from '../components/TitleMainScreen';
import MainView from '../components/MainView';
import { useContext } from 'react';
import AppContext from '../contexts/appContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { anonymousButtons, studentButtons, adminButtons} from '../constants/NavigationButtons';
export default function NavigationScreen({ navigation }: RootTabScreenProps<'Navigation'>) {
  const { user, signOut } = useContext(AppContext)
  const [buttons, setButtons] = useState()
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    signOut()
    console.log('logout user')
    
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    console.log('toggle visivel')
  };


  useEffect(() => {
    console.log('Filter buttons called')
    if (user) {
      if(user.accountType == 'STUDENT')
        setButtons(studentButtons(navigation, toggleModal))
      else if(user.accountType == 'ADM')
        setButtons(adminButtons(navigation, toggleModal))
      else
        setButtons(anonymousButtons(navigation, toggleModal))      
    } else {
      setButtons(anonymousButtons(navigation, toggleModal))
    }
  }, [user])

  return (
    <MainView>
      <TitleMainScreen title='Navegação' />
      <FlatList
        key={'_'}
        data={buttons}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <ButtonNavigation
              buttonText={item.buttonText}
              destination={item.destination}
              navigation={item.navigation}
              backColor={item.backColor}
            />
          )
        }}
        keyExtractor={(item) => item.buttonText}
        numColumns={2}
        style={{
          alignSelf: 'stretch',
          margin: 10,
        }}

      />

<Modal isVisible={isModalVisible} >
  <View style={styles.modal}>
    <LinearGradient colors={["#ffffff", "#ffc278"]}>
      <Text style={styles.textModal} >Você realmente deseja sair da sua conta ?</Text>

          <View style={styles.buttons}>
            <TouchableOpacity
            style={styles.buttonModalBack}
            onPress={toggleModal}>
            <TabBarIcon name="arrow-left" color={'white'} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.buttonModal}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>

          </View>
          </LinearGradient>
        </View>
      </Modal> 
      
    </MainView>
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
  icon:{
    marginTop: 14,
    marginHorizontal: 20
  },
  buttonModal: {
    //margin: 20,
    fontWeight: 'bold',
    backgroundColor: Colors.Orange.background,
    borderRadius: 15,
  },
  buttons:{
    backgroundColor:'transparent',
    flexDirection: 'row',
    //alignContent: 'center'
    justifyContent:'space-evenly',
    padding: 10,
  },
  buttonModalBack: {
    fontWeight: 'bold',
    backgroundColor: Colors.Orange.background,
    borderRadius: 15,
    
  },
  buttonText: {
    // margin: 40,
    fontWeight: 'bold',
    padding: 15,
    paddingHorizontal: 40,
    textAlign: 'center',
    color: '#ffffff'
  },
  textModal: {
    fontSize: 23,
    margin:30,
    color: 'gray',
    borderRadius: 16,
    alignSelf: 'stretch',
    textAlign: 'center',
  }
});
