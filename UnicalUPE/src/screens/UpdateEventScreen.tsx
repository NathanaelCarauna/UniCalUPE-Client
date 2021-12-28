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
  const [date, setDate] = useState();
  const [endDate, setEndDate] = useState();
  const [time, setTime] = useState();
  const [endTime, setEndTime] = useState();
  const [showData, setShowData] = useState(false);
  const [showEndData, setShowEndData] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [categoryState, setCategoryState] = useState();

  const navigation = useNavigation()

  const { postEvent, coursesList } = React.useContext(AppContext)
  const [event, setEvent] = useState({ title: null, presentor: null, local: null, description: null, link: null });

  const handleSubmit = () => {
    if(event.title == null||  event.description == null || event.startDate == null){
      Alert.alert("'Titulo', 'descrição' e 'Data de Inicio' não podem ser nulos")
    }
    else if (postEvent(event)) {
      console.log('add event')
      navigation.navigate('Root')
    }
  }

  const showDataMode = () => {
    setShowData(!showData);
    console.log(date)
  };
  const showEndDataMode = () => {
    setShowEndData(!showData);
    console.log(endDate)
  };
  const showTimeMode = () => {
    setShowTime(!showTime);
    console.log(time)
  };
  const showEndTimeMode = () => {
    setShowEndTime(!showTime);
    console.log(endTime)
  };

  const HandleDate = (value) => {
    let startDate = value.nativeEvent.timestamp;
    if (startDate) {
      console.log("Start date setado")
      setDate(startDate)
      setEvent({ ...event, startDate: `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}` })
    }
    setShowData(!showData)
  }
  const HandleEndDate = (value) => {
    let endDate = value.nativeEvent.timestamp
    if (endDate) {
      console.log("end date setado")
      setEndDate(endDate)
      setEvent({ ...event, endDate: `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}` })
    }
    setShowEndData(!showEndData)
  }

  const HandleTime = (value) => {
    let startHour = value.nativeEvent.timestamp
    if (startHour) {
      setTime(startHour)
      setEvent({ ...event, startHour: `${startHour.getHours()}:${startHour.getMinutes()}` })

    }
    setShowTime(!showTime)
  }

  const HandleEndTime = (value) => {
    let endHour = value.nativeEvent.timestamp
    if (endHour) {
      setEndTime(endHour)
      setEvent({ ...event, endHour: `${endHour.getHours()}:${endHour.getMinutes()}` })
    }
    setShowEndTime(!showEndTime)
  }

  React.useEffect(() => { }, [date])


  return (
    <LinearGradient style={styles.container} colors={["#ffffff", "#192f6a"]}>
      <ScrollView style={styles.scroll}>

        <TextInput style={styles.text} placeholder="Título"
          onChangeText={(value) => setEvent({ ...event, title: value })}
          value={event.title} />


        <SelectDropdown
          data={[{ name: 'Pesquisa', value: 'PESQUISA' }, { name: 'Evento', value: 'EVENTO' }]}
          defaultButtonText={'Selecione uma categoria'}
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
            setEvent({ ...event, category: selectedItem.value, })
            setCategoryState(selectedItem.value)
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
            setEvent({ ...event, course: { id: selectedItem.id } })
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



        <TextInput style={styles.text} multiline={true} placeholder="Descrição"
          onChangeText={(value) => setEvent({ ...event, description: value })}
          value={event.description} />
        <TextInput style={styles.text} placeholder="Link"
          onChangeText={(value) => setEvent({ ...event, link: value })}
          value={event.link} />
        <View style={styles.separator} lightColor="#004369" darkColor="rgba(0,67,105,0.1)" />

        {categoryState == 'EVENTO' ? <>
          <View style={styles.textView}>
            <TabBarIcon style={styles.presentorIcon} name="user" color={Colors.Blue.background} />
            <TextInput style={styles.text} placeholder="Apresentador"
              onChangeText={(value) => setEvent({ ...event, presentor: value })}
              value={event.presentor} />
          </View>
          <View style={styles.textView}>
            <TabBarIcon style={styles.localIcon} name="map-marker" color={Colors.DarkBlue.background} />
            <TextInput style={styles.text} placeholder="Local"
              onChangeText={(value) => setEvent({ ...event, local: value })}
              value={event.local} />
          </View>
          <View style={styles.textView}>
            <TabBarIcon style={styles.icons} name="clock-o" color={Colors.Blue.background} />
            <TouchableOpacity style={styles.calendar} onPress={
              showTimeMode
            }>
              {
                time ? <Text style={styles.Text_Normal}> {time.getHours()}:{time.getMinutes()}</Text>
                  : <Text style={styles.Text_Normal}>Hora de inicio</Text>
              }

            </TouchableOpacity >
            {showTime && (
              <DateTimePicker
                testID="dateTimePicker"
                mode="time"
                value={time || new Date()}
                is24Hour={true}
                display="default"
                onChange={HandleTime}
              />
            )}
            <Text style={styles.hifenSyle}> - </Text>
            <TouchableOpacity style={styles.calendar} onPress={
              showEndTimeMode
            }>
              {
                endTime ? <Text style={styles.Text_Normal}> {endTime.getHours()}:{endTime.getMinutes()}</Text>
                  : <Text style={styles.Text_Normal}>Hora de fim</Text>
              }

            </TouchableOpacity >
            {showEndTime && (
              <DateTimePicker
                testID="dateTimePicker"
                mode="time"
                value={endTime || new Date()}
                is24Hour={true}
                display="default"
                onChange={HandleEndTime}
              />
            )}

          </View>
        </>
          : <></>
        }
        {/* Date picker line */}
        <View style={styles.textView}>
          <TabBarIcon style={styles.icons} name="calendar" color={Colors.DarkBlue.background} />
          <TouchableOpacity style={styles.calendar} onPress={
            showDataMode
          }>
            {
              date ? <Text style={styles.Text_Normal}>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text>
                : <Text style={styles.Text_Normal}>Data de inicio</Text>
            }
          </TouchableOpacity >
          {showData && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date || new Date()}
              is24Hour={true}
              display="default"
              onChange={HandleDate}
            />
          )}
          <Text style={styles.hifenSyle}> - </Text>
          <TouchableOpacity style={styles.calendar} onPress={
            showEndDataMode
          }>
            {
              endDate ? <Text style={styles.Text_Normal}> {endDate.getDate()}/{endDate.getMonth() + 1}/{endDate.getFullYear()}</Text>
                : <Text style={styles.Text_Normal}>Data de fim</Text>
            }

          </TouchableOpacity >
          {showEndData && (
            <DateTimePicker
              testID="dateTimePickerEnd"
              value={endDate || new Date()}
              is24Hour={true}
              display="default"
              onChange={HandleEndDate}
            />
          )}

        </View>

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
  hifenSyle: {
    alignSelf: 'center',
    marginHorizontal: 3,
    fontSize: 16,
    fontWeight: 'bold'
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
    backgroundColor: "#192f6a",
    borderColor: 'white',
    borderWidth: 3
  },
  buttonText: {
    fontWeight: 'bold',
    padding: 15,
    fontSize: 18,
    color: 'white'
  },
  calendar: {
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
  Text_Normal: {
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
