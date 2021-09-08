import {
  FormControl,
  FormHelperText,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { FC, useState, ChangeEvent, useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router";

type Props = {
  variants: string[];
};

const useStyles = makeStyles({
  select: {
    maxWidth: "3.25em",
  },
});

export const ItemsPerPage: FC<Props> = ({ variants }) => {
  const classes = useStyles();

  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const perPage = params.get("per_page") || variants[0];

  const [query, setQuery] = useState(perPage);
  const history = useHistory();

  const onChange = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setQuery(event.target.value as string);
  };

  useEffect(() => {
    if (perPage === query) return;
    setQuery(params.get("per_page") || variants[0]);
  }, [perPage]);

  useEffect(() => {
    params.delete("per_page");
    params.append("per_page", query);
    history.push({ search: params.toString() });
  }, [query]);

  return (
    <FormControl>
      <Select
        className={classes.select}
        value={query}
        onChange={onChange}
        inputProps={{ "aria-label": "Without label" }}
      >
        {variants.map((variant) => (
          <MenuItem key={variant} value={variant}>
            {variant}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Per Page</FormHelperText>
    </FormControl>
  );
};
