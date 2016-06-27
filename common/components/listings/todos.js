import autobind from "autobind-decorator";
import connectToStores from "alt-utils/lib/connectToStores";
import React from "react";
import TodoItem from "../partials/todo";
import actions from "../../actions/todo";
import store from "../../stores/todo";

@connectToStores
export default class TodosListing extends React.Component {
  static propTypes = {
    todos: React.PropTypes.array.isRequired
  };

  static defaultProps = {
    todos: []
  };

  componentDidMount() {
    actions.fetch();
  }

  static getStores() {
    return [store];
  }

  static getPropsFromStores() {
    let todos = store.getState().get("todos");

    return {todos: todos.toList().toJS()};
  }

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
          key={item.id}
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
        {this.props.todos.map(todo => this.renderItem(todo))}
      </ul>
    )
  }
}
