import autobind from "autobind-decorator";
import classNames from "classnames";
import React from "react";

const ESCAPE_KEY = 27,
    ENTER_KEY = 13;

export default class TodoItem extends React.Component {
  static propTypes = {
    onDestroy: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onToggle: React.PropTypes.func.isRequired,
    todo: React.PropTypes.shape({
      id: React.PropTypes.int,
      completed: React.PropTypes.bool,
      title: React.PropTypes.string
    })
  };

  static defaultProps = {
    editing: false,
    todo: {
      completed: false,
      title: ""
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      editing: props.editing,
      editText: props.todo.title
    }
  }

  @autobind
  handleBlur(event) {
    this.setState({
      editing: false
    });
  }

  @autobind
  handleCancel(event) {
    this.setState({
      editing: false,
      editText: this.props.todo.title
    });
  }

  @autobind
  handleChange(event) {
    this.setState({
      editText: event.target.value
    });
  }

  @autobind
  handleDestroy(event) {
    this.props.onDestroy(this.props.todo.id);
  }

  @autobind
  handleEdit() {
    this.setState({
      editing: true
    });
  }

  @autobind
  handleKeyDown(event) {
    switch (event.which) {
      case ESCAPE_KEY:
        this.handleCancel(event);
        break;

      case ENTER_KEY:
        this.handleSubmit(event);
        break;
    }

  }

  @autobind
  handleSubmit(event) {
    let val = this.state.editText.trim();

    this.props.onSave(this.props.todo.id, val);
    this.setState({
      editing: false,
      editText: val
    });
  }

  @autobind
  handleToggle(event) {
    this.props.onToggle(this.props.todo.id, !this.props.todo.completed);
  }

  render() {
    let classes = classNames({
          completed: this.props.todo.completed,
          editing: this.state.editing
        });

    return (
      <li className={classes}>
        <div className="view">
          <input
            checked={this.props.todo.completed}
            className="toggle"
            onChange={this.handleToggle}
            type="checkbox"
            value="1"
          />
          <label onDoubleClick={this.handleEdit}>
            {this.props.todo.title}
          </label>
          <button
            className="destroy"
            onClick={this.handleDestroy}
          />
        </div>
        <input
          className="edit"
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          ref="editField"
          value={this.state.editText}
        />
      </li>
    )
  }
}
