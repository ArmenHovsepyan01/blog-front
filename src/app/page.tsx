"use client";

import React, { useEffect, useMemo, useState } from "react";

import { useDispatch } from "react-redux";
import { getBlogs } from "@/lib/store/actions/blog.actions";
import { useAppSelector } from "@/lib/store/hoooks/hooks";

import { Box, Pagination } from "@mui/material";
import { RequestStatus } from "@/utilis/types/enums";
import { IBlog } from "@/utilis/types/definitions";
import BlogCard from "@/_components/blog-card/BlogCard";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { getLikedBlogs } from "../lib/store/actions/likedBlogs.actions";

export default function Home() {
  const { status, data } = useSession();

  const dispatch = useDispatch();
  const loading = useAppSelector((state) => state.blog.status);

  const { blogs, pagesCount } = useAppSelector((state) => state.blog);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 2;

  const pages = useMemo(() => {
    return Math.round(pagesCount / limit);
  }, [pagesCount, limit]);

  useEffect(() => {
    // @ts-ignore
    dispatch(getBlogs(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (status === "authenticated") {
      // @ts-ignore
      dispatch(getLikedBlogs());
    }
  }, [status]);

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
