import mongoose from "../database";

var TodoSchema = mongoose.Schema({
      name: String,
      createdAt: Date,
      completedAt: Date
    }),
    Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  find(completed) {
    let query = {};

    if (completed) {
      query.completedAt = completed;
    } else if (completed !== null) {
      query.completedAt = null;
    }

    return Todo.find(query).exec();
  },

  upsert(record) {
    let search = {};

    if (record.id) {
      search.id = record.id;
    }

    return Todo.findOneAndUpdate(search, record, {upsert: true});
  }
};
