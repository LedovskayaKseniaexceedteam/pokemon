import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./redux";
import { Provider } from "react-redux";

ReactDOM.render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>,
  document.getElementById("root")
);
