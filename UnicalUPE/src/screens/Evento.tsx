import * as React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Modal from "react-native-modal";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import Layout from '../constants/Layout';
import { useContext, useEffect } from 'react';
import AppContext from '../contexts/appContext';
import { useState } from 'react';

export default function Evento({ route, navigation }) {
  const { updateNotification, deleteEvent } = useContext(AppContext)
  const { user } = useContext(AppContext)
  const { event } = route.params
  const { notification } = route.params
  const [isModalVisible, setModalVisible] = useState<boolean | undefined>(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigate = () => {
    navigation.navigate('UpdateEvent', { routeEvent: event })
  }

  const handleDeleteEvent = () => {
    deleteEvent(event.id)
    console.log('Event deleted')
  }

  useEffect(() => {
    console.log('Event Details screen, useEffect')
    console.log(notification)
    if (notification) {
      console.log('There is a notification', notification)
      if (!notification.visualized) {
        notification.visualized = true;
        updateNotification(notification)
      }
    }
  }, [notification])
  const splitdate = (date: string) => {
    var arrayDate = date.split("-")
    var arrayDate = arrayDate.reverse()
    return arrayDate.join("-")
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient style={styles.container} colors={["#ffffff", "#ffffff"]}>
        <View style={styles.header}>
          <View style={styles.information}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.sub_tittle}>{event.category}</Text>
          </View>

          <View style={styles.information}>
            {event.presentor ? (<View style={styles.line}>
              <TabBarIcon name="user" color={Colors.Yellow.background} />
              <Text style={styles.text}>{event.presentor}</Text>
            </View>) : null}

            {event.local ? (<View style={styles.line}>
              <TabBarIcon name="map-marker" color={Colors.Yellow.background} />
              <Text style={styles.text}>{event.local}</Text>
            </View>) : null}

            {event.startHour ? (<View style={styles.line}>
              <TabBarIcon name="clock-o" color={Colors.Yellow.background} />
              <Text style={styles.text}>{event.startHour}</Text>
            </View>) : null}


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 60, flex: 1, backgroundColor: 'transparent', alignItems: 'center' }}>
              <View style={styles.line}>
                <TabBarIcon name="calendar" color={Colors.Yellow.background} />
                <Text style={styles.text}>{splitdate(event.startDate)}</Text>
              </View>
              {event.endDate ? (
                <View style={styles.separatorMini} />) : null}
              {event.endDate ? (<View style={styles.line}>
                <TabBarIcon name="calendar-check-o" color={Colors.Yellow.background} />
                <Text style={styles.text}>{splitdate(event.endDate)}</Text>
              </View>) : null}

            </View>

          </View>
        </View>
        <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)" />

        <LinearGradient style={styles.bloco} colors={["#192f6a", "#4c669f"]}>
          <Text style={styles.normal}>{event.description}</Text>
        </LinearGradient>

        {event.link ? (<TouchableOpacity style={styles.link}>
          <LinearGradient colors={["#192f6a", "#4c669f"]}>
            <Text style={styles.normal}>{event.link}</Text>
          </LinearGradient>
        </TouchableOpacity>) : null}

        {user && (user.accountType == 'ADM') ?
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={navigate}>
              <Text style={styles.buttonText}>Editar Evento</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleModal}>
              <Text style={styles.buttonText}>Excluir Evento</Text>
            </TouchableOpacity>
          </>
          : null}


        <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)" />
      </LinearGradient>
      <Modal isVisible={isModalVisible} >
        <View style={styles.modal}>
          <LinearGradient colors={["#ffffff", "#ffc278"]}>
            <Text style={styles.textModal} >Você realmente deseja excluir esse registro?</Text>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.buttonModalBack}
                onPress={toggleModal}>
                <TabBarIcon name="arrow-left" color={'white'} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={handleDeleteEvent}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>

            </View>
          </LinearGradient>
        </View>
      </Modal>
    </ScrollView>

  );

}
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: Layout.window.height - 80,

    alignSelf: 'stretch',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: "#192f6a",
    fontWeight: 'bold',

  },
  sub_tittle: {
    fontSize: 15,
    color: 'gray'
  },
  separator: {
    alignSelf: 'center',
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
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    padding: 15
  },
  bloco: {
    flex: 1,
    margin: 15,
    marginBottom: 10,
    borderRadius: 16,
    alignSelf: 'stretch'
  },
  link: {
    flex: 1,
    margin: 15,
    //marginBottom: 10,
    borderRadius: 16,
    borderBottomEndRadius: 16,
    overflow: 'hidden',
    alignSelf: 'stretch'
  },
  header: {
    //display:'flex',
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    //alignItems:'flex-start',
    margin: 20,
    backgroundColor: 'transparent'
  },
  text: {
    marginStart: 10,
    fontSize: 20,
    color: "#004369"
  },
  line: {
    padding: 8,
    margin: 6,
    //paddingHorizontal:12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: 'white',
    borderRadius: 15
  },
  button: {
    margin: 40,
    fontWeight: 'bold',
    backgroundColor: Colors.DarkBlue.background,
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
  information: {
    backgroundColor: 'transparent',
    //padding: 10,
    alignContent: 'center'
  },
  modal: {
    overflow: 'hidden',
    borderRadius: 15,
    
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
  icon:{
    marginTop: 14,
    marginHorizontal: 20
  },  
  textModal: {
    fontSize: 23,
    margin:30,
    color: 'gray',
    borderRadius: 16,
    alignSelf: 'stretch',
    textAlign: 'center',
  },

});
