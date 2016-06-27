import ajax from "../../common/utils/ajax";

const todosRoot = "/todos";

function translate(promise) {
  return promise.then((xhr, response) => {
    return response;
  });
}

export default {
  browse() {
    return translate(ajax.api.get(todosRoot));
  },

  read(id) {
    return translate(ajax.api.get(`${todosRoot}/${id}`));
  },

  add(data) {
    return translate(ajax.api.post(todosRoot, data));
  },

  edit(id, data) {
    return translate(ajax.api.patch(`${todosRoot}/${id}`, data));
  },

  delete(id) {
    return translate(ajax.api.delete(`${todosRoot}/${id}`));
  }
};
