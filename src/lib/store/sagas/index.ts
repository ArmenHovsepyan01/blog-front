import { all, fork } from "redux-saga/effects";

import blogSaga from "./blog.saga";
import likedBlogsSaga from "./likedBlogs.saga";
import userBlogsSaga from "./userBlogs.saga";
import followedSaga from "@/lib/store/sagas/followed.saga";

export default function* rootSaga() {
  yield all([
    fork(blogSaga),
    fork(likedBlogsSaga),
    fork(userBlogsSaga),
    fork(followedSaga),
  ]);
}
