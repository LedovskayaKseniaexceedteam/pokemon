import { Container, makeStyles } from "@material-ui/core";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Pagination } from "./components/Pagination";
import { PokemonCard } from "./components/PokemonCard";
import { AppState } from "./redux";
import { getPokemonsBasic, getPossibleTypes } from "./redux/pokemons/actions";

const useStyles = makeStyles({
  grid: {
    padding: "2em 0",
    display: "grid",
    gap: "1em",
    gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
  },
});

const App = () => {
  const classes = useStyles();

  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const page = params.get("page");
  const perPage = params.get("per_page");

  const pokemonsBasic = useSelector(
    (state: AppState) => state.pokemons.basicInfo
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPossibleTypes());
  }, []);

  useEffect(() => {
    if (!page || !perPage) return;
    dispatch(getPokemonsBasic({ page, perPage }));
  }, [page, perPage]);

  return (
    <Pagination>
      <Container className={classes.grid}>
        {!!pokemonsBasic.results.length &&
          pokemonsBasic.results.map((pokemon) => (
            <PokemonCard key={pokemon.name} info={pokemon} />
          ))}
      </Container>
    </Pagination>
  );
};

export default App;
