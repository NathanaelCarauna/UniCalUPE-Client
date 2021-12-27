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

const filter = [{ name: 'Todos', value: -1 }, { name: "Enquete", value: "PESQUISA" }, { name: "Evento", value: "EVENTO" }]
export default function NotificationsScreen({ navigation }: RootTabScreenProps<'Navigation'>) {
  const { userNotifications, getNotificationsByCategory, getNotificationByUserEmail } = useContext(AppContext)
  const [category, setCategory] = useState({ name: 'Todos' })
  const [refresh, setRefresh] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);

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

    if (saveUser(userData)) {
      console.log('User data saved')
      // navigation.navigate('Root')
    }
  }

  React.useEffect(() => {
    setRefresh(!refresh)
  }, [userNotifications])

  return (
    <LinearGradient colors={["#fff", "#A0FFA3"]} style={styles.container}>
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
            func={toggleModal}
          />
        )}
      />
        : <Text>Nenhuma notificação no momento</Text>
      }
      <Modal isVisible={isModalVisible} >
        <View style={styles.modal}>
          <LinearGradient colors={["#ffffff", "#ffc278"]}>
            <Text style={styles.textModal} >Você realmente deseja excluir essa notificação?</Text>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.buttonModalBack}
                onPress={toggleModal}>
                <TabBarIcon name="arrow-left" color={'white'} style={styles.icon} />
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

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',

  },
  title: {
    fontSize: 20,
    marginTop: 20,
    color: "#004369",
    fontWeight: 'bold',
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
    marginTop: 14,
    marginHorizontal: 20
  },
  buttons: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    //alignContent: 'center'
    justifyContent: 'space-evenly',
    padding: 10,
  },
  modal: {
    overflow: 'hidden',
    borderRadius: 15,

  },
  buttonModal: {
    fontWeight: 'bold',
    backgroundColor: Colors.Orange.background,
    borderRadius: 15,
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
    margin: 30,
    color: 'gray',
    borderRadius: 16,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  normal: {
    fontSize: 15,
    justifyContent: 'center',
    textAlign: 'left',
    color: 'white',
    paddingEnd: 20
  },
  normal_n: {
    fontSize: 15,
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
    backgroundColor: '#FFDD63',
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
    fontSize: 16,
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
