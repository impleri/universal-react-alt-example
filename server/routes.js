import Router from "koa-router";
import getTodos from "./controllers/get-todos";

const router = new Router({
      prefix: process.env.API_PREFIX || "/api"
    });

router.get("/todos", getTodos);

export default router;
