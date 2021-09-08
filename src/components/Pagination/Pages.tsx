import { Pagination } from "@material-ui/lab";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { AppState } from "../../redux";

export const Pages = () => {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const page = params.get("page") || "1";
  const perPage = params.get("per_page") || "10";
  const totalCount = useSelector(
    (state: AppState) => state.pokemons.basicInfo.count
  );

  const [query, setQuery] = useState(page);
  const history = useHistory();

  const onChange = (event: ChangeEvent<unknown>, page: number) => {
    setQuery(page.toString());
  };

  useEffect(() => {
    params.delete("page");
    params.append("page", query);
    history.push({ search: params.toString() });
  }, [query]);

  return (
    <>
      {!!page && !!perPage && !!totalCount && (
        <Pagination
          page={+page}
          count={Math.floor(totalCount / +perPage)}
          onChange={onChange}
        />
      )}
    </>
  );
};
