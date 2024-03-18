"use client";

import React, { useEffect, useMemo, useState } from "react";

import { Box, Divider, Typography } from "@mui/material";

import Sidebar from "@/_components/sidebar/Sidebar";
import CreateBlog from "@/_components/create-blog/CreateBlog";
import { useDispatch } from "react-redux";
import { getUserBlogs } from "../../../lib/store/actions/userBlogs.action";
import { useAppSelector } from "../../../lib/store/hoooks/hooks";
import { IBlog } from "../../../utilis/types/definitions";
import BlogCard from "../../../_components/blog-card/BlogCard";

const Page = () => {
  const dispatch = useDispatch();

  const userBlogs = useAppSelector((state) => state.userBlogs.blogs);
  const status = useAppSelector((state) => state.userBlogs.status);

  const [category, setCategory] = useState<number>(0);

  const drawerWidth = 240;

  useEffect(() => {
    dispatch(getUserBlogs());
  }, []);

  const blogs = useMemo(() => {
    if (category === 0) {
      return userBlogs.filter((item: IBlog) => item.isPublished);
    } else if (category === 1) {
      return userBlogs.filter((item: IBlog) => !item.isPublished);
    }

    return userBlogs;
  }, [category, userBlogs]);

  const handleCategoryChange = (category: number) => {
    setCategory(category);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Sidebar
        handleCategoryChange={handleCategoryChange}
        selectedCategory={category}
      />

      <Box
        marginLeft={`${drawerWidth}px`}
        padding={2}
        display={"flex"}
        flexDirection={"column"}
        gap={3}
      >
        <Box width={"100%"}>
          <Typography variant={"h5"} marginBottom={1}>
            {category === 0
              ? "Published Blogs"
              : category === 1
                ? "Unpublished Blogs"
                : "Create Blog"}
          </Typography>
          <Divider variant={"fullWidth"} />
        </Box>

        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          {category === 2 ? (
            <CreateBlog handleCategoryChange={handleCategoryChange} />
          ) : (
            <Box display={"flex"} gap={2} flexDirection={"column"}>
              {blogs.map((blog: IBlog) => {
                return <BlogCard blog={blog} key={blog.id} />;
              })}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
