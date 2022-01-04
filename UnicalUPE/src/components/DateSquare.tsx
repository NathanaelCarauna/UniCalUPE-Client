import * as WebBrowser from 'expo-web-browser';
import React, { useContext } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { Text} from './Themed';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import AppContext from '../contexts/appContext';
import { propsType } from '../types';


export default function DateSquare({ day, date, selected, month, year}: propsType) {
    const { eventsList, setEventByDateRequested, getEventsByDate, selectedDate, setSelectDate} = useContext(AppContext)
    const setSelected = (selected: boolean) => {
        return selected
            ? { color: {color: 'white'}, background: '#4ca9df'}
            : { backColorTop: '#fff', backColorBottom: '#fff' }
    }
    const selectStyle = setSelected(selected);    

    const GetEventsByDate = () => {
        console.log("######################## data: " +selectedDate)
        console.log(date)
        if(date.length <2){
            setSelectDate(`${year}-${month + 1}-0${date}`)
        }else{
            
            setSelectDate(`${year}-${month + 1}-${date}`)
        }
        console.log("######################## data atualizada #############################" )
        console.log(selectedDate)
        getEventsByDate(selectedDate)
        //navigation.navigate('Eventos')
      }

    return (
        <TouchableOpacity style={[styles.square, {backgroundColor: selectStyle.background}]} onPress={GetEventsByDate}>
            <Text style={[styles.Text, selectStyle.color]}>{day }</Text>                                    
            <Text style={[styles.number, date == new Date().getDate() ? {color: Colors.dark.background} :  selectStyle.color]}>{date}</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    square: {
        width: 48,
        height: 65,
        paddingVertical: 5,
        borderRadius: 15,
        borderColor: Colors.dark.background,
        borderWidth: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    number: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },
    Text: {
        fontSize: 12,
        color: Colors.dark.background
        // color: '#BCC1CD'
    }
})