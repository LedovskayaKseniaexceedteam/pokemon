import { Route } from "react-router";
import { Pagination } from "./components/Pagination";

const App = () => {
  return (
    <Route path="/:per_page?:page?">
      <Pagination>Hello world</Pagination>
    </Route>
  );
};

export default App;
