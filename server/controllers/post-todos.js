import respond from "./respond";
import Todo from "../models/todo";

export default async function postTodos(context, next) {
  await next();

  return respond(Todo.put(context.request.body), context);
}
