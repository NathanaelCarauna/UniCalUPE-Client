import * as React from 'react';
import { StyleSheet } from 'react-native';

import MainView from '../components/MainView';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Colors from '../constants/Colors';
import { LocaleConfig } from 'react-native-calendars';
import { anonymousButtons, studentButtons, adminButtons} from '../constants/NavigationButtons';
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome } from '@expo/vector-icons';
import TitleMainScreen from '../components/TitleMainScreen';
import { useEffect } from 'react';
import { useContext } from 'react';
import AppContext from '../contexts/appContext';
import { useState } from 'react';
import Modal from "react-native-modal";
import { Text, View } from '../components/Themed';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, TouchableOpacity } from 'react-native';
import ButtonNavigation from '../components/ButtonNavigation'
import Navigation from '../navigation';

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dec.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Quar.', 'Quin.', 'Sex.', 'Sab.'],
  today: 'Hoje\'Hoj'
};
LocaleConfig.defaultLocale = 'pt-br';



function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  style: object
}) {
  return <FontAwesome size={20} {...props} />;
}

export default function CalendarScreen({ navigation }) {
  const { user,
    coursesList,
    course,
    EventsCalendar,
    eventByDateRequested,
    selectedDate,
    userNotifications,
    getEventsByCourse,
    getEventsAll,
    getEventsByDate,
    CurrentCourse,
    setSelectDate,
    getNotificationByUserEmail,
    signOut
  } = useContext(AppContext)
  
  const [buttons, setButtons] = useState()
  const [isModalVisible, setModalVisible] = useState(false);
  const [avoid, setvoid] = useState(false)

  useEffect(() => {
    if (eventByDateRequested) {
      // console.log("Should go to events screen")
      navigation.navigate("Eventos")
      // setTimeout(() => {
      // }, 1000)
    }
  }, [eventByDateRequested])

  useEffect(() => {
    if (user && user.email) {
      setInterval(() => {
        getNotificationByUserEmail()
      }, 60000)
    }
  }, [avoid])

  useEffect(() => {
    if (user && !user.course) {
      setTimeout(() => {
        navigation.navigate('EditProfile')

      }, 300)
    }
  }, [user])


  const handleSubmit = () => {
    signOut()
    console.log('logout user')
    
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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

  const updateCallendar = (date) => {
    const calendarEvents = EventsCalendar
    calendarEvents[date] = { ...calendarEvents[date], selected: true, selectedColor: 'black' }
    console.log('---------Calendar events:', date, calendarEvents)
  }
  return (
    <MainView>
      {/* <TitleMainScreen title='Eventos do Mês' /> */}
      <FlatList
        key={'_'}
        data={buttons}
        horizontal={true}
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
        style={{
          alignSelf: 'center',
          margin: 10,
        }}

      />
      <SelectDropdown
        data={coursesList}
        defaultButtonText={course.name ? course.name : 'Escolha um filtro'}
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
          //console.log("SELECTED ITEM: ", selectedItem, index)
          //console.log("SELECTED ID: ", selectedItem.id)
          CurrentCourse(selectedItem)
          console.log("curso: " + course)
          if (selectedItem.id == -1) {
            getEventsAll()
          } else {
            getEventsByCourse(selectedItem.id);
          }
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
      <Calendar
        // current={'2021-12-12'}
        onDayPress={(day) => {
          setSelectDate(day.dateString)
          getEventsByDate(day.dateString)
          navigation.navigate("Eventos")
          // updateCallendar(day.dateString)
          console.log('Selected date:', selectedDate)
        }}
        onDayLongPress={(day) => { console.log('selected day', day) }}
        // monthFormat={'dd MM yyyy'}
        onMonthChange={(month) => { console.log('month changed', month) }}
        hideExtraDays={false}
        disableMonthChange={false}
        firstDay={1}
        hideDayNames={false}
        showWeekNumbers={false}
        onPressArrowLeft={subtractMonth => subtractMonth()} rrr
        onPressArrowRight={addMonth => addMonth()}
        disableAllTouchEventsForDisabledDays={true}
        // renderHeader={(date) => {<Text>Teste</Text> }}
        enableSwipeMonths={true}
        markingType={'multi-dot'}
        markedDates={EventsCalendar}
        style={styles.calendar}

        theme={{
          textSectionTitleColor: 'black',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          arrowColor: 'black',
          monthTextColor: 'black',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 18,
        }}
      />
      <Modal isVisible={isModalVisible} >
        <View style={styles.modal}>
          <LinearGradient colors={["#ffffff", "#D47AE8"]}>
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

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 15,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '200',
    color: Colors.dark.tint
  },
  calendar: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
  dropdownBtnStyle: {
    margin: 15,
    marginTop: 30,
    padding: 10,
    backgroundColor: Colors.dark.tint,
    paddingHorizontal: 0,
    borderRadius: 10,
    textAlign: "left",
    height: 40,
    width: '50%'
  },
  dropdownBtnTxtStyle: {
    color: "#FFF",
    fontSize: 14,
  },
  dropdown: {
    borderRadius: 16,
    backgroundColor: Colors.dark.tint,
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
