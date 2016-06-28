import autobind from "autobind-decorator";
import connectToStores from "alt-utils/lib/connectToStores";
import React from "react";
import { IndexLink, Link } from "react-router";
import TodoItem from "../partials/todo";
import TodoInput from "../partials/todo-input";
import actions from "../../actions/todo";
import store from "../../stores/todo";

@connectToStores
export default class TodosListing extends React.Component {
  static propTypes = {
    todos: React.PropTypes.array.isRequired,
    type: React.PropTypes.string
  };

  static defaultProps = {
    todos: [],
    type: ""
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

  @autobind
  handleToggleAll(event) {
    console.info("Toggle all", event.target.value);
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

  renderHeader() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoInput onSave={this.handleSave} />
      </header>
    )
  }

  renderList(todos) {
    if (!this.props.todos.length) {
      return;
    }

    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" onChange={this.handleToggleAll} />
        <ul className="todo-list">
          {todos.map((todo) => this.renderItem(todo))}
        </ul>
      </section>
    )
  }

  renderFooter(remain) {
    if (!this.props.todos.length) {
      return;
    }

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{remain}</strong> item{(remain === 1) ? "" : "s"} left
        </span>
        <ul className="filters">
          <li>
            <IndexLink to="/todos" activeClassName="selected">All</IndexLink>
          </li>
          <li>
            <Link to="/todos/active" activeClassName="selected">Active</Link>
          </li>
          <li>
            <Link to="/todos/completed" activeClassName="selected">Completed</Link>
          </li>
        </ul>
      </footer>
    )
  }

  render() {
    let todos = this.props.todos.filter((todo) => {
          switch (this.props.type) {
            case "active":
              return !todo.completed;
              break;

            case "completed":
              return todo.completed;
              break;

            default:
              return true;
          }
        }),
        remain = this.props.todos.filter((todo) => {
          return !todo.completed;
        }).length;

    return (
      <section className="todoapp">
        {this.renderHeader()}
        {this.renderList(todos)}
        {this.renderFooter(remain)}
      </section>
    )
  }
}
