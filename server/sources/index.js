import TodoSource from "./todo";

export default function bootstrapSources(container) {
  container.set("Todo", TodoSource);
};
