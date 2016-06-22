import React from "react";
import { Route, IndexRoute } from "react-router";
import AppLayout from "./components/layout/App";
import HomePage from "./components/pages/Home";
import TodosPage from "./components/pages/Todos";

export default (
  <Route component={AppLayout} path="/">
    <Route component={TodosPage} path="todos" />
    <IndexRoute component={HomePage} />
  </Route>
);
