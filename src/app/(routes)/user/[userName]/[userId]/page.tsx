"use client";

import React, { FC, memo, useEffect } from "react";

import { Box, Divider, Typography } from "@mui/material";

import UserDrawer from "../../../../../_components/user-drawer/UserDrawer";

import BlogCard from "../../../../../_components/blog-card/BlogCard";

import { IBlog } from "../../../../../utilis/types/definitions";

import Loading from "./loading";

import useSWR from "swr";

import { getPublisherInfo } from "../../../../../utilis/publisher-helpers/getPublisher";
import { useAuthor } from "../../../../../hooks/useAuthor";
import { useDispatch } from "react-redux";
import { useUserFollowings } from "../../../../../hooks/useUserFollowings";
import { useSession } from "next-auth/react";
import { getUser } from "../../../../../lib/store/actions/user.actions";

interface IUser {
  params: {
    userId: string;
  };
}

const User: FC<IUser> = ({ params: { userId } }) => {
  const { user, isLoading } = useAuthor(userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (process.browser) {
      dispatch(getUser());
    }
  }, [dispatch]);

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
                blog.user = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                };

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
