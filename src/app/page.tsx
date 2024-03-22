"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";

import { useDispatch } from "react-redux";
import { getBlogs } from "@/lib/store/actions/blog.actions";
import { useAppSelector } from "@/lib/store/hoooks/hooks";

import { Box, Pagination } from "@mui/material";
import { getLikeBlogs } from "@/lib/store/actions/likedBlogs.actions";
import { RequestStatus } from "@/utilis/types/enums";
import { IBlog } from "@/utilis/types/definitions";
import BlogCard from "@/_components/blog-card/BlogCard";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  console.log(data);
  const dispatch = useDispatch();
  const loading = useAppSelector((state) => state.blog.status);

  const { blogs, status, pagesCount, error } = useAppSelector(
    (state) => state.blog,
  );

  const userStatus = useAppSelector((state) => state.user.status);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 2;

  const pages = useMemo(() => {
    return Math.round(pagesCount / limit);
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

  return (
    <section>
      <main>
        <Box gap={4} padding={4} display={"flex"} flexDirection={"column"}>
          {loading === RequestStatus.SUCCESS ? (
            <>
              {blogs.map((blog: IBlog) => {
                return <BlogCard blog={blog} key={blog.id} />;
              })}
            </>
          ) : (
            <Loading />
          )}
          <Pagination
            count={pages}
            sx={{ margin: "auto" }}
            onChange={OnPageChange}
          />
        </Box>
      </main>
    </section>
  );
}
