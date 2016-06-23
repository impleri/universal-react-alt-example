import qwest from "qwest";
import Config from "./config";

qwest.setDefaultDataType("json");

function callAjax(method, endpoint, data, options = {}) {
  if (options.url) {
    endpoint = options.url;
  }

  delete options.url;
  delete options.data;

  if (Config.isTrue("APP_MOCK")) {
    return mockRequest(method, endpoint, data);
  }

  let request = qwest.map(method, endpoint, data, options);

  if (Config.isTrue("APP_DEBUG")) {
    request.catch((xhr, response, error) => {
      switch (xhr.status) {
        case 401:
          console.warn("You are not currently logged in.");
          break;

        case 403:
          console.warn("You must log in and have privileges.");
          break;

        case 422:
          console.error("There was an error processing the form.");
          break;

        default:
          console.error("Unknown error", response, error);
          console.trace();
      }

      return response;
    });
  }

  return request;
}

function mockRequest(method, endpoint, data) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(`Fake ${method} submission to ${endpoint} with data:`, data);
      resolve(data);
    }, 250);
  });
}

export default {
  get(path, data, options = {}) {
    return callAjax("GET", path, data, options);
  },

  post(path, data, options = {}) {
    return callAjax("POST", path, data, options);
  },

  patch(path, data, options = {}) {
    return callAjax("PATCH", path, data, options);
  },

  delete (path, data, options = {}) {
    return callAjax("DELETE", path, data, options);
  },

  form (path, data, options = {}) {
    options.dataType = "formdata";
    return callAjax("POST", path, data, options);
  },

  download(path, token) {
    if (token.match(/^bearer/i)) {
      token = token.substr("bearer ".length);
    }

    if (token) {
      path += `?token=${token}`;
    }

    window.location.href = path;
  }
}
