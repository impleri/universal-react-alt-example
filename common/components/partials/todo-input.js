import autobind from "autobind-decorator";
import React from "react";

const ESCAPE_KEY = 27,
    ENTER_KEY = 13;

export default class TodoItem extends React.Component {
  static propTypes = {
    onSave: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      text: ""
    }
  }

  @autobind
  handleCancel() {
    this.setState({text: ""});
  }

  @autobind
  handleChange(event) {
    this.setState({text: event.target.value});
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
  handleSubmit() {
    let val = this.state.text.trim();

    this.props.onSave(null, val);
    this.setState({text: ""});
  }

  render() {
    return (
      <input
          className="new-todo"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="What needs to be done?"
          value={this.state.text}
      />
    )
  }
}
