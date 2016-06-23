import React from "react";
import { Router, browserHistory } from "react-router";
import routes from "../common/routes";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={browserHistory} routes={routes} />
      </div>
    );
  }
}
