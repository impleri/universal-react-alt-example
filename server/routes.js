import router from "koa-route";
import getTodos from "./controllers/get-todos";
import postTodos from "./controllers/post-todos";
import deleteTodo from "./controllers/delete-todo";
import patchTodo from "./controllers/patch-todo";
import Config from "../common/utils/config";

const rawPrefix = Config.get("APP_PREFIX", "/api"),
    prefix = rawPrefix.match(/\/$/) ? rawPrefix.slice(0, -1) : rawPrefix;

function generateRoute(path, callback, app, method = "get") {
  if (path.match(/^\//)) {
    path = path.rawPrefix.slice(1);
  }

  app.use(router[method](`${prefix}/${path}`, callback));
}

export default {
  bootstrap(app) {
    generateRoute("todos/:id", deleteTodo, app, "delete");
    generateRoute("todos/:id", patchTodo, app, "patch");
    generateRoute("todos", postTodos, app, "post");
    generateRoute("todos", getTodos, app);
  }
};
