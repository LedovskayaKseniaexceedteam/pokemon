import { FC, ReactNode, useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import { Row } from "./Row";

type Props = {
  children: ReactNode;
};

const itemsPerPageVariants = ["10", "20", "50"];

export const Pagination: FC<Props> = ({ children }) => {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const page = params.get("page");
  const perPage = params.get("per_page");
  const history = useHistory();
  useEffect(() => {
    if (!page) {
      params.append("page", "1");
    }
    if (!perPage) {
      params.append("per_page", "10");
    }
    history.push({ search: params.toString() });
  }, []);
  return (
    <>
      <Row itemsPerPageVariants={itemsPerPageVariants} />
      {children}
      <Row itemsPerPageVariants={itemsPerPageVariants} />
    </>
  );
};
