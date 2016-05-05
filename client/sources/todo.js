import ajax from "../../common/util/ajax";

export default TodoSource = {
  browse() {
    return ajax.api.get("todos").then((xhr, response) => {
      return response;
    });
  },

  read(id) {
    return ajax.api.get(`todos/${id}`).then((xhr, response) => {
      return response;
    });
  },

  add(data) {
    return ajax.api.post("todos", data);
  },

  edit(id, data) {
    return ajax.api.patch(`todos/${id}`, data);
  },

  delete(id) {
    return ajax.api.delete(`todos/${id}`);
  }
};
