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
import { useSession } from "next-auth/react";

interface IAddToFavorites {
  id: number;
}
const AddToFavorites: FC<IAddToFavorites> = ({ id }) => {
  const { data: session, status } = useSession();
  const likedBlogs = useAppSelector((state) => state.likedBlogs.likedBlogs);

  const link = status !== "authenticated" ? "/login" : "";

  const dispatch = useDispatch();

  const blog = likedBlogs.find((item: ILikedBlog) => item.blog.id === id);
  const handleOnClick = () => {
    if (status === "authenticated") {
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
