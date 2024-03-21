"use client";

import React, { FC, memo } from "react";

import { Box, Divider, Typography } from "@mui/material";

import UserDrawer from "../../../../../_components/user-drawer/UserDrawer";

import BlogCard from "../../../../../_components/blog-card/BlogCard";

import { IBlog } from "../../../../../utilis/types/definitions";

import Loading from "./loading";

import useSWR from "swr";

import { getPublisherInfo } from "../../../../../utilis/publisher-helpers/getPublisher";

interface IUser {
  params: {
    userId: string;
  };
}

const User: FC<IUser> = ({ params: { userId } }) => {
  const { data, error, isLoading } = useSWR("/api", () =>
    getPublisherInfo(+userId),
  );

  const user = data?.data;

  return (
    <Box
      sx={{
        margin: "auto",
        maxWidth: "1200px",
        minHeight: 500,
        position: "relative",
      }}
    >
      {!isLoading ? (
        <>
          <UserDrawer user={user} isLoading={isLoading} />
          <Box
            sx={{ marginRight: `380px` }}
            display={"flex"}
            gap={2}
            flexDirection={"column"}
          >
            <Typography variant={"h4"} sx={{ marginTop: 8 }}>
              {user?.firstName} {user?.lastName}
            </Typography>

            <Divider />
            <Box
              display={"flex"}
              gap={2}
              flexDirection={"column"}
              sx={{ padding: "18px 0", paddingRight: "18px" }}
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
          </Box>
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default memo(User);
