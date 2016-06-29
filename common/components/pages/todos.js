import React from "react";
import TodosListing from "../listings/todos";

export default class TodosPage extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({
      type: React.PropTypes.string
    })
  };

  render() {
    return (
      <div>
        <TodosListing type={this.props.params.type} />
      </div>
    )
  }
}
