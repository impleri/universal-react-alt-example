import Todo from "../models/todo";

export default async function deleteTodo(context, id, next) {
  await next();

  return Todo.delete(id)
    .then(() => {
      context.status = 204;
    })
    .catch((error) => {
      console.error(error);
      context.throw(error.message);
    });
}
