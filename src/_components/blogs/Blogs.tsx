"use client";

import React, { useEffect, useMemo, useState } from "react";
import { IBlog } from "../../utilis/types/definitions";
import BlogCard from "../blog-card/BlogCard";
import { Box, Pagination } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../lib/store/hoooks/hooks";
import { getBlogs } from "../../lib/store/actions/blog.actions";
import { RequestStatus } from "../../utilis/types/enums";
import { getLikeBlogs } from "../../lib/store/actions/likedBlogs.actions";
import Loading from "../../app/loading";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, status, pagesCount, error } = useAppSelector(
    (state) => state.blog,
  );

  const loading = useAppSelector((state) => state.blog.status);

  const userStatus = useAppSelector((state) => state.user.status);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 2;

  console.log(pagesCount)
  const pages = useMemo(() => {
    return (pagesCount / limit);
  }, [pagesCount, limit]);

  useEffect(() => {
    dispatch(getBlogs(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (userStatus === RequestStatus.SUCCESS) {
      dispatch(getLikeBlogs());
    }
  }, [userStatus]);

  const OnPageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  if (loading === RequestStatus.PENDING) return <Loading />;

  return (
    <Box gap={4} padding={4} display={"flex"} flexDirection={"column"}>
      {blogs.map((blog: IBlog) => {
        return <BlogCard blog={blog} key={blog.id} />;
      })}
      {/*<Pagination*/}
      {/*  count={Math.round(pages)}*/}
      {/*  sx={{ margin: "auto" }}*/}
      {/*  onChange={OnPageChange}*/}
      {/*/>*/}
    </Box>
  );
};

export default Blogs;
