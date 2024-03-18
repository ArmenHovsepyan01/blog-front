import { call, fork, put, takeEvery } from "redux-saga/effects";

import {
  addBlog,
  deleteBlog,
  getUserBlogsRequest,
  setUserBlogs,
  setUserBlogsError,
  updateBlog,
  UserBlogsAction,
} from "../actions/userBlogs.action";

import { IBlog } from "../../../utilis/types/definitions";

import { getUserBlogs } from "../../../utilis/getUserBlogs";
import { deleteBlogById } from "../../../utilis/user-blogs-helpers/deleteBlog";
import { updateBlogById } from "../../../utilis/user-blogs-helpers/updateBlog";
import { createBlog } from "../../../utilis/user-blogs-helpers/addBlog";

function* getBlogs(): Generator<any, void, any> {
  try {
    yield put(getUserBlogsRequest());
    const data: IBlog[] = yield call(getUserBlogs);

    yield put(setUserBlogs(data));
  } catch (e) {
    console.error(e);
    yield put(setUserBlogsError(e));
  }
}

function* addBlogToUser(action: any): Generator<any, void, any> {
  try {
    yield put(getUserBlogsRequest());
    const data = yield call(createBlog, action.payload.values);
    yield put(addBlog(data));
  } catch (e) {
    console.error(e);
    yield put(setUserBlogsError(e));
  }
}

function* deleteUserBlog(action: any) {
  try {
    yield put(getUserBlogsRequest());
    yield call(deleteBlogById, action.payload.id);
    yield put(deleteBlog(action.payload.id));
  } catch (e) {
    console.error(e);
    yield put(setUserBlogsError(e));
  }
}

function* updateUserBlog(action: any): Generator<any, void, any> {
  try {
    yield put(getUserBlogsRequest());
    const data = yield call(
      updateBlogById,
      action.payload.values,
      action.payload.id,
    );
    yield put(updateBlog(data));
  } catch (e) {
    console.error(e);
    yield put(setUserBlogsError(e));
  }
}

function* userBlogsWatcher() {
  yield takeEvery(UserBlogsAction.GET_USER_BLOGS, getBlogs);
  yield takeEvery(UserBlogsAction.DELETE_USER_BLOG, deleteUserBlog);
  yield takeEvery(UserBlogsAction.UPDATE_USER_BLOG, updateUserBlog);
  yield takeEvery(UserBlogsAction.ADD_USER_BLOG, addBlogToUser);
}

export default function* userBlogsSaga() {
  yield fork(userBlogsWatcher);
}
