import { createActions } from "alt-utils/lib/decorators";
import flux from "../flux";
import SourceContainer from "../sources";

const source = SourceContainer.get("Todo");

@createActions(flux)
export default class TodoActions {
  constructor() {
    this.generateActions("startAction", "stopAction", "upsert", "upsertMany");
  }

  remove(id) {
    return (dispatch) => {
      dispatch();
      this.startAction();

      source.delete(id)
        .then((response) => {
          this.stopAction.defer();
          return response;
        }).catch((error) => {
          this.catchError(error);
        });
    }
  }

  save(title, id) {
    return (dispatch) => {
      let callback;
      dispatch();
      this.startAction();

      if (!title || title.length === 0) {
        callback = source.delete(id);
      } else if (id) {
        callback = source.edit(id, {title});
      } else {
        callback = source.add({title});
      }


      callback.then((response) => {
          this.stopAction.defer();
          return response;
        }).catch((error) => {
          this.catchError(error);
        });
    }
  }

  toggle(id, completed = true) {
    return (dispatch) => {
      dispatch();
      this.startAction();

      source.edit(id, {completed})
        .then((response) => {
          this.stopAction.defer();
          return response;
        }).catch((error) => {
          this.catchError(error);
        });
    }

  }
}
