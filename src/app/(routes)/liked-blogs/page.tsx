"use client";

import React, { useEffect } from "react";
import { useAppSelector } from "@/lib/store/hoooks/hooks";
import { Box, Divider, Pagination, Typography } from "@mui/material";
import BlogCard from "../../../_components/blog-card/BlogCard";
import { ILikedBlog } from "@/utilis/types/definitions";
import { RequestStatus } from "@/utilis/types/enums";
import { getLikeBlogs } from "@/lib/store/actions/likedBlogs.actions";
import { useDispatch } from "react-redux";
import loading from "@/app/loading";
import Loading from "@/app/loading";

const LikedBlogs = () => {
  const likedBlogs = useAppSelector((state) => state.likedBlogs.likedBlogs);
  const userStatus = useAppSelector((state) => state.user.status);
  const likedBlogsStatus = useAppSelector((state) => state.likedBlogs.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userStatus === RequestStatus.SUCCESS) {
      dispatch(getLikeBlogs());
    }
  }, [userStatus]);

  return (
    <main>
      <Typography fontSize={28} margin={0}>
        Liked Blogs
      </Typography>
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
