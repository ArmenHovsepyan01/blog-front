import { put, call, takeEvery, fork } from "redux-saga/effects";
import axios from "axios";

import {
  BlogActionsTypes,
  getBlogsRequest,
  setBlogs,
  setBlogsError,
} from "../actions/blog.actions";

function* getBlogs(action: any) {
  try {
    const page = action?.payload?.page;

    yield put(getBlogsRequest());

    const { data } = yield call(
      axios.get,
      `http://localhost:5000/blogs?page=${page}&limit=2`,
    );

    yield put(setBlogs(data.data, data.count));
  } catch (e) {
    yield put(setBlogsError());
  }
}

function* watchBlogs() {
  yield takeEvery(BlogActionsTypes.GET_BLOGS, getBlogs);
}

export default function* blogSaga() {
  yield fork(watchBlogs);
}
