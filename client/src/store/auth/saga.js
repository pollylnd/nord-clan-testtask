import { takeEvery, put, all } from "redux-saga/effects";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";
import { push } from "react-router-redux";
import _ from "lodash";

import backend from "helpers/api/feathers";
import actions from "./actions";

function* signUp(action) {
  try {
    if (
      !_.isNil(action.payload.password) &&
      action.payload.password.length < 6
    ) {
      const passwordLengthText = "Пароль не может быть менее 6 символов";
      error({
        title: "Введите корректные данные для регистрации",
        text: passwordLengthText,
      });

      throw new Error(passwordLengthText);
    }

    yield backend.service("user").create({
      ...action.payload,
    });
    yield put(actions.signUpSuccess());
    yield put(push("/sign-in"));
  } catch (e) {
    const requestErrors = _.map(e.errors, (error) => {
      return error.message;
    });

    if (!_.isEmpty(requestErrors)) {
      error({
        title: "Введите корректные данные для регистрации",
        text: requestErrors.join("\n\n"),
      });
    }

    yield put(actions.signUpFailure(e));
  }
}

function* signIn(action) {
  try {
    const response = yield backend.authenticate(action.payload);

    if (_.size(response)) {
      yield put(actions.signInSuccess(response.accessToken));
      yield put(actions.getUserSuccess(response.user));

      yield put(push("/dashboard"));
    }
  } catch (e) {
    error({
      title: "Неверный адрес почты или пароль",
    });

    yield put(actions.signInFailure(e));
  }
}

function* signOut() {
  try {
    localStorage.removeItem("feathers-jwt");

    yield put(actions.signOutSuccess());
    yield put(push("/sign-in"));
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
