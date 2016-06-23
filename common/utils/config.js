
function get(key, defaultValue) {
  if (process.env[key] && process.env[key].length) {
    return process.env[key];
  }

  return defaultValue;
}

export default {
  get,
  isTrue(key) {
    let value = get(key, false);

    return (value === "1" || value === "true");
  }
};
