"use client";

import React, { FC } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";

import { useAppSelector } from "../../../lib/store/hoooks/hooks";
import Link from "next/link";
import { RequestStatus } from "../../../utilis/types/enums";
import { useDispatch } from "react-redux";
import {
  likeBlog,
  removeLikedBlog,
} from "../../../lib/store/actions/likedBlogs.actions";
import { ILikedBlog } from "../../../utilis/types/definitions";

interface IAddToFavorites {
  id: number;
}
const AddToFavorites: FC<IAddToFavorites> = ({ id }) => {
  const isUserLoggedIn = useAppSelector((state) => state.user.status);
  const likedBlogs = useAppSelector((state) => state.likedBlogs.likedBlogs);

  const link = isUserLoggedIn !== RequestStatus.SUCCESS ? "/login" : "";

  const dispatch = useDispatch();

  const blog = likedBlogs.find((item: ILikedBlog) => item.blog.id === id);
  const handleOnClick = () => {
    if (isUserLoggedIn === RequestStatus.SUCCESS) {
      if (!blog) {
        dispatch(likeBlog(id));
      } else {
        dispatch(removeLikedBlog(blog.id));
      }
    }
  };

  return (
    <Link href={link}>
      <IconButton aria-label="add to favorites" onClick={handleOnClick}>
        <FavoriteIcon
          sx={{
            color: Boolean(blog) ? "red" : "gray",
          }}
        />
      </IconButton>
    </Link>
  );
};

export default AddToFavorites;
