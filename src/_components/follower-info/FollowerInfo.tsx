"use client";

import React, { FC } from "react";

import { Follower } from "../../utilis/types/definitions";

import { Box } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Link from "next/link";

import FollowButton from "../follow-button/FollowButton";
import { useAppSelector } from "../../lib/store/hoooks/hooks";

interface IFollower {
  follower: Follower;
}

const FollowerInfo: FC<IFollower> = ({ follower }) => {
  const userId = useAppSelector((state) => state.user.user.id);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={2}
      flexWrap={"wrap"}
      justifyContent={"space-between"}
      sx={{
        backgroundColor: "rgba(222,222,222,0.3)",
        padding: 1,
        borderRadius: 2,
      }}
    >
      <>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <AccountCircleIcon />
          <Link href={`/user/${follower.id}`}>
            <span>{`${follower.firstName} ${follower?.lastName}`}</span>
          </Link>
        </Box>
        {userId !== follower.id && <FollowButton publisher={follower} />}
      </>
    </Box>
  );
};

export default FollowerInfo;
