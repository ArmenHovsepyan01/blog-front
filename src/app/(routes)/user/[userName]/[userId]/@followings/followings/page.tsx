"use client";

import React, { FC } from "react";

import { Box, CircularProgress } from "@mui/material";

import { Follower } from "../../../../../../../utilis/types/definitions";
import { usePagination } from "../../../../../../../hooks/usePagination";

import InfiniteScroll from "react-infinite-scroll-component";
import FollowerInfo from "../../../../../../../_components/follower-info/FollowerInfo";

interface Props {
  params: {
    userId: string;
  };
}

const Page: FC<Props> = ({ params: { userId } }) => {
  const { followings, isReachedEnd, isLoadingMore, setSize, size } =
    usePagination<Follower>("http://localhost:5000/followings", userId, 4);

  return (
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
        // endMessage={<span>There is no followings</span>}
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
  );
};

export default Page;
