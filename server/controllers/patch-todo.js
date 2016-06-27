import respond from "./respond";
import Todo from "../models/todo";

export default async function patchTodo(context, id, next) {
  await next();

  return respond(Todo.upsert(id, context.request.body), context);
}
