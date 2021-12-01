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

export default function CalendarScreen() {
  const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
  const massage = { key: 'massage', color: 'blue', selectedDotColor: 'red' };
  const workout = { key: 'workout', color: 'green' };
  return (
    <MainView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Eventos do Mês</Text>
      </View>
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
    marginTop: 15,
    marginHorizontal: 15,
  }
});
