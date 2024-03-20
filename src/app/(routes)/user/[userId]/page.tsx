"use client";

import React, { FC, memo, useEffect } from "react";

import { Box, Divider, Typography } from "@mui/material";

import { useAppSelector } from "../../../../lib/store/hoooks/hooks";

import { useDispatch } from "react-redux";

import { getPublisher } from "../../../../lib/store/actions/publisher.actions";

import { RequestStatus } from "../../../../utilis/types/enums";

import UserDrawer from "../../../../_components/user-drawer/UserDrawer";

import BlogCard from "../../../../_components/blog-card/BlogCard";

import { IBlog } from "../../../../utilis/types/definitions";

interface IUser {
  params: {
    userId: string;
  };
}

const User: FC<IUser> = ({ params: { userId } }) => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.publisher.publisher);
  const status = useAppSelector((state) => state.publisher.status);

  useEffect(() => {
    dispatch(getPublisher(+userId));
  }, []);

  return (
    <Box
      sx={{
        margin: "auto",
        maxWidth: "1200px",
        minHeight: 500,
        position: "relative",
      }}
    >
      {status === RequestStatus.SUCCESS ? (
        <>
          <UserDrawer />
          <Box
            sx={{ marginRight: `320px` }}
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
              sx={{ padding: "18px 0" }}
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
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ margin: "120px 0" }}
        >
          User not found.
        </Box>
      )}
    </Box>
  );
};

export default memo(User);
