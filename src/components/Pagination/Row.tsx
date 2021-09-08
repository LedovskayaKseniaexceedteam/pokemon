import { Container, makeStyles } from "@material-ui/core";
import { FC } from "react";
import { ItemsPerPage } from "./ItemsPerPage";
import { Pages } from "./Pages";

type Props = {
  itemsPerPageVariants: string[];
};
const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const Row: FC<Props> = ({ itemsPerPageVariants }) => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <ItemsPerPage variants={itemsPerPageVariants} />
      <Pages />
    </Container>
  );
};
