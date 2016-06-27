import Todo from "../models/todo";

export default function respond(promise, context) {
  return promise.then((docs) => {
      context.status = 200;
      context.body = {
        todos: Todo.export(docs)
      };
    })
    .catch((error) => {
      console.error(error);
      context.throw(error.message);
    });
}
