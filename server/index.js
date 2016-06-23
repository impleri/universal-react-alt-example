// ES5 until Babel is loaded
require("babel-register");
require("babel-polyfill");
require("dotenv-safe").load({
  allowEmptyValues: true,
  path: "./.env",
  sample: "./.env.example"
});
require("./bootstrap");
