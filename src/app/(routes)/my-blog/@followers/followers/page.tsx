"use client";

import React from "react";

import { Box, CircularProgress } from "@mui/material";

import { Follower } from "@/utilis/types/definitions";
import { usePagination } from "@/hooks/usePagination";

import InfiniteScroll from "react-infinite-scroll-component";
import FollowerInfo from "@/_components/follower-info/FollowerInfo";
import { useSession } from "next-auth/react";
import Title from "../../../../../_components/title/Title";

const Page = () => {
  const { data: session } = useSession();
  const id = session?.user.id || 0;

  const { followings, isReachedEnd, setSize, size } = usePagination<Follower>(
    `http://localhost:5000/followers/${id}`,
    4,
  );

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={3}
      width={"100%"}
      alignItems={"center"}
    >
      <Title title={"Followers"} />

      <Box
        sx={{ padding: "12px", overflow: "auto" }}
        height={250}
        position={"relative"}
        id={"scrollableDiv"}
      >
        <InfiniteScroll
          next={() => setSize(size + 1)}
          loader={<CircularProgress />}
          hasMore={!isReachedEnd}
          endMessage={<span>Followers list is empty.</span>}
          dataLength={followings?.length ?? 0}
          scrollableTarget={"scrollableDiv"}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {followings?.map((follower) => {
            return <FollowerInfo follower={follower} key={follower.id} />;
          })}
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default Page;
