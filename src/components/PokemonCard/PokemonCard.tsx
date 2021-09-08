import { Container, makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux";
import { getPokemonInfo } from "../../redux/pokemons/actions";
import { Result } from "../../redux/pokemons/reducer";

type Props = {
  info: Result;
};

const useStyles = makeStyles({
  root: {
    minHeight: 300,
  },
  media: {
    height: 150,
    backgroundSize: "contain",
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
  },
  actionArea: {
    height: "100%",
  },
  types: {
    marginTop: "1em",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(1px, 1fr))",
    justifyItems: "center",
  },
  statField: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.25em",
    padding: "0 1em",
  },
  statField_name: {
    fontSize: 16,
  },
  statField_value: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export const PokemonCard: FC<Props> = ({ info }) => {
  const classes = useStyles();
  const cachedPokemon = useSelector(
    (state: AppState) => state.pokemons.itemsCache[info.name]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (cachedPokemon) return;
    dispatch(getPokemonInfo(info));
  }, []);

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        {cachedPokemon && (
          <CardMedia
            className={classes.media}
            image={
              "images" in cachedPokemon
                ? cachedPokemon.images.small
                : "/error.png"
            }
            title="Pokemon"
          />
        )}
        <CardContent>
          <Typography
            className={classes.name}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {cachedPokemon && "name" in cachedPokemon && cachedPokemon.name}
          </Typography>
          {cachedPokemon &&
            "stats" in cachedPokemon &&
            cachedPokemon.stats.map((stat) => (
              <Typography className={classes.statField} key={stat.name}>
                <span className={classes.statField_name}>{stat.name}</span>
                <span className={classes.statField_value}>
                  {stat.base_stat}
                </span>
              </Typography>
            ))}
          {cachedPokemon && "types" in cachedPokemon && (
            <Container className={classes.types}>
              {cachedPokemon.types.map((type) => (
                <Typography key={type}>{type}</Typography>
              ))}
            </Container>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
