"use client";

import React, { FC, memo, useEffect } from "react";

import { Box } from "@mui/material";

import BlogCard from "../../../../../_components/blog-card/BlogCard";

import { IBlog } from "@/utilis/types/definitions";

import Loading from "./loading";

import { useAuthor } from "@/hooks/useAuthor";
import { useDispatch } from "react-redux";
import { undef } from "@redux-saga/is";
import { getFollowed } from "@/lib/store/actions/followed.actions";
import { useSession } from "next-auth/react";

interface IUser {
  params: {
    userId: string;
  };
}

const User: FC<IUser> = ({ params: { userId } }) => {
  const { user, isLoading } = useAuthor(userId);

  return (
    <>
      {!isLoading ? (
        <>
          <Box
            display={"flex"}
            gap={2}
            flexDirection={"column"}
            sx={{ padding: "18px 0", paddingRight: "18px" }}
            width={"100%"}
          >
            {user?.blogs?.length > 0 ? (
              user?.blogs?.map((blog: IBlog) => {
                return <BlogCard blog={blog} key={blog.id} />;
              })
            ) : (
              <span>There are no published blogs by {user.firstName}.</span>
            )}
          </Box>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default memo(User);
