import { FontAwesome } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ActivityIndicator, ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AboutScreen from '../screens/AboutScreen';
import EventsScreen from '../screens/EventsScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import Evento from '../screens/Evento';
import CalendarScreen from '../screens/CalendarScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddEventScreen from '../screens/AddEventScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import { useContext } from 'react';
import AppContext from '../contexts/appContext';
import { View } from '../components/Themed';
import EditProfileScreen from '../screens/EditProfileScreen';
import UpdadeEventScreen from '../screens/UpdateEventScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { signed, loading } = useContext(AppContext)
  if (loading) {
    return (
      (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color='#666' />
        </View>
      )
    )
  }
  return <RootNavigator />


}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Calendário"
    >

      <Stack.Screen name="Calendário" component={CalendarScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Eventos" component={EventsScreen}
        options={{
          headerShown: true,
          title: 'Eventos',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: Colors.Red.background }
        }}
      />
      <Stack.Screen name="About" component={AboutScreen}
        options={{
          headerShown: true,
          title: 'Sobre',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: Colors.Red.background }
        }}
      />
      <Stack.Screen name="Login" component={LoginScreen}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: Colors.dark.background },
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen}
        options={{
          headerShown: true,
          title: 'Perfil',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: Colors.Orange.background }
        }}
      />
      <Stack.Screen name="EditProfile" component={EditProfileScreen}
        options={{
          headerShown: true,
          title: 'Editar Perfil',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: Colors.Orange.background }
        }}
      />
      <Stack.Screen name="Event" component={Evento}
        options={{
          headerShown: true,
          title: 'Detalhes',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#192f6a' }
        }}
      />
      <Stack.Screen name="AddEvent" component={AddEventScreen}
        options={{
          headerShown: true,
          title: 'Adicionar Evento',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#8F98FF' }
        }}
      />

      <Stack.Screen name="UpdateEvent" component={UpdadeEventScreen}
        options={{
          headerShown: true,
          title: 'Editar Evento',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#192f6a' }
        }}
      />

      <Stack.Screen name="Notifications" component={NotificationsScreen}
        options={{
          headerShown: true,
          title: 'Notificações',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: Colors.Green.background }
        }}
      />      
    </Stack.Navigator>
  );
}


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
