import React from "react";
import { Route, IndexRoute } from "react-router";
import AppLayout from "./components/layout/app";
import HomePage from "./components/pages/home";
import TodosPage from "./components/pages/todos";

export default (
  <Route component={AppLayout} path="/">
    <Route component={TodosPage} path="todos">
        <Route component={TodosPage} path=":type" />
    </Route>
    <IndexRoute component={HomePage} />
  </Route>
);
