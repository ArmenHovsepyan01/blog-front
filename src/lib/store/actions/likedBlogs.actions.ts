import { ILikedBlog } from "../../../utilis/types/definitions";
import { createActions } from "redux-actions";

export enum LikedBlogsActionTypes {
  LIKE_BLOG = "LIKE_BLOG",
  GET_LIKED_BLOGS = "GET_LIKED_BLOGS",
  REMOVE_LIKED_BLOG = "REMOVE_LIKED_BLOG",
  GET_LIKED_BLOGS_REQUEST = "GET_LIKED_BLOGS_REQUEST",
  SET_LIKED_BLOGS = "SET_LIKED_BLOGS",
  ADD_LIKED_BLOGS = "ADD_LIKED_BLOGS",
  LIKED_BLOGS_ERROR = "GET_LIKED_BLOGS_ERROR",
}

export const {
  likeBlog,
  getLikedBlogs,
  removeLikedBlog,
  getLikedBlogsRequest,
  setLikedBlogs,
  addLikedBlogs,
  setLikedBlogsError,
} = createActions({
  LIKE_BLOG: (id: number) => ({ id }),
  GET_LIKED_BLOGS: () => ({}),
  REMOVE_LIKED_BLOG: (id: number) => ({ id }),
  GET_LIKED_BLOGS_REQUEST: () => ({}),
  SET_LIKED_BLOGS: (data: ILikedBlog[]) => ({ data }),
  ADD_LIKED_BLOGS: (data: ILikedBlog) => ({ data }),
  LIKED_BLOGS_ERROR: (error) => ({ error }),
});
