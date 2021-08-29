/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  SportDetailTab: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  LearnSport: undefined;
  History: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export interface IAction {
  type: ACTION_TYPES;
  payload?: any | string;
}

export enum ACTION_TYPES {
  API_PENDING = "API_PENDING",
  API_SUCCESS = "API_SUCCESS",
  API_ERROR = "API_ERROR",
  OPEN_SPORT = "OPEN_SPORT",
  TOGGLE_SEARCH = "TOGGLE_SEARCH",
  MAKE_FAVOURITE = "MAKE_FAVOURITE",
  MAKE_UNFAVOURITE = "MAKE_UNFAVOURITE",
}
export interface ISportImageVariant {
  thumbnail?: { url: String };
  medium?: { url: string };
}
export interface ISportImageData {
  url?: string;
  variants?: ISportImageVariant[];
}
export interface ISportRelationship {
  images: { data: ISportImageData[] };
  tags: { data: string[] };
}
export interface ISportAttribute {
  name: string;
  description: string;
  parent_id: null | number;
  slug: string;
  icon: string;
}
export interface ISport {
  id: number;
  type: "sports";
  attributes: ISportAttribute;
  relationships: ISportRelationship;
}
export interface IStore {
  data: { data: ISport[] } | "";
  error: string;
  history: number[];
  openSportId?: number;
  showSearchBar: boolean;
  favourites: Set<number>;
}
