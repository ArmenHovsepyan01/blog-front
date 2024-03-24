"use client";

import React, { FC, useCallback, useMemo } from "react";

import { Box } from "@mui/material";

import FollowersList from "@/_components/user-drawer/followers-list/FollowersList";

import useSWR from "swr";
import { useUserFollowings } from "@/hooks/useUserFollowings";

interface Props {
  params: {
    userId: string;
  };
}

const Page: FC<Props> = ({ params: { userId } }) => {
  const { followings } = useUserFollowings(userId);

  return (
    <Box sx={{ padding: "12px" }}>
      <FollowersList title={"Followed"} data={followings} />
    </Box>
  );
};

export default Page;
