import Iso from "iso";
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import clientSources from "./sources/";
import flux from "../common/flux";
import routes from '../common/routes';
import SourceContainer from "../common/sources";

clientSources(SourceContainer);

Iso.bootstrap(function (state, _, container) {
  flux.bootstrap(state);

  render(
    <Router history={browserHistory} routes={routes} />,
    document.getElementById("app")
  );
});
