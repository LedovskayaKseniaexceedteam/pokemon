import * as TYPES from "./types";
import { AnyAction } from "redux";

export type Result = {
  name: string;
  url: string;
};

const initialState = {
  basicInfo: {
    count: null as null | number,
    next: null as null | string,
    previous: null as null | string,
    results: [] as Result[],
  },
  resultsCache: [] as Result[],
  itemsCache: {} as { [key in Pokemon["name"]]: Pokemon },
};

export type InitialState = typeof initialState;

export const pokemonsReducer = (
  state = initialState,
  action: AnyAction
): InitialState => {
  switch (action.type) {
    case TYPES.SET_POKEMONS_BASIC_INFO:
      return {
        ...state,
        basicInfo: action.payload,
      };
    case TYPES.SET_POKEMON:
      return {
        ...state,
        itemsCache: {
          ...state.itemsCache,
          [action.payload.name]: action.payload,
        },
      };
    default:
      return state;
  }
};
