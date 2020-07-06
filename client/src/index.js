import React from "react";
import ReactDOM from "react-dom";
import App from "./container/App";
import Store from "./store/store";

import "./index.scss";

ReactDOM.render(
  <Store>
    <App />
  </Store>,
  document.getElementById("root")
);
