import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import MainView from '../components/MainView';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { LocaleConfig } from 'react-native-calendars';
import calendar from 'react-native-calendars/src/calendar';

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dec.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Quar.', 'Quin.', 'Sex.', 'Sab.'],
  today: 'Hoje\'Hoj'
};
LocaleConfig.defaultLocale = 'pt-br';

import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome } from '@expo/vector-icons';
import TitleMainScreen from '../components/TitleMainScreen';
import { useEffect } from 'react';
import { useContext } from 'react';
import AppContext from '../contexts/appContext';




export default function CalendarScreen({ navigation }) {
  const { user, coursesList } = useContext(AppContext)

  useEffect(() => {
    console.log("cursos")
    console.log(coursesList)
    console.log('Devia navegar para perfil')
    if (user && !user.course) {
      setTimeout(() => {
        navigation.navigate('EditProfile')

      }, 1000)
    }
  }, [user])
  //Fake data for calendar
  const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
  const massage = { key: 'massage', color: 'blue', selectedDotColor: 'red' };
  const workout = { key: 'workout', color: 'green' };

  //fake data for dropdown
  const filter = ["Eng. de Software", "teste", "Psicologia", "Lic. Computação"]
  return (
    <MainView>
      <TitleMainScreen title='Eventos do Mês' />
      <SelectDropdown
        data={coursesList}
        defaultButtonText={'Escolha um filtro'}
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
          return selectedItem.name
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.name
        }}
      />
      <Calendar
        current={'2021-12-12'}
        onDayPress={(day) => { console.log('selected day', day) }}
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
        markedDates={{
          '2021-12-25': { dots: [vacation, massage, workout], selected: true, selectedColor: Colors.dark.tint },
          '2021-12-26': { dots: [massage, workout], disabled: true }
        }}
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
