import * as React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from "react-native-modal";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import Notification from '../components/Notification';
import { FontAwesome } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { useContext, useState } from 'react';
import AppContext from '../contexts/appContext';
import Navigation from '../navigation';
import TabBarIcon from '../components/TabIcon';

const filter = [{ name: 'Todos', value: -1 }, { name: "Enquete", value: "PESQUISA" }, { name: "Evento", value: "EVENTO" }]
export default function NotificationsScreen({ navigation }: RootTabScreenProps<'Navigation'>) {
  const { userNotifications, getNotificationsByCategory, getNotificationByUserEmail, deleteNotification } = useContext(AppContext)
  const [category, setCategory] = useState({ name: 'Todos', value: -1 })
  const [refresh, setRefresh] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState();

  const handleFilter = () => {
    if (category.value != -1) {
      getNotificationsByCategory(category.value)
    } else {
      getNotificationByUserEmail()
    }
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSubmit = () => {
    if(selectedNotification.id){
      deleteNotification(selectedNotification.id)    
      navigation.navigate('Notifications')
      toggleModal()
    }    
  }

  React.useEffect(() => {
    setRefresh(!refresh)
  }, [userNotifications])

  return (
    <LinearGradient colors={["#fff", "#ffffff"]} style={styles.container}>
      <View style={styles.header}>
        <SelectDropdown
          data={filter}
          extraData={refresh}
          defaultButtonText={category.name}
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
            setCategory(selectedItem)
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
        <TouchableOpacity style={styles.filtrar} onPress={handleFilter}>
          <Text style={styles.normal_n}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)" />
      {userNotifications.length > 0 ? <FlatList
        key={'_'}
        data={userNotifications.sort((a, b) => b.id - a.id)}
        renderItem={({ item }) => (
          <Notification
            title={item.title}
            destination='Event'
            event={item.event}
            navigation={navigation}
            date={item.creationTime}
            visualized={item.visualized}
            notification={item}
            category={item.event ? item.event.category : ''}
            toggleModal={toggleModal}
            setSelectedNotification={setSelectedNotification}
          />
        )}
      />
        : <Text style={styles.notFound}>Nenhuma notificação no momento</Text>
      }
      <Modal isVisible={isModalVisible} >
        <View style={styles.modal}>
          <LinearGradient colors={["#ffffff", "#fff"]}>
            <Text style={styles.textModal} >Você realmente deseja excluir essa notificação?</Text>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.buttonModalBack}
                onPress={toggleModal}>
                <TabBarIcon size={20} name="arrow-left" color={'white'} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>

            </View>
          </LinearGradient>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',

  },  
  notFound: {
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 40,
  },
  separator: {
    alignSelf: 'center',
    marginVertical: 15,
    height: 1,
    width: '90%',
    color: "#004369",
  },
  transparent: {
    backgroundColor: Colors.dark.background,
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
  modal: {
    overflow: 'hidden',
    borderRadius: 15,

  },
  buttonModal: {

    fontWeight: 'bold',
    backgroundColor: Colors.Green.background,
    borderRadius: 15
  },
  buttonModalBack: {
    justifyContent: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.Green.background,
    borderRadius: 15
  },
  textModal: {
    fontSize: 16,
    margin: 30,
    color: 'gray',
    borderRadius: 16,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  normal: {
    fontSize: 14,
    justifyContent: 'center',
    textAlign: 'left',
    color: 'white',
    paddingEnd: 20
  },
  normal_n: {
    fontSize: 14,
    justifyContent: 'center',
    textAlign: 'left',
    color: 'white',
    paddingHorizontal: 5,
    fontWeight: 'bold'

  },
  header: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
  },
  categoria: {
    backgroundColor: '#2AB75A',
    padding: 15,
    // alignSelf: 'center',
    // margin: 15,
    // marginBottom: 10,
    borderRadius: 16

  },
  filtrar: {
    backgroundColor: Colors.Green.background,
    padding: 10,
    borderRadius: 16,
    // alignSelf: 'center',
    // marginEnd: 20,
  },
  dropdownBtnStyle: {
    margin: 15,
    //marginTop: 30,  
    padding: 10,
    backgroundColor: '#2AB75A',
    paddingHorizontal: 0,
    borderRadius: 10,
    textAlign: "left",
    height: 40,
    width: '50%',
    alignSelf: 'flex-start'

  },
  dropdownBtnTxtStyle: {
    color: "#FFF",
    fontSize: 14,
  },
  dropdown: {
    borderRadius: 16,
    backgroundColor: '#2AB75A'
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
