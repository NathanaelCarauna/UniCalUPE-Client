/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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