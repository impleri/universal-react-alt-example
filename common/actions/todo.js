import { createActions } from "alt-utils/lib/decorators";
import flux from "../flux";
import SourceContainer from "../sources";

const source = SourceContainer.get("Todo");

@createActions(flux)
export default class TodoActions {
  constructor() {
    this.generateActions("delete", "startAction", "stopAction", "upsert", "upsertMany");
  }

  fetch() {
    return (dispatch) => {
      dispatch();
      this.startAction();

      source.browse()
        .then((response) => {
          this.upsertMany(response.todos);
          this.stopAction.defer();
          return response;
        }).catch((error) => {
          this.catchError(error);
        });
    }
  }

  remove(id) {
    return (dispatch) => {
      dispatch();
      this.startAction();

      source.delete(id)
        .then((response) => {
          console.log("Deleted");
          this.delete(id);
          this.stopAction.defer();
          return response;
        }).catch((error) => {
          this.catchError(error);
        });
    }
  }

  save(title, id) {
    return (dispatch) => {
      if (!title || title.length === 0) {
        this.delete(id);
      }

      let callback;
      dispatch();
      this.startAction();

      if (id) {
        callback = source.edit(id, {title});
      } else {
        callback = source.add({title});
      }


      callback.then((response) => {
          this.upsertMany(response.todos);
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

      source.edit(id, {completedAt: (completed) ? new Date() : null})
        .then((response) => {
          this.upsertMany(response.todos);
          this.stopAction.defer();
          return response;
        }).catch((error) => {
          this.catchError(error);
        });
    }
  }
}
