import { call, fork, put, takeEvery } from "redux-saga/effects";
import {
  getUserRequest,
  setUser,
  setUserError,
  UserActionsTypes,
} from "../actions/user.actions";

import axios from "axios";

import Cookies from "js-cookie";
import { createConfigForRequest } from "../../../utilis/createConfigForRequest";

function* getUser() {
  try {
    yield put(getUserRequest());
    const config: Object = yield call(createConfigForRequest);

    const { data } = yield call(
      axios.get,
      "http://localhost:5000/auth",
      config,
    );

    yield put(setUser(data.data));
  } catch (e) {
    console.error(e);
    yield put(setUserError());
  }
}

function* userWatcher() {
  yield takeEvery(UserActionsTypes.GET_USER, getUser);
}

export default function* userSaga() {
  yield fork(userWatcher);
}
