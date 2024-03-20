import { call, fork, put, takeEvery } from "redux-saga/effects";

import {
  getUserRequest,
  setUser,
  setUserError,
  UserActionsTypes,
} from "../actions/user.actions";

import axios from "axios";

import Cookies from "js-cookie";
import {
  getPublisherRequest,
  PublisherActionsTypes,
  setPublisher,
  setPublisherError,
} from "../actions/publisher.actions";

function* getPublisher(action: any) {
  try {
    const id = action.payload.id;

    yield put(getPublisherRequest());

    const { data } = yield call(axios.get, `http://localhost:5000/user/${id}`);

    yield put(setPublisher(data.data));
  } catch (e) {
    console.error(e);
    yield put(setPublisherError());
  }
}

function* publisherWatcher() {
  yield takeEvery(PublisherActionsTypes.GET_PUBLISHER, getPublisher);
}

export default function* publisherSaga() {
  yield fork(publisherWatcher);
}
