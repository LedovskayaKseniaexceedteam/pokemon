import { Dispatch } from "redux";
import { AppState } from "..";
import { setError } from "../error/actions";
import { setIsLoading } from "../isLoading/actions";
import { InitialState, Result } from "./reducer";

export const setPokemonsBasic = (result: InitialState) => ({
  type: "SET_POKEMONS_BASIC",
  payload: result,
});

export const setPokemonInfo = (info: Pokemon) => ({
  type: "SET_POKEMON_INFO",
  payload: info,
});

const baseURL = "https://pokeapi.co/api/v2/";

export const getPokemonsBasic = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setError(null));
    dispatch(setIsLoading(true));
    const response = await fetch(`${baseURL}/pokemon`);
    const result = await response.json();
    dispatch(setPokemonsBasic(result));
  } catch {
    dispatch(setError("Failed to get Pokemon data"));
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const getPokemonInfo =
  (basicInfo: Result) =>
  async (dispatch: Dispatch, getState: () => AppState) => {
    const cachedPokemon = getState().pokemons.itemsCache;
    if (basicInfo["name"] in cachedPokemon) return;
    try {
      dispatch(setError(null));
      dispatch(setIsLoading(true));
      const response = await fetch(basicInfo.url);
      const result = await response.json();
      dispatch(setPokemonInfo(result));
    } catch {
      dispatch(setError(`Failed to get info about ${basicInfo.name}`));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
