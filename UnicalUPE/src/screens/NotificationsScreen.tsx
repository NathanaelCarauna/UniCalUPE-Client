import * as React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import Notification from '../components/Notification';
import { FontAwesome } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { useContext } from 'react';
import AppContext from '../contexts/appContext';
import Navigation from '../navigation';

const filter = ["Enquete", "Evento"]
export default function NotificationsScreen({ navigation }: RootTabScreenProps<'Navigation'>) {
  const { userNotifications } = useContext(AppContext)

  return (
    <LinearGradient colors={["#fff", "#A0FFA3"]} style={styles.container}>
      <View style={styles.header}>
        <SelectDropdown
          data={filter}
          defaultButtonText={'Categoria'}
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
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
        <TouchableOpacity style={styles.filtrar}>
          <Text style={styles.normal_n}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)" />
      {userNotifications.length > 0 ? <FlatList
        key={'_'}
        data={userNotifications.sort((a,b) => b.id - a.id)}
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
          />
        )}
      />
        : <Text>Nenhuma notificação no momento</Text>
      }

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
