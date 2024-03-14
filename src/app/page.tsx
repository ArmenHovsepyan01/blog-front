"use client";

import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { getBlogs } from "../lib/store/actions/blog.actions";
import { useAppSelector } from "../lib/store/hoooks/hooks";

import { Box } from "@mui/material";

import { IBlog } from "../utilis/types/definitions";
import BlogCard from "../_components/blog-card/BlogCard";

export default function Home() {
  const dispatch = useDispatch();
  const { blogs, status } = useAppSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <section>
      <main>
        <Box gap={4} padding={4} display={"flex"} flexDirection={"column"}>
          {blogs.map((blog: IBlog) => {
            return <BlogCard blog={blog} key={blog.id} />;
          })}
        </Box>
      </main>
    </section>
  );
}
