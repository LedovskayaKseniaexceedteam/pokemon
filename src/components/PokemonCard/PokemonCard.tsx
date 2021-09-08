import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux";
import { getPokemonInfo } from "../../redux/pokemons/actions";
import { Result } from "../../redux/pokemons/reducer";

type Props = {
  preview: Result;
};

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export const PokemonCard: FC<Props> = ({ preview }) => {
  const classes = useStyles();
  const cachedPokemon = useSelector(
    (state: AppState) => state.pokemons.itemsCache[preview.name]
  );

  useEffect(() => {
    if (cachedPokemon) return;
    getPokemonInfo(preview);
  }, []);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} title="Pokemon" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {/* {pokemon.name} */}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
