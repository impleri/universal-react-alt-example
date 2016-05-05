import { Map } from "immutable";

class SourceContainer {
  items = Map({});

  set(name, value) {
    if (this.items.has(name)) {
      throw new Error(`Source ${name} is already defined.`);
    }

    this.items = this.items.set(name, value);

    return true;
  }

  get(name) {
    if (!this.items.has(name)) {
      throw new Error(`Source ${name} is not defined.`);
    }

    return this.items.get(name);
  }
}

const container = new SourceContainer();

export default container;
