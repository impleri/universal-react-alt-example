import mongoose from "mongoose";

function getEnv(key, defaultValue) {
  if (process.env[key]) {
    return process.env[key];
  }

  return defaultValue;
}

let dsn = getEnv("MONGO_URL", false);

if (!dsn) {
    dsn = "mongodb://" + getEnv("MONGO_HOST", "127.0.0.1") + "/" + getEnv("MONGO_NAME", "cowtipping");
}

mongoose.connect(dsn);

export default mongoose;
