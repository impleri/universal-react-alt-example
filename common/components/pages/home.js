import React from "react";
import { IndexLink } from "react-router";

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h2>Example Home Page</h2>
        <p className="dark">You've made it!</p>
        <p><IndexLink to="/todos">Example todo app</IndexLink></p>
      </div>
    )
  }
}
