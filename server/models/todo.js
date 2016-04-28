import mongoose from "../database";

var TodoSchema = mongoose.Schema({
      name: String,
      createdAt: Date,
      completedAt: Date
    }),
    Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  find: function (completed, callback) {
    let query = {};

    if (completed) {
      query.completedAt = completed;
    } else if (completed !== null) {
      query.completedAt = null;
    }

    Todo.find(query, callback);
  },

  upsert: function (record, callback) {
    let search = {};

    if (record.id) {
      search.id = record.id;
    }

    Todo.findOneAndUpdate(search, record, {upsert: true}, callback);
  }
};
