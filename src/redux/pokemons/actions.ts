import { Action, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "..";
import { setError } from "../error/actions";
import { setIsLoading } from "../isLoading/actions";
import { InitialState, Result } from "./reducer";
import * as TYPES from "./types";

const setPokemonsBasic = (result: InitialState["basicInfo"]) => ({
  type: TYPES.SET_POKEMONS_BASIC_INFO,
  payload: result,
});

const setPokemonInfo = (info: Pokemon | { error: boolean }) => ({
  type: TYPES.SET_POKEMON,
  payload: info,
});

const setPossibleTypes = (types: InitialState["types"]) => ({
  type: TYPES.SET_POSSIBLE_TYPES,
  payload: types,
});

const baseURL = "https://pokeapi.co/api/v2";

export const getPokemonsBasic =
  ({ page, perPage }: { page: string; perPage: string }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setError(null));
      dispatch(setIsLoading(true));
      const response = await fetch(
        `${baseURL}/pokemon?offset=${(+page - 1) * +perPage}&limit=${perPage}`
      );
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
      dispatch(
        setPokemonInfo({
          name: result.name,
          images: {
            small: result.sprites.front_default,
            large: result.sprites.other["official-artwork"].front_default,
          },
          types: result.types.map(
            (entity: { type: { name: string } }) => entity.type.name
          ),
          stats: result.stats.map(
            (stat: {
              base_stat: number;
              stat: {
                name: string;
              };
            }) => ({
              base_stat: stat.base_stat,
              name: stat.stat.name,
            })
          ),
        })
      );
    } catch {
      dispatch(
        setPokemonInfo({
          name: basicInfo["name"],
          error: true,
        })
      );
      dispatch(setError(`Something went wrong`));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const getPossibleTypes = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setError(null));
    dispatch(setIsLoading(true));
    const response = await fetch(`${baseURL}/type`);
    const result = await response.json();
    dispatch(
      setPossibleTypes({
        ...result,
        color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
      })
    );
  } catch {
    dispatch(setError("Failed to get pokemon types"));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const toggleFilter =
  (newFilter: string) =>
  (
    dispatch: ThunkDispatch<AppState, unknown, Action<any>>,
    getState: () => AppState
  ) => {
    const filter = getState().pokemons.filter;
    const isSetted = filter && filter.names.includes(newFilter);
    if (isSetted) {
      dispatch(removeFilter(newFilter));
    } else {
      dispatch(addFilter(newFilter));
    }
  };

const removeFilter =
  (filter: string) => (dispatch: Dispatch, getState: () => AppState) => {
    const pokemonFilter = getState().pokemons.filter;
    if (!pokemonFilter) return;
    dispatch(
      setFilter({
        names: pokemonFilter.names.filter((name) => name !== filter),
        items: pokemonFilter.items.filter(
          (item) => !item.types.includes(filter)
        ),
      })
    );
  };

const addFilter =
  (filter: string) => async (dispatch: Dispatch, getState: () => AppState) => {
    try {
      const filterId = getState().pokemons.types.find(
        (type) => type.name === filter
      )?.id;
      if (!filterId) throw new Error("Filter now found");
      const pokemonFilter = getState().pokemons.filter;
      dispatch(setError(null));
      dispatch(setIsLoading(true));
      const response = await fetch(`${baseURL}/type/${filterId}`);
      const result = await response.json();
      dispatch(
        setFilter(
          pokemonFilter
            ? {
                names: [...pokemonFilter.names, filter],
                items: [...pokemonFilter.items, result.pokemon],
              }
            : {
                names: [filter],
                items: [result.pokemon],
              }
        )
      );
    } catch {
      dispatch(setError("Failed to get Pokemon data"));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

const setFilter = (filter: InitialState["filter"]) => ({
  type: TYPES.SET_FILTER,
  payload: filter,
});
