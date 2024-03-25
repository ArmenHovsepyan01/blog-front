"use client";

import React from "react";
import { RequestStatus } from "../../../../../utilis/types/enums";
import { IBlog } from "../../../../../utilis/types/definitions";
import BlogCard from "../../../../../_components/blog-card/BlogCard";
import { Box } from "@mui/material";
import { useAppSelector } from "../../../../../lib/store/hoooks/hooks";
import Loading from "../../../../loading";
import { getUnpublishedBlogs } from "../../../../../lib/store/reducers/userBlogs.reducer";
import Title from "../../../../../_components/title/Title";

const Page = () => {
  const blogs = useAppSelector(getUnpublishedBlogs);
  const status = useAppSelector((state) => state.userBlogs.status);

  return (
    <>
      <Title title={"Unpublished Blogs"} />
      <Box
        display={"flex"}
        gap={2}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ width: "1000px" }}
      >
        {status === RequestStatus.SUCCESS ? (
          blogs.length > 0 ? (
            blogs.map((blog: IBlog) => {
              return <BlogCard blog={blog} key={blog.id} />;
            })
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
