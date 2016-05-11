import Promise from "bluebird";
import qwest from "qwest";
import alt from "../flux";

function parseOptions(method, path, data, options = {}) {
  if (!options.dataType) {
    options.dataType = "json";
  }

  // let token = alt.getStore("SessionStore").getState().get("token");
  //
  // if (token) {
  //   if (!options.headers) {
  //     options.headers = {};
  //   }
  //
  //   options.headers["Authorization"] =  token;
  // }

  return options;
}

function callAjax(method, path, data, options = {}) {
  let endpoint = path,
      request;

  if (options.url) {
    endpoint = options.url;
  }

  delete options.url;
  delete options.data;

  if (process.env.API_ACTIVE) {
    qwest.base = process.env.API_URL;
    request = qwest.map(method, endpoint, data, parseOptions(options));

    request.catch((xhr, response, error) => {
      let notify = (message) => {
        console.log("NOTIFY", message);
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

    request.then((xhr, response) => {
      let token = xhr.getResponseHeader("Authorization"),
          notify = (message) => {
            console.log("NOTIFY", message);
          };

      if (xhr.status === 302) {
          notify("It appears that this record already exists", "danger");
      }

      Session.setToken(token);

      return response;
    });
  } else {
    request = new Promise(function (resolve) {
        setTimeout(function () {
          console.log(`Fake ${method} submission to ${endpoint} with data:`, data);
          resolve(data);
        }, 250);
      });
  }

  return request;
}

class Ajax {
  get(path, data, options = {}) {
    return callAjax("GET", path, data, options);
  }

  post(path, data, options = {}) {
    return callAjax("POST", path, data, options);
  }

  patch(path, data, options = {}) {
    return callAjax("PATCH", path, data, options);
  }

  delete (path, data, options = {}) {
    return callAjax("DELETE", path, data, options);
  }

  form (path, data, options = {}) {
    options.dataType = "formdata";
    return callAjax("POST", path, data, options);
  }

  download(path) {
    let token = false;

    if (!token) {
      return;
    }

    let realToken = token.substr("bearer ".length);

    location.href = `${process.env.API_URL}/${path}?token=${realToken}`;
  }
}

export default new Ajax;
