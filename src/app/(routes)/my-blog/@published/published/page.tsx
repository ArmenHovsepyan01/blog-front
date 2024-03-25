"use client";

import React from "react";
import { RequestStatus } from "../../../../../utilis/types/enums";
import { IBlog } from "../../../../../utilis/types/definitions";
import BlogCard from "../../../../../_components/blog-card/BlogCard";
import { Box } from "@mui/material";
import { useAppSelector } from "../../../../../lib/store/hoooks/hooks";
import Loading from "../../../../loading";
import { getPublishedBlogs } from "../../../../../lib/store/reducers/userBlogs.reducer";
import Title from "../../../../../_components/title/Title";

const Page = () => {
  const blogs = useAppSelector(getPublishedBlogs);
  const status = useAppSelector((state) => state.userBlogs.status);

  return (
    <>
      <Title title={"Published Blogs"} />

      <Box
        display={"flex"}
        gap={2}
        flexDirection={"column"}
        sx={{ width: "1000px" }}
      >
        {status === RequestStatus.SUCCESS ? (
          blogs.length > 0 ? (
            blogs.map((blog: IBlog) => <BlogCard blog={blog} key={blog.id} />)
          ) : (
            <span>There is no published blogs yet</span>
          )
        ) : (
          <Loading />
        )}
      </Box>
    </>
  );
};

export default Page;
