import { IBlog } from "../../../utilis/types/definitions";
import { createActions } from "redux-actions";

export enum BlogActionsTypes {
  GET_BLOGS = "GET_BLOGS",
  SET_BLOGS = "SET_BLOGS",
  GET_BLOGS_REQUEST = "GET_BLOGS_REQUEST",
  SET_BLOGS_ERROR = "SET_BLOGS_ERROR",
  ADD_BLOG = "ADD_BLOG",
}

export const { getBlogs, setBlogs, getBlogsRequest, setBlogsError, addBlog } =
  createActions({
    GET_BLOGS: (page: number) => ({ page }),
    SET_BLOGS: (blogs: IBlog[], count: number) => ({ blogs, count }),
    GET_BLOGS_REQUEST: () => ({}),
    SET_BLOGS_ERROR: () => ({}),
    ADD_BLOG: (blog: IBlog) => ({ blog }),
  });
