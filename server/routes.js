import Router from "koa-router";
import getTodos from "./controllers/get-todos";
import Config from "../common/utils/config";

const router = new Router({
      prefix: Config.get("APP_PREFIX", "/api")
    });

router.get("/todos", getTodos);

export default router;
