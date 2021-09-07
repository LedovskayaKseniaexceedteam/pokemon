import { PaginationItem } from "@material-ui/lab";
import { default as PaginationMUI } from "@material-ui/lab/Pagination";
import { FC, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const Pagination: FC<Props> = ({ children }) => {
  let { search } = useLocation();

  const query = new URLSearchParams(search);
  const page = query.get("page");
  // const paramValue = query.get("value");

  return (
    <>
      <PaginationMUI
        page={page ? +page : 1}
        count={10}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/${item.page === 1 ? "" : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
      {children}
      <PaginationMUI
        page={page ? +page : 1}
        count={10}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/${item.page === 1 ? "" : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
    </>
  );
};
