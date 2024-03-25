import { IBlog } from "@/utilis/types/definitions";
import { createActions } from "redux-actions";

export enum UserBlogsAction {
  GET_USER_BLOGS = "GET_USER_BLOGS",
  GET_USER_BLOGS_REQUEST = "GET_USER_BLOGS_REQUEST",
  SET_USER_BLOGS = "SET_USER_BLOGS",
  SET_USER_BLOGS_ERROR = "SET_USER_BLOGS_ERROR",
  ADD_BLOG = "ADD_BLOG",
  ADD_USER_BLOG = "ADD_USER_BLOG",
  UPDATE_BLOG = "UPDATE_BLOG",
  UPDATE_USER_BLOG = "UPDATE_USER_BLOG",
  DELETE_BLOG = "DELETE_BLOG",
  DELETE_USER_BLOG = "DELETE_USER_BLOG",
}

// export const getUserBlogs = (token?: string) => ({
//   type: UserBlogsAction.GET_USER_BLOGS,
//   payload: {
//     token,
//   },
// });
//
// export const getUserBlogsRequest = () => ({
//   type: UserBlogsAction.GET_USER_BLOGS_REQUEST,
// });
//
// export const setUserBlogs = (blogs: IBlog[]) => ({
//   type: UserBlogsAction.SET_USER_BLOGS,
//   payload: {
//     blogs,
//   },
// });
//
// export const setUserBlogsError = (error: any) => ({
//   type: UserBlogsAction.SET_USER_BLOGS_ERROR,
//   error,
// });
//
// export const addBlogToUserBlogs = (values: any) => ({
//   type: UserBlogsAction.ADD_USER_BLOG,
//   payload: {
//     values,
//   },
// });
//
// export const addBlog = (blog: IBlog) => ({
//   type: UserBlogsAction.ADD_BLOG,
//   payload: {
//     blog,
//   },
// });
//
// export const deleteUserBlog = (id: number) => ({
//   type: UserBlogsAction.DELETE_USER_BLOG,
//   payload: {
//     id,
//   },
// });
//
// export const deleteBlog = (id: number) => ({
//   type: UserBlogsAction.DELETE_BLOG,
//   payload: {
//     id,
//   },
// });
//
// export const updateUserBlog = (id: number, values: any) => ({
//   type: UserBlogsAction.UPDATE_USER_BLOG,
//   payload: {
//     id,
//     values,
//   },
// });
//
// export const updateBlog = (blog: IBlog) => ({
//   type: UserBlogsAction.UPDATE_BLOG,
//   payload: {
//     blog,
//   },
// });

export const {
  getUserBlogs,
  getUserBlogsRequest,
  setUserBlogs,
  setUserBlogsError,
  addUserBlog,
  addBlog,
  deleteUserBlog,
  deleteBlog,
  updateUserBlog,
  updateBlog,
} = createActions({
  GET_USER_BLOGS: (token?: string) => ({ token }),
  GET_USER_BLOGS_REQUEST: () => ({}),
  SET_USER_BLOGS: (blogs: IBlog[]) => ({ blogs }),
  SET_USER_BLOGS_ERROR: (error: any) => ({ error }),
  ADD_USER_BLOG: (values: any) => ({ values }),
  ADD_BLOG: (blog: IBlog) => ({ blog }),
  DELETE_USER_BLOG: (id: number) => ({ id }),
  DELETE_BLOG: (id: number) => ({ id }),
  UPDATE_USER_BLOG: (id: number, values: any) => ({ id, values }),
  UPDATE_BLOG: (blog: IBlog) => ({ blog }),
});
