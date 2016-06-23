import ajax from "../../common/utils/ajax";
import Config from "../../common/utils/config";

const apiRoot = Config.get("APP_PREFIX", "/api"),
    todosRoot = `${apiRoot}/todos`;

export default {
  browse() {
    return ajax.get(todosRoot).then((xhr, response) => {
      return response;
    });
  },

  read(id) {
    return ajax.get(`${todosRoot}/${id}`).then((xhr, response) => {
      return response;
    });
  },

  add(data) {
    return ajax.post(todosRoot, data);
  },

  edit(id, data) {
    return ajax.patch(`${todosRoot}/${id}`, data);
  },

  delete(id) {
    return ajax.delete(`${todosRoot}/${id}`);
  }
};
