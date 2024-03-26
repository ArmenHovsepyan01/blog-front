"use client";

import React, { useEffect } from "react";

import { useAppSelector } from "@/lib/store/hoooks/hooks";

import { useDispatch } from "react-redux";

import { Box, Divider, Typography } from "@mui/material";

import BlogCard from "../../../_components/blog-card/BlogCard";

import { ILikedBlog } from "@/utilis/types/definitions";
import { RequestStatus } from "@/utilis/types/enums";
import { getLikedBlogs } from "@/lib/store/actions/likedBlogs.actions";

import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import GoBack from "../../../_components/go-back/GoBack";

const LikedBlogs = () => {
  const { likedBlogs, status: likedBlogsStatus } = useAppSelector(
    (state) => state.likedBlogs,
  );

  const dispatch = useDispatch();

  const { status } = useSession();

  useEffect(() => {
    if (
      status === "authenticated" &&
      likedBlogsStatus !== RequestStatus.SUCCESS
    ) {
      // @ts-ignore
      dispatch(getLikedBlogs());
    }
  }, [status]);

  return (
    <main>
      <Box display={"flex"} alignItems={"center"} gap={3}>
        <GoBack />
        <Typography fontSize={28} margin={0}>
          Liked Blogs
        </Typography>
      </Box>
      <Divider variant={"fullWidth"} sx={{ margin: "18px 0" }} />
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={2}
      >
        {likedBlogsStatus === RequestStatus.SUCCESS ? (
          <>
            {likedBlogs.length > 0 ? (
              likedBlogs.map((item: ILikedBlog) => {
                return <BlogCard blog={item.blog} key={item.id} />;
              })
            ) : (
              <span>You don't like any blog yet.</span>
            )}
          </>
        ) : (
          <Loading />
        )}
      </Box>
    </main>
  );
};

export default LikedBlogs;
