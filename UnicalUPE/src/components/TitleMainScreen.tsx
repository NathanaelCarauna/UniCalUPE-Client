import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';

export default function TitleMainScreen({title}) {

    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>
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
});
