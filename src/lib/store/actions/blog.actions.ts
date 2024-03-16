import { IBlog } from "../../../utilis/types/definitions";

export enum BlogActionsTypes {
  GET_BLOGS = "GET_BLOGS",
  SET_BLOGS = "SET_BLOGS",
  GET_BLOGS_REQUEST = "GET_BLOGS_REQUEST",
  SET_BLOGS_ERROR = "SET_BLOGS_ERROR",
}

export const getBlogs = (page: number) => ({
  type: BlogActionsTypes.GET_BLOGS,
  page,
});

export const setBlogs = (blogs: IBlog[], count: number) => ({
  type: BlogActionsTypes.SET_BLOGS,
  payload: {
    blogs,
    count,
  },
});

export const getBlogsRequest = () => ({
  type: BlogActionsTypes.GET_BLOGS_REQUEST,
});

export const setBlogsError = () => ({
  type: BlogActionsTypes.SET_BLOGS_ERROR,
});
