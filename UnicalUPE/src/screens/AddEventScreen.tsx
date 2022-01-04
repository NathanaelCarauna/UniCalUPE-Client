import * as React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
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
import TabBarIcon from '../components/TabIcon';
import Modal from "react-native-modal";


const processDate = (field: string) => {
  return `${field}`.length == 1 ? `0${field}` : field
}
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

  const [isSaveModalVisible, setSaveModalVisible] = useState(false);
  const [isResponseModalVisible, setisResponseModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState({status: null, message: null});
  const navigation = useNavigation()

  const { postEvent, coursesList, user, loading } = React.useContext(AppContext)
  const [event, setEvent] = useState({ user: {id: user.id}, title: null, presentor: null, local: null, description: null, link: null });

  const toggleSaveModal = () => {
    if (event.title == null) {
      setModalMessage({message: 'Um título deve ser adicionado'})
      toggleResponseModal()
      return
    }
    else if( event.description == null){
      setModalMessage({message: 'Uma descrição deve ser adicionada'})
      toggleResponseModal()
      return
    }
    else if( event.startDate == null){
      setModalMessage({message: 'Uma data de inicio deve ser fornecida'})
      toggleResponseModal()
      return
    }
    setSaveModalVisible(!isSaveModalVisible);
  };
  const toggleResponseModal = () => {
    setisResponseModalVisible(!isResponseModalVisible);
  };
  
  
  const handleConfirmation = () => {
    if(modalMessage.status){
      navigation.navigate('Calendário')
    }
    else{
      toggleResponseModal()
    }
  }   

  const handleSubmit = () => {    
    const response = postEvent(event)
    if(response){
      setModalMessage({status: true, message: 'Evento adicionado com sucesso!'})
    }    
    else{      
      setModalMessage({status: false, message: 'Algo deu errado, tente novamente mais tarde'})
    }
    toggleSaveModal()
    toggleResponseModal()
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
      setEvent({ ...event, startDate: `${processDate(startDate.getFullYear())}-${processDate(startDate.getMonth() + 1)}-${processDate(startDate.getDate())}` })
    }
    setShowData(!showData)
  }
  const HandleEndDate = (value) => {
    let endDate = value.nativeEvent.timestamp
    if (endDate) {
      console.log("end date setado")
      setEndDate(endDate)
      setEvent({ ...event, endDate: `${processDate(endDate.getFullYear())}-${processDate(endDate.getMonth() + 1)}-${processDate(endDate.getDate())}` })
    }
    setShowEndData(!showEndData)
  }

  const HandleTime = (value) => {
    let startHour = value.nativeEvent.timestamp
    if (startHour) {
      setTime(startHour)
      setEvent({ ...event, startHour: `${processDate(startHour.getHours())}:${processDate(startHour.getMinutes())}` })

    }
    setShowTime(!showTime)
  }

  const HandleEndTime = (value) => {
    let endHour = value.nativeEvent.timestamp
    if (endHour) {
      setEndTime(endHour)
      setEvent({ ...event, endHour: `${processDate(endHour.getHours())}:${processDate(endHour.getMinutes())}` })
    }
    setShowEndTime(!showEndTime)
  }
''
  React.useEffect(() => { }, [date])

  if (loading) {
    return (
      (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color='#666' />
        </View>
      )
    )
  }
  return (
    <LinearGradient style={styles.container} colors={["#ffffff", "#ffffff"]}>
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
            <TabBarIcon size={25} style={styles.presentorIcon} name="user" color={Colors.Blue.background} />
            <TextInput style={styles.text} placeholder="Apresentador"
              onChangeText={(value) => setEvent({ ...event, presentor: value })}
              value={event.presentor} />
          </View>
          <View style={styles.textView}>
            <TabBarIcon size={25} style={styles.localIcon} name="map-marker" color={Colors.Blue.background} />
            <TextInput style={styles.text} placeholder="Local"
              onChangeText={(value) => setEvent({ ...event, local: value })}
              value={event.local} />
          </View>
          <View style={styles.textView}>
            <TabBarIcon size={25} style={styles.clockIcon} name="clock-o" color={Colors.DarkBlue.background} />
            <TouchableOpacity style={styles.calendar} onPress={
              showTimeMode
            }>
              {
                time ? <Text style={styles.Text_Normal}> {processDate(time.getHours())}:{processDate(time.getMinutes())}</Text>
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
                endTime ? <Text style={styles.Text_Normal}> {processDate(endTime.getHours())}:{processDate(endTime.getMinutes())}</Text>
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
          <TabBarIcon size={25} style={styles.calendarIcon} name="calendar" color={Colors.Blue.background} />
          <TouchableOpacity style={styles.calendar} onPress={
            showDataMode
          }>
            {
              date ? <Text style={styles.Text_Normal}>{processDate(date.getDate())}/{processDate(date.getMonth() + 1)}/{date.getFullYear()}</Text>
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
              endDate ? <Text style={styles.Text_Normal}> {processDate(endDate.getDate())}/{processDate(endDate.getMonth() + 1)}/{endDate.getFullYear()}</Text>
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
          onPress={toggleSaveModal}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <Modal isVisible={isSaveModalVisible}>
          <View style={styles.modal}>
            <LinearGradient colors={["#ffffff", "#ffffff"]}>
              <Text style={styles.textModal} >Confirmar criação de evento?</Text>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.buttonModalBack}
                  onPress={toggleSaveModal}>
                  <TabBarIcon name="arrow-left" color={'white'} style={styles.icon} size={20}/>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonModal}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Sim</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </Modal>

        <Modal isVisible={isResponseModalVisible}>
          <View style={styles.modal}>
            <LinearGradient colors={["#ffffff", "#ffffff"]}>
              <Text style={styles.textModal} >{modalMessage.message}</Text>

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

      </ScrollView>
    </LinearGradient>

  );

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
    fontSize: 14,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 14,
    //marginStart: 10,
    marginVertical: 5,
    padding: 12,
    color: 'gray',
    backgroundColor: '#E9E9E9',
    borderRadius: 16,
    alignSelf: 'stretch',
    // textAlign: 'center',
    borderColor: 'white',
    borderWidth: 3,    
  },
  clockIcon: {
    padding: 10,
    marginTop: 5,
    marginRight: 5,
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
    color: Colors.DarkBlue.background
  },
  calendarIcon: {
    padding: 10,
    marginTop: 5,
    marginRight: 3,
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
    color: Colors.DarkBlue.background
  },
  localIcon: {
    padding: 10,
    marginTop: 5,
    marginRight: 11,
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
    color: Colors.DarkBlue.background,
  },
  presentorIcon: {
    padding: 10,
    marginTop: 5,
    marginRight: 7,
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
    color: Colors.DarkBlue.background
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
    backgroundColor: Colors.Blue.background,
    borderColor: 'white',
    // borderWidth: 3
  },
  buttonText: {
    fontWeight: 'bold',
    padding: 15,
    fontSize: 14,
    color: 'white'
  },
  calendar: {
    fontSize: 14,
    //marginStart: 10,
    marginVertical: 5,
    padding: 12,
    color: 'gray',
    backgroundColor: '#E9E9E9',
    borderRadius: 16,
    // alignSelf: 'stretch',
    textAlign: 'center',
    borderColor: 'white',
    borderWidth: 3
  },
  Text_Normal: {
    fontSize: 14,
    color: 'gray',
  },
  dropdownBtnStyle: {
    marginVertical: 5,
    // padding: 0,
    backgroundColor: '#E9E9E9',
    borderRadius: 16,
    textAlign: 'center',
    borderColor: 'white',
    borderWidth: 3,
    width: '100%'
  },
  dropdownBtnTxtStyle: {
    padding: 0,
    textAlign: 'left',
    fontSize: 14,
    // backgroundColor: 'black',
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
    marginHorizontal: 10,
    
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
  buttonModal: {

    fontWeight: 'bold',
    backgroundColor: Colors.Blue.background,
    borderRadius: 15
  },
  buttonModalBack: {
    justifyContent: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.Blue.background,
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
});
