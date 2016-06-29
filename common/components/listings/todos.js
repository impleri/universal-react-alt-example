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

  constructor(props) {
    super(props);

    this.state = {
      all: false,
      todos: this.filterTodos(props.todos, props.type)
    };
  }

  componentWillReceiveProps(newProps) {
    let todos = this.filterTodos(newProps.todos, newProps.type);
    this.setState({
      all: (todos.length && !this.filterTodos(todos, "active").length),
      todos
    });
  }

  filterTodos(rawTodos, type) {
    return rawTodos.filter((todo) => {
      let val = true;

      switch (type) {
        case "active":
          val = !todo.completed;
          break;

        case "completed":
          val = todo.completed;
          break;

        default:
          break;
      }

      return val;
    });
  }

  @autobind
  handleClear() {
    this.filterTodos(this.state.todos, "completed")
      .forEach((todo) => actions.remove(todo.id));
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
    this.state.todos.forEach((todo) => actions.toggle(todo.id, event.target.checked));
    this.setState({all: (event.target.checked)})
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
        <input className="toggle-all" type="checkbox" checked={this.state.all} onChange={this.handleToggleAll} />
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
        {this.renderClearButton()}
      </footer>
    )
  }

  renderClearButton() {
    if (this.filterTodos(this.state.todos, "completed").length) {
      return <button className="clear-completed" onClick={this.handleClear}>Clear completed</button>;
    }
  }

  render() {
    let remain = this.filterTodos(this.props.todos, "active").length;

    return (
      <section className="todoapp">
        {this.renderHeader()}
        {this.renderList(this.state.todos)}
        {this.renderFooter(remain)}
      </section>
    )
  }
}
