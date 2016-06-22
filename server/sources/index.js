import SourceContainer from "../../common/sources";
import TodoSource from "./todo";

console.info("Setting server sources");
SourceContainer.set("Todo", TodoSource);

export default {};
