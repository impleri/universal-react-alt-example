import { bind, createStore } from "alt-utils/lib/decorators";
import Immutable from "immutable";
import makeImmutable from "alt-utils/lib/ImmutableUtil";
import flux from "../flux";
import actions from "../actions/todo";

@createStore(flux)
@makeImmutable
class TodoStore {
  static displayName = "TodoStore";

  constructor() {
    this.state = Immutable.Map({
      todos: Immutable.Map({})
    });
  }

  @bind(actions.delete)
  delete(id) {
    this.setState(this.state.deleteIn(["todos", id]));
  }

  @bind(actions.upsert)
  upsert(todo) {
    this.setState(this.state.setIn(["todos", todo.id], Immutable.fromJS(todo)));
  }

  @bind(actions.upsertMany)
  upsertMany(todos) {
    let newList = Immutable.Map(),
        index,
        todo;

    for (index in todos) {
      todo = todos[index];
      newList = newList.set(todo.id, Immutable.fromJS(todo));
    }

    this.setState(this.state.mergeIn(["todos"], newList));
  }
}

export default TodoStore;
