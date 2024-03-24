"use client";

import React, { FC } from "react";

import { Box } from "@mui/material";

import FollowersList from "@/_components/user-drawer/followers-list/FollowersList";
import { useUserFollowings } from "@/hooks/useUserFollowings";
import { useUserFollowers } from "@/hooks/useUserFollowers";
import { Follower } from "@/utilis/types/definitions";
import FollowerInfo from "@/_components/follower-info/FollowerInfo";

interface Props {
  params: {
    userId: string;
  };
}
const Page: FC<Props> = ({ params: { userId } }) => {
  const { followers } = useUserFollowers(userId);

  return (
    <Box sx={{ padding: "12px" }}>
      <Box sx={{ marginTop: 2 }}>
        <Box display={"flex"} gap={3} flexDirection={"column"}>
          {followers?.length > 0 ? (
            followers.map((follower: Follower) => {
              return <FollowerInfo follower={follower} key={follower.id} />;
            })
          ) : (
            <span>Followers list is empty.</span>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
