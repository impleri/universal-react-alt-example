import mongoose from "mongoose";
import Config from "../common/utils/config";

let dsn = Config.get("MONGO_URL", false);

if (!dsn) {
  dsn = "mongodb://" + Config.get("MONGO_HOST", "127.0.0.1") + "/" + Config.get("MONGO_NAME", "appdb");
}

mongoose.connect(dsn);
mongoose.Promise = global.Promise;

export default mongoose;
