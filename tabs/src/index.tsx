import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./rxutils";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
