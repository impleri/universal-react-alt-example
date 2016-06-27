import mongoose from "../database";

const TodoSchema = mongoose.Schema({
      title: String,
      createdAt: {type: Date, default: Date.now},
      completedAt: {type: Date, default: null}
    });

TodoSchema.virtual("completed").get(function() {
  return (!!this.completedAt);
});

TodoSchema.set("toObject", {
  getters: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.completedAt;
  }
});

const Todo = mongoose.model("Todo", TodoSchema);

export default {
  delete(id) {
    return Todo.findByIdAndRemove(id).exec();
  },

  export(todos) {
    if (!Array.isArray(todos)) {
      todos = [todos];
    }

    return todos.map((todo) => {
      return todo.toObject();
    });
  },

  find(completed) {
    let query = {};

    if (completed === true) {
      query.completedAt = {$lte: new Date()};
    } else if (completed === false) {
      query.completedAt = null;
    }

    return Todo.find(query).exec();
  },

  put(record) {
    if (record.completedAt) {
      record.completedAt = new Date(record.completedAt);
    }

    return Todo.create(record);
  },

  upsert(id, record) {
    if (record.completedAt) {
      record.completedAt = new Date(record.completedAt);
    }

    return Todo.findByIdAndUpdate(id, record, {new: true}).exec();
  }
};
