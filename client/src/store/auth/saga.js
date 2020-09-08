import { takeEvery, put, all } from "redux-saga/effects";
import { push } from "react-router-redux";
import _ from 'lodash';

import backend from "helpers/api/feathers";
import actions from "./actions";

function* signUp(action) {
  try {
    yield backend.service('user').create(
      {
        ...action.payload
      }
    )

    yield put(actions.signUpSuccess())
    yield put(push('/sign-in'))
  } catch (e) {
    yield put(actions.signUpFailure(e))

  }
}

function* signIn(action) {
  try {
    const response = yield backend.authenticate(action.payload)

    if(_.size(response)) { 
      yield put(actions.signInSuccess(response.accessToken))
      yield put(actions.getUserSuccess(response.user))

      yield put(push('/dashboard'));
    }
  } catch (e) {
    yield put(actions.signInFailure(e));
  }
}

function* signOut() {
  try {
    localStorage.removeItem("feathers-jwt");

    yield put(actions.signOutSuccess());
    yield put(push('/sign-in'));
  } catch (e) {
    yield put(actions.signOutFailure(e));
  }
}


function* authSaga() {
  yield all([
    takeEvery(actions.SIGNUP, signUp),
    takeEvery(actions.SIGNIN, signIn),
    takeEvery(actions.SIGNOUT, signOut),
  ]);
}

export default {
  authSaga,
};
