import React from "react";
import { Route, IndexRoute } from "react-router";
import AppLayout from "./components/layout/App";
import HomePage from "./components/pages/Home";

export default (
  <Route component={AppLayout} path="/">
    <IndexRoute component={HomePage} />
  </Route>
);
