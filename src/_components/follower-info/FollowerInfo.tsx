"use client";

import React, { FC } from "react";

import { Follower } from "@/utilis/types/definitions";

import { Box } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Link from "next/link";

import FollowButton from "../follow-button/FollowButton";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";

interface IFollower {
  follower: Follower;
}

const FollowerInfo: FC<IFollower> = ({ follower }) => {
  const { data: session } = useSession();

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
          <Link href={`/user/@${follower.firstName}/${follower.id}`}>
            <span>{`${follower.firstName} ${follower?.lastName}`}</span>
          </Link>
        </Box>
        {session?.user.id !== follower.id && (
          <FollowButton follower={follower} />
        )}
      </>
    </Box>
  );
};

export default FollowerInfo;
