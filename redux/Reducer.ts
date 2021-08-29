import { ACTION_TYPES, IAction, IStore } from "../types";

const initialState: IStore = {
  data: "",
  error: "",
  history: [],
  openSportId: undefined,
  showSearchBar: false,
  favourites: new Set(),
};

const apiReducer = (state: IStore = initialState, action: IAction) => {
  switch (action.type) {
    case ACTION_TYPES.API_PENDING:
      return {
        ...state,
      };
    case ACTION_TYPES.API_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case ACTION_TYPES.API_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

const sportReducer = (state: IStore = initialState, action: IAction) => {
  switch (action.type) {
    case ACTION_TYPES.OPEN_SPORT:
      return {
        ...state,
        history: [action.payload, ...state.history],
        openSportId: action.payload,
      };
    case ACTION_TYPES.TOGGLE_SEARCH:
      return {
        ...state,
        showSearchBar: action.payload,
      };
    case ACTION_TYPES.MAKE_FAVOURITE:
      return {
        ...state,
        favourites: new Set([...state.favourites, action.payload]),
      };
    case ACTION_TYPES.MAKE_UNFAVOURITE:
      return {
        ...state,
        favourites: new Set(
          [...state.favourites].filter((item) => item !== action.payload)
        ),
      };
    default:
      return state;
  }
};

export { apiReducer, sportReducer };
