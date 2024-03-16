import { fork, put, takeEvery, call } from "redux-saga/effects";

import {
  addToLikedBlogs,
  getLikedBlogsRequest,
  LikedBlogsActionTypes,
  setLikedBlogs,
  setLikedBlogsError,
} from "../actions/likedBlogs.actions";

import store from "../store";

import { likeBlogs } from "../../../api/liked-blogs/likeBlogs";
import { removeLikedBlog } from "../../../api/liked-blogs/removeLikedBlog";
import { getAllLikedBlogs } from "../../../api/liked-blogs/getAllLikedBlogs";
import { ILikedBlog } from "../../../utilis/types/definitions";

function* getLikedBlogs(): Generator<any, void, any> {
  try {
    yield put(getLikedBlogsRequest());
    const data = yield call(getAllLikedBlogs);
    console.log(data.data);
    yield put(setLikedBlogs(data.data));
  } catch (e) {
    console.error(e);
    yield put(setLikedBlogsError(e));
  }
}

function* likeBlog(action: any): Generator<any, void, any> {
  try {
    yield put(getLikedBlogsRequest());
    const data = yield call(likeBlogs, action.id);
    yield put(addToLikedBlogs(data.data));
  } catch (e) {
    console.error(e);
    yield put(setLikedBlogsError(e));
  }
}

function* removeFromLikedBlogs(action: any): Generator<any, void, any> {
  try {
    yield put(getLikedBlogsRequest());
    const data = yield call(removeLikedBlog, action.id);
    console.log(data);

    const filteredData = store
      .getState()
      .likedBlogs.likedBlogs.filter(
        (item: ILikedBlog) => item.id !== action.id,
      );

    yield put(setLikedBlogs(filteredData));
  } catch (e) {
    console.error(e);
    yield put(setLikedBlogsError(e));
  }
}

function* likedBlogsWatcher() {
  yield takeEvery(LikedBlogsActionTypes.LIKE_BLOG, likeBlog);
  yield takeEvery(
    LikedBlogsActionTypes.REMOVE_LIKED_BLOG,
    removeFromLikedBlogs,
  );
  yield takeEvery(LikedBlogsActionTypes.GET_LIKED_BLOGS, getLikedBlogs);
}

export default function* likedBlogsSaga() {
  yield fork(likedBlogsWatcher);
}
