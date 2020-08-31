import { takeEvery, put, all, select } from "redux-saga/effects";
import backend from "helpers/api/feathers";
import _ from "lodash";

import actions from "./actions";


function* get() {
  try {
    const recipeList = yield backend.service("recipe").find({
      query: {},
    });
    yield put(actions.getSuccess(recipeList));
  } catch (e) {
    console.log(e);
    yield put(actions.getFailure(e));
  }
}

function* getId(action) {
  try {
    const id = action.payload
    const recipe = yield backend.service("recipe").get(id)
    if(_.size(recipe)) {
      yield put(actions.getIdSuccess(recipe))
    }
  } catch (e) {
    yield put(actions.getIdFailure(e))
  }

}

function* recipeSaga() {
  yield all([
    takeEvery(actions.GET, get),
    takeEvery(actions.GET_ID, getId)
  ]);
}

export default {
  recipeSaga,
};
