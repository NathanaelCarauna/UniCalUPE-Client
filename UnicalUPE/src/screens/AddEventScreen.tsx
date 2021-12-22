import * as React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import Layout from '../constants/Layout';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import AppContext from '../contexts/appContext';
import SelectDropdown from 'react-native-select-dropdown';
import { useNavigation } from '@react-navigation/native';

export default function Evento() {
  const [date, setDate] = useState(new Date(1598051730000));
  const [time, setTime] = useState(new Date(1598051730000));
  const [showData, setShowData] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const navigation = useNavigation()

  const {postEvent, coursesList} = React.useContext(AppContext)
  const [event, setEvent] = useState({title: null, presentor: null, local: null, description: null, link: null});
  

  const handleSubmit = () => {

    if(postEvent(event)){
      console.log('add event')
      navigation.navigate('Root')
    }
  }

  const showDataMode = () => {
    setShowData(!showData);
    console.log(date)
  };
  const showTimeMode = () => {
    setShowTime(!showTime);
    console.log(time)
  };

  const HandleDate =() =>{
    setDate
    setShowData(!showData)}

  const HandleTime =() =>{
    setTime
    setShowTime(!showTime)}

    React.useEffect(()=>{}, [date])


  return (
    <LinearGradient style={styles.container} colors={["#ffffff", "#8F98FF"]}>
      <ScrollView style={styles.scroll}>

        <TextInput style={styles.text} placeholder="Título" 
        onChangeText={(value) => setEvent({ ...event, title: value })}
        value={event.title} />

        
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
            setEvent({ ...event, course: {id: selectedItem.id} })
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

        <View style={styles.textView}>
          <TabBarIcon style={styles.presentorIcon} name="user" color={Colors.Blue.background} />
          <TextInput style={styles.text} placeholder="Apresentador" 
          onChangeText={(value) => setEvent({ ...event, presentor: value })}
          value={event.presentor}/>
        </View>
        <View style={styles.textView}>
          <TabBarIcon style={styles.localIcon} name="map-marker" color={Colors.Blue.background} />
          <TextInput style={styles.text} placeholder="Local" 
          onChangeText={(value) => setEvent({ ...event, local: value })}
          value={event.local}/>
        </View>
        <View style={styles.textView}>
          <TabBarIcon style={styles.icons} name="calendar" color={Colors.Blue.background} />
          <TouchableOpacity style= {styles.calendar} onPress={
            showDataMode
          }>
            <Text style= {styles.Text_Normal}> {date.getUTCDate()}</Text>
          </TouchableOpacity >
          {showData && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              is24Hour={true}
              display="default"
              onChange={HandleDate}
            />
          )}
          
        </View>
        <View style={styles.textView}>
          <TabBarIcon style={styles.icons} name="clock-o" color={Colors.Blue.background} />
          <TouchableOpacity style= {styles.calendar} onPress={
            showTimeMode
          }>
            <Text style= {styles.Text_Normal}> {time.getHours()}</Text>
          </TouchableOpacity >
          {showTime && (
            <DateTimePicker
              testID="dateTimePicker"
              mode="time"
              value={time}
              is24Hour={true}
              display="default"
              onChange={HandleTime}
            />
          )}
          
        </View>

        <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)" />
        <TextInput style={styles.text} multiline={true} placeholder="Descrição" 
        onChangeText={(value) => setEvent({ ...event, description: value })}
        value={event.description}/>
        <TextInput style={styles.text} placeholder="Link" 
        onChangeText={(value) => setEvent({ ...event, link: value })}
        value={event.link}/>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>

  );

}
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  style: object
}) {
  return <FontAwesome size={30}  {...props} />;
}


const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'transparent',
    flex: 1
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'stretch',

    //justifyContent: 'center',
  },
  separator: {
    margin: 15,
    height: 1,
    alignSelf: 'stretch',
    //width: '80%',
    color: "#004369",
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    //justifyContent: 'space-between',
    //margin: 20,
    backgroundColor: 'transparent'
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
  icons: {
    padding: 10,
    marginTop: 5,
    // marginRight: 5,
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
  },
  localIcon: {
    padding: 10,
    marginTop: 5,
    marginRight: 11,
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
  },
  presentorIcon: {
    padding: 10,
    marginTop: 5,
    marginRight: 7,
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
  },
  textView: {
    flexDirection: 'row',
    marginTop: 10,
    // alignSelf: 'stretch',
    backgroundColor: 'transparent',
    justifyContent: 'space-evenly',
    alignSelf: 'flex-start',
  },
  button: {
    margin: 40,
    fontWeight: 'bold',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: "#8F98FF",
    borderColor: 'white',
    borderWidth: 3
  },
  buttonText: {
    fontWeight: 'bold',
    padding: 15,
    fontSize: 18,
    color: 'white'
  },
  calendar:{
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
  Text_Normal:{
    fontSize: 18,
    color: 'gray',
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
    backgroundColor: Colors.Blue.background,
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
