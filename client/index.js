import Iso from "iso";
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import flux from "../common/flux";
import routes from '../common/routes';

Iso.bootstrap(function (state, _, container) {
  flux.bootstrap(state);

  render(
    <Router history={browserHistory} routes={routes} />,
    document.getElementById("app")
  );
});
