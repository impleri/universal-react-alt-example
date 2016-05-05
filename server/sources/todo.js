import TodoModel from "../models/todo";

export default TodoSource = {
  browse() {
    return TodoModel.find().then((todos) => {
      return {data: todos};
    });
  },

  read(id) {
    return TodoModel.findById(id).then((todo) => {
      return {data: todo};
    });
  },

  add(data) {
    return TodoModel.create(data);
  },

  edit(id, data) {
    return TodoModel.update(id, data);
  },

  delete(id) {
    return TodoModel.delete(id);
  }
};
