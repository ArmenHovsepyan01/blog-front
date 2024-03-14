import { IBlog } from "../../../utilis/types/definitions";

export enum BlogActionsTypes {
  GET_BLOGS = "GET_BLOGS",
  SET_BLOGS = "SET_BLOGS",
  GET_BLOGS_REQUEST = "GET_BLOGS_REQUEST",
  SET_BLOGS_ERROR = "SET_BLOGS_ERROR",
}

export const getBlogs = () => ({
  type: BlogActionsTypes.GET_BLOGS,
});

export const setBlogs = (blogs: IBlog[]) => ({
  type: BlogActionsTypes.SET_BLOGS,
  payload: {
    blogs,
  },
});

export const getBlogsRequest = () => ({
  type: BlogActionsTypes.GET_BLOGS_REQUEST,
});

export const setBlogsError = () => ({
  type: BlogActionsTypes.SET_BLOGS_ERROR,
});
