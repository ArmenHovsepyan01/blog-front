import { call, fork, put, takeEvery } from "redux-saga/effects";
import {
  getUserRequest,
  setUser,
  setUserError,
  UserActionsTypes,
} from "../actions/user.actions";

import axios from "axios";

import Cookies from "js-cookie";

function* getUser() {
  try {
    const token = Cookies.get("token");
    console.log(token);
    // if (!token) yield put(setUserError());

    yield put(getUserRequest());

    const { data } = yield call(axios.get, "http://localhost:5000/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
