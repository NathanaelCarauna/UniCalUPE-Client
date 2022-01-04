import * as React from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet } from 'react-native';

import MainView from '../components/MainView';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Colors from '../constants/Colors';
import { LocaleConfig } from 'react-native-calendars';
import { anonymousButtons, studentButtons, adminButtons } from '../constants/NavigationButtons';
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
    loading,
    userNotifications,
    getEventByUser,
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
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (eventByDateRequested) {
      // console.log("Should go to events screen")      
      navigation.navigate("Eventos")
    }
  }, [eventByDateRequested])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if(user && user.course){
      getNotificationByUserEmail();
      getEventsByCourse(course && course.id ? course.id : user.course.id);
      getEventByUser(user.id);
    }else{
      getEventsAll()
    }
    setRefreshing(false)
  }, []);

  useEffect(() => {
    console.log("*********************", user)
      if (user.name && !user.course) {
        console.log("USUAAAARIO::::", user)
        navigation.navigate('EditProfile')
      }      
  }, [user])


  const handleSubmit = () => {
    signOut()
    toggleModal()
    console.log('logout user')

  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  useEffect(() => {
    console.log('Filter buttons called')
    if (user) {
      if (user.accountType == 'STUDENT')
        setButtons(studentButtons(navigation, toggleModal))
      else if (user.accountType == 'ADM')
        setButtons(adminButtons(navigation, toggleModal))
      else
        setButtons(anonymousButtons(navigation, toggleModal))
    } else {
      setButtons(anonymousButtons(navigation, toggleModal))
    }
  }, [user])

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
    <MainView>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
      {/* <TitleMainScreen title='Eventos do Mês' /> */}
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
          console.log('Calendar select date:', day.dateString)
          setSelectDate(day.dateString)
          getEventsByDate(day.dateString)
          navigation.navigate("Eventos")
          // updateCallendar(day.dateString)
          console.log('Selected date:', selectedDate)
        }}
        onDayLongPress={(day) => { console.log('selected day', day) }}
        // monthFormat={'dd MM yyyy'}
        onMonthChange={(month) => { console.log('month changed', month) }}
        hideExtraDays={true}
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
          backgroundColor: 'black',
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
          <LinearGradient colors={["#ffffff", "#ffffff"]}>
            <Text style={styles.textModal} >Você realmente deseja sair da sua conta ?</Text>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.buttonModalBack}
                onPress={toggleModal}>
                <TabBarIcon name="arrow-left" color={'white'} style={styles.icon} size={20} />
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
      </ScrollView>
      <FlatList
        key={'_'}
        data={buttons}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around', alignSelf: 'flex-end' }}
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
          margin: 10,
        }}

      />
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
    // flex: 1,    
    justifyContent: 'space-around',
    alignContent: 'space-around',
    marginVertical: 10,
    marginHorizontal: 15,
    paddingVertical: 20,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: Colors.dark.tint
  },
  dropdownBtnStyle: {
    margin: 15,
    marginTop: 30,
    alignSelf: 'center',
    backgroundColor: Colors.dark.tint,
    paddingHorizontal: 0,
    borderRadius: 10,
    textAlign: "left",
    height: 40,
    width: '80%'
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
  },
  modal: {
    overflow: 'hidden',
    borderRadius: 15,

  },
  button: {
    margin: 40,
    fontWeight: 'bold',
    backgroundColor: Colors.Orange.background,
    borderRadius: 15,
  },
  buttonModal: {
    //margin: 20,
    fontWeight: 'bold',
    backgroundColor: Colors.Pourple.background,
    borderRadius: 15,
  },
  buttons: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    //alignContent: 'center'
    justifyContent: 'space-evenly',
    padding: 10,
  },
  buttonModalBack: {
    fontWeight: 'bold',
    backgroundColor: Colors.Pourple.background,
    borderRadius: 15,

  },
  icon: {
    marginTop: 14,
    marginHorizontal: 20
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
    fontSize: 16,
    margin: 30,
    color: 'gray',
    borderRadius: 16,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});
