import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/main.scss";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { extendedApiSlice } from "./features/shops/shopsSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

store.dispatch(extendedApiSlice.endpoints.getShops.initiate()); // initiate => to get the initial data and loade it when the app starts up

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
