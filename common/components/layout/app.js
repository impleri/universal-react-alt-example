import React from "react";

export default class AppLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired
  };

  render() {
    return (
      <div>
        <header>
          <h1>Example Universal Alt/React Application</h1>
        </header>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
