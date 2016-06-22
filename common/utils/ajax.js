import qwest from "qwest";
import alt from "../flux";

qwest.setDefaultDataType("json");

function callAjax(method, endpoint, data, options = {}) {
  if (options.url) {
    endpoint = options.url;
  }

  delete options.url;
  delete options.data;

  if (!process.env.AJAX_ACTIVE) {
    return mockRequest(method, endpoint, data);
  }

  let request = qwest.map(method, endpoint, data, options);

  request.catch((xhr, response, error) => {
    let notify = (message) => {
      console.log("NOTICE", message);
    };

    switch (xhr.status) {
      case 401:
        notify("You are not currently logged in.", "warning");
        break;

      case 403:
        notify("You must log in and have privileges.", "danger");
        break;

      case 422:
        notify("There was an error processing the form.", "danger");
        break;

      default:
         if (xhr.status > 499) {
          notify("An unknown error occurred.", "danger");
        }

        if (process.env.APP_DEBUG) {
          console.log("Unknown error", response, error);
          console.trace();
        }
    }

    return response;
  });

  return request;
}

function formatUrl(path, base) {
  if (!base) {
    return path;
  }

  if (base.match(/\/$/)) {
    base = base.substr(0, base.length - 1);
  }

  if (!path.match(/^\//)) {
    path = path.substr(1);
  }

  return `${base}/${path}`;
}

function mockRequest(method, endpoint, data) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(`Fake ${method} submission to ${endpoint} with data:`, data);
      resolve(data);
    }, 250);
  });
}

class Ajax {
  constructor(base) {
    this.base = base;
  }

  get(path, data, options = {}) {
    return callAjax("GET", formatUrl(path, this.base), data, options);
  }

  post(path, data, options = {}) {
    return callAjax("POST", formatUrl(path, this.base), data, options);
  }

  patch(path, data, options = {}) {
    return callAjax("PATCH", formatUrl(path, this.base), data, options);
  }

  delete (path, data, options = {}) {
    return callAjax("DELETE", formatUrl(path, this.base), data, options);
  }

  form (path, data, options = {}) {
    options.dataType = "formdata";
    return callAjax("POST", formatUrl(path, this.base), data, options);
  }

  download(path, token) {
    if (token.match(/^bearer/i)) {
      token = token.substr("bearer ".length);
    }

    path = formatUrl(path, this.base);

    if (token) {
      path += `?token=${token}`;
    }

    window.location.href = path;
  }
}

const ajaxClass = new Ajax();

ajaxClass.api = new Ajax(process.env.API_URL);

export default ajaxClass;
