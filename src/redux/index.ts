import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { pokemonsReducer as pokemons } from "./pokemons/reducer";

const rootReducer = combineReducers({
  pokemons,
});
// export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);
export type AppState = ReturnType<typeof store.getState>;
