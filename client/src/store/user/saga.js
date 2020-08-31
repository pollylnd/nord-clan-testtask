import { takeEvery, put, all, select } from "redux-saga/effects";

import backend from "helpers/api/feathers";
import actions from "./actions";

function* signUp({ payload }) {
  try {

    yield backend.service("user").create(payload);
    yield put(actions.signUpSuccess());

  } catch (e) {

    console.log(e);
    yield put(actions.signUpFailure(e));

  }
}

function* signIn({ payload }) {
  try {

    yield backend.service("user").find(payload);
    yield put(actions.signInSuccess());

  } catch (e) {

    console.log(e);
    yield put(actions.signInFailure(e));

  }
}


function* userSaga() {
  yield all([
    takeEvery(actions.SIGNUP, signUp),
    takeEvery(actions.SIGNIN, signIn)
  ]);
}

export default {
  userSaga,
};
