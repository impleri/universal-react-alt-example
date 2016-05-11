import React from "react";

export default class TodoItem extends React.Component {
  static propTypes = {
    editing: React.propTypes.bool,
    onDestroy: React.propTypes.func.isRequired,
    onEdit: React.propTypes.func.isRequired,
    onSave: React.propTypes.func.isRequired,
    onToggle: React.propTypes.func,
    todo: React.propTypes.shape({
      completed: React.propTypes.bool,
      title: React.propTypes.string
    })
  };

	static defaultProps = {
		editing: false,
		todo: {
			completed: false,
			title: ""
		}
	};

	constructor: function (props) {
		super(props);

		this.state = {
			editText: props.todo.title
		}
	}

	handleChange: function (event) {
		this.setState({editText: event.target.value});
	}

  handleEdit: function () {
    this.props.onEdit();
    this.setState({editText: this.props.todo.title});
  }

	handleKeyDown: function (event) {
		switch (event.which) {
			case ESCAPE_KEY:
				this.setState({editText: this.props.todo.title});
				this.props.onCancel(event);
				break;
			case ENTER_KEY:
				this.handleSubmit(event);
		}
	}

  handleSubmit: function (event) {
		let val = this.state.editText.trim();

    if (val) {
			this.props.onSave(val);
			this.setState({editText: val});
		} else {
			this.props.onDestroy();
		}
	}

  render() {
		let classes = classNames({
					completed: this.props.todo.completed,
					editing: this.props.editing
				});

		return (
      <li className={classes}>
				<div className="view">
					<input
						checked={this.props.todo.completed}
						className="toggle"
						onChange={this.props.onToggle}
						type="checkbox"
					/>
					<label onDoubleClick={this.handleEdit}>
						{this.props.todo.title}
					</label>
					<button
						className="destroy"
						onClick={this.props.onDestroy}
					/>
				</div>
				<input
					className="edit"
					onBlur={this.handleSubmit}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
					ref="editField"
					value={this.state.editText}
				/>
			</li>
    )
  }
}
