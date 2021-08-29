import { ACTION_TYPES, ISport } from "../types";

export const fetchData = () => ({
  type: ACTION_TYPES.API_PENDING,
});

export const fetchSuccess = (data: { data: ISport[] }) => ({
  type: ACTION_TYPES.API_SUCCESS,
  payload: data,
});

export const fetchError = (error: any) => ({
  type: ACTION_TYPES.API_ERROR,
  payload: error,
});

export const openSport = (sportId: number) => ({
  type: ACTION_TYPES.OPEN_SPORT,
  payload: sportId,
});

export const toggleSearch = (show: boolean) => ({
  type: ACTION_TYPES.TOGGLE_SEARCH,
  payload: show,
});

export const makeFavourite = (sportId: number) => ({
  type: ACTION_TYPES.MAKE_FAVOURITE,
  payload: sportId,
});

export const makeUnfavourite = (sportId: number) => ({
  type: ACTION_TYPES.MAKE_UNFAVOURITE,
  payload: sportId,
});
