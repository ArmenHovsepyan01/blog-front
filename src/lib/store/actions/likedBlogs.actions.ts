import { ILikedBlog } from "../../../utilis/types/definitions";

export enum LikedBlogsActionTypes {
  LIKE_BLOG = "LIKE_BLOG",
  GET_LIKED_BLOGS = "GET_LIKED_BLOGS",
  REMOVE_LIKED_BLOG = "REMOVE_LIKED_BLOG",
  GET_LIKED_BLOGS_REQUEST = "GET_LIKED_BLOGS_REQUEST",
  SET_LIKED_BLOGS = "SET_LIKED_BLOGS",
  ADD_LIKED_BLOGS = "ADD_LIKED_BLOGS",
  LIKED_BLOGS_ERROR = "GET_LIKED_BLOGS_ERROR",
}

export const getLikeBlogs = () => ({
  type: LikedBlogsActionTypes.GET_LIKED_BLOGS,
});

export const likeBlog = (id: number) => ({
  type: LikedBlogsActionTypes.LIKE_BLOG,
  id,
});

export const removeLikedBlog = (id: number) => ({
  type: LikedBlogsActionTypes.REMOVE_LIKED_BLOG,
  id,
});

export const getLikedBlogsRequest = () => ({
  type: LikedBlogsActionTypes.GET_LIKED_BLOGS_REQUEST,
});

export const setLikedBlogs = (data: ILikedBlog[]) => ({
  type: LikedBlogsActionTypes.SET_LIKED_BLOGS,
  payload: {
    data,
  },
});

export const addToLikedBlogs = (data: ILikedBlog) => ({
  type: LikedBlogsActionTypes.ADD_LIKED_BLOGS,
  payload: {
    data,
  },
});

export const setLikedBlogsError = (error: any) => ({
  type: LikedBlogsActionTypes.LIKED_BLOGS_ERROR,
  payload: {
    error,
  },
});
