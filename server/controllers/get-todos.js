import Todo from "../models/todo";

export default async function getTodos(context, next) {
  await next();

  Todo.find(null, (error, docs) => {
    if (error) {
      context.throw(error.message);
      return;
    }

    let todos = docs.map(function(todo) {
          return {
            id: todo._id,
            name: todo.name,
            done: (todo.completedAt)
          };
        });

    context.body = JSON.stringify(todos);
  });
}
