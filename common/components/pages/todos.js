import React from "react";
import TodosListing from "../listings/todos";

export default class TodosPage extends React.Component {
  render() {
    return (
      <div>
        <TodosListing type={this.props.params.type} />
      </div>
    )
  }
}
