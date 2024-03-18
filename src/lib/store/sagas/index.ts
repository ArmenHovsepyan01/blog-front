import { all, fork } from "redux-saga/effects";

import blogSaga from "./blog.saga";
import userSaga from "./user.saga";
import likedBlogsSaga from "./likedBlogs.saga";
import userBlogsSaga from "./userBlogs.saga";

export default function* rootSaga() {
  yield all([
    fork(blogSaga),
    fork(userSaga),
    fork(likedBlogsSaga),
    fork(userBlogsSaga),
  ]);
}
