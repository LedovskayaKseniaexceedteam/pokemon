import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { pokemonsReducer as pokemons } from "./pokemons/reducer";

const rootReducer = combineReducers({
  pokemons,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppState = ReturnType<typeof store.getState>;
