import React from "react";

export default class AppLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired
  };

  render() {
    return (
      <div>
          {this.props.children}
      </div>
    )
  }
}
