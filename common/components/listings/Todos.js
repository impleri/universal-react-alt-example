import autobind from "autobind-decorator";
import React from "react";
import TodoItem from "../partials/Todo";
import actions from "../../actions/Todo";

export default class TodosListing extends React.Component {
  @autobind
  handleDestroy(id) {
    actions.remove(id);
  }

  @autobind
  handleSave(id, val) {
    actions.save(val, id);
  }

  @autobind
  handleToggle(id, completed) {
    actions.toggle(id, completed);
  }

  renderItem(item) {
    return (
      <TodoItem
          onDestroy={this.handleDestroy}
          onSave={this.handleSave}
          onToggle={this.handleToggle}
          todo={item}
      />
    )
  }

  render() {
    return (
      <ul className="todo-list">
        {this.renderItem({id: 34, completed: false, title: "Something cool"})}
      </ul>
    )
  }
}
