"use client";

import React, { useCallback, useMemo } from "react";

import { Box } from "@mui/material";

import { useParams } from "next/navigation";

import { useAuthor } from "@/hooks/useAuthor";

import FollowersList from "@/_components/user-drawer/followers-list/FollowersList";

import { fetcher } from "@/utilis/fetcher";

import useSWR from "swr";

const Page = () => {
  const params = useParams<{ userName: string; userId: string }>();
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URI}/followings/${params.userId}`,
    fetcher,
  );

  const { user, mutate } = useAuthor(params.userId);

  useCallback(async () => {
    await mutate({
      data: {
        ...user,
        userFollowed: [...data?.data],
      },
    });
  }, [data]);

  const followers = user?.userFollowed;

  return (
    <Box sx={{ padding: "12px" }}>
      <FollowersList followers={followers} title={"Followed"} />
    </Box>
  );
};

export default Page;
