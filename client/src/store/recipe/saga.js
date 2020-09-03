import { takeEvery, put, all } from "redux-saga/effects";
import { push } from "react-router-redux";
import backend from "helpers/api/feathers";
import _ from "lodash";

import actions from "./actions";

function* get(action) {
  try {
    console.log(action)
    const recipeList = yield backend.service("recipe").find({
      query: {
        ...action.payload,
      },
    });
    yield put(actions.getSuccess(recipeList));
  } catch (e) {
    console.log(e);
    yield put(actions.getFailure(e));
  }
}

function* getId(action) {
  try {
    const id = action.payload;
    const recipe = yield backend.service("recipe").get(id);
    if (_.size(recipe)) {
      yield put(actions.getIdSuccess(recipe));
    }
    console.log();
  } catch (e) {
    yield put(actions.getIdFailure(e));
  }
}

function* create(action) {
  try {
    const recipeData = action.payload;
    const recipe = yield backend.service("recipe").create(recipeData);
    if (_.size(recipe)) {
      yield put(actions.createSuccess(recipeData));
      yield put(push('/dashboard'));
    }
  } catch (e) {
    console.log(e);
    yield put(actions.createFailure(e));
  }
}

function* update(action) {
  console.log(action.payload);
  try {
    const recipeData = action.payload;
    console.log(action.payload);
    const recipe = yield backend
      .service("recipe")
      .patch(recipeData.id, recipeData);
    if (_.size(recipe)) {
      yield put(actions.updateSuccess(recipeData));
    }
  } catch (e) {
    console.log(e);
    yield put(actions.updateFailure(e));
  }
}

function* recipeSaga() {
  yield all([
    takeEvery(actions.GET, get),
    takeEvery(actions.GET_ID, getId),
    takeEvery(actions.CREATE, create),
    takeEvery(actions.UPDATE, update),
    takeEvery(actions.SET_FILTERS, get),
  ]);
}

export default {
  recipeSaga,
};
