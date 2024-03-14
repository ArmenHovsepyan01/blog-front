import { all, fork } from "redux-saga/effects";
import blogSaga from "./blog.saga";
import userSaga from "./user.saga";

export default function* rootSaga() {
  yield all([fork(blogSaga), fork(userSaga)]);
}
