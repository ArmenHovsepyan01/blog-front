"use client";

import React, { FC } from "react";

import { Follower } from "../../utilis/types/definitions";

import { Box } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Link from "next/link";

import FollowButton from "../follow-button/FollowButton";
import { useAppSelector } from "../../lib/store/hoooks/hooks";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { follow, unfollow } from "../../lib/store/actions/user.actions";

interface IFollower {
  follower: Follower;
}

const FollowerInfo: FC<IFollower> = ({ follower }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const userFollowed = useAppSelector((state) => state.user.user.userFollowed);

  const isFollower = Boolean(
    userFollowed?.find((item: Follower) => item.id === follower.id),
  );

  const addFollow = () => {
    dispatch(follow(follower));
    // addFollower(follower);
  };

  const removeFollow = () => {
    dispatch(unfollow(follower.id));
    // removeFollower(follower.id);
  };

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
        {session?.user.id !== follower.id && (
          <FollowButton
            followerId={follower.id}
            addFollow={addFollow}
            removeFollow={removeFollow}
          />
        )}
      </>
    </Box>
  );
};

export default FollowerInfo;
