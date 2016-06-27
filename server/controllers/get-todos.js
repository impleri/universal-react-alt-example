import respond from "./respond";
import Todo from "../models/todo";

export default async function getTodos(context, next) {
  await next();

  return respond(Todo.find(), context);
}
