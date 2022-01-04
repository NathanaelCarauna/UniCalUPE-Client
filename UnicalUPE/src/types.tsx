/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text as DefaultText, View as DefaultView } from 'react-native';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  About: undefined;
  Login: undefined;
  Profile: undefined;
  AddEvent: undefined;
  Notifications: undefined;
  Event: undefined;
  ExpoNotification: undefined;
  Eventos: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Navigation: undefined;
  TabTwo: undefined;
  TabThree: undefined;
  Evento: undefined;
  About: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type PropsButton = {
  navigation: CompositeNavigationProp<BottomTabNavigationProp<RootTabParamList, "Navigation">, NativeStackNavigationProp<RootStackParamList, string>>
  buttonText: string,
  backColor: string,
  destination: string | Function
};

export type propsType = { 
  day: string, 
  date: string, 
  selected: boolean,
  month: string, 
  year: string 
};

export type PropsButtonNotification = {

  title: string,
  date: string,
  category: string,
  event: object
};

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export type AuthResponse = {
  type: string;
  params: {
      access_token: string;
  }
};

export type user = { 
  email: string, 
  name: string, 
  id: number, 
  accountType: string 
};

export type email = { email: string };

export type eventType = {
  event: {
      id: string,
      title: string
      local: string
      presentor: string
      course: string
      category: string
      description: string
      endDate: string
      endHour: string
      link: string
      startDate: string
      startHour: string

  }
};
export type user = { email: string, name: string, id: number, accountType: string }