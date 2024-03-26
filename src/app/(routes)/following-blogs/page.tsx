"use client";

import React, { useEffect } from "react";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { usePagination } from "../../../hooks/usePagination";
import { IBlog } from "../../../utilis/types/definitions";
import InfiniteScroll from "react-infinite-scroll-component";
import BlogCard from "../../../_components/blog-card/BlogCard";
import Loading from "../../loading";
import { getLikedBlogs } from "../../../lib/store/actions/likedBlogs.actions";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";

const Page = () => {
  const url = `${process.env.NEXT_PUBLIC_API_URI}/user-followings-blogs`;
  const { status } = useSession();
  const dispatch = useDispatch();

  const { followings, isReachedEnd, setSize, size } = usePagination<IBlog>(
    url,
    4,
  );
  useEffect(() => {
    if (status === "authenticated") {
      // @ts-ignore
      dispatch(getLikedBlogs());
    }
  }, [status]);
  console.log(followings);

  return (
    <section>
      <main>
        <Box gap={4} padding={4} display={"flex"} flexDirection={"column"}>
          <InfiniteScroll
            next={() => setSize(size + 1)}
            hasMore={!isReachedEnd}
            loader={<Loading />}
            dataLength={followings?.length ?? 0}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {followings?.map((item) => {
              return <BlogCard blog={item} key={item.id} />;
            })}
          </InfiniteScroll>
        </Box>
      </main>
    </section>
  );
};

export default Page;
