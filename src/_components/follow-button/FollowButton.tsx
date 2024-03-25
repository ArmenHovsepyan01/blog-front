"use client";

import React, { FC, memo } from "react";

import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hoooks/hooks";
import { useDispatch } from "react-redux";
import { Follower } from "@/utilis/types/definitions";
import { follow, unfollow } from "@/lib/store/actions/followed.actions";
import axios from "axios";
import { createConfigForRequest } from "@/utilis/createConfigForRequest";
import { findFollowerById } from "../../lib/store/reducers/followed.reducer";

interface IFollowerButton {
  follower: Follower;
  addFollower?: () => void;
  removeFollower?: () => void;
}

const FollowButton: FC<IFollowerButton> = ({
  follower,
  removeFollower,
  addFollower,
}) => {
  const { status } = useSession();
  const { replace } = useRouter();

  const dispatch = useDispatch();

  const isFollower = useAppSelector((state) =>
    findFollowerById(state, follower.id),
  );

  const onClick = async () => {
    if (status !== "authenticated") return replace("/login");

    try {
      const config = await createConfigForRequest();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/follow`,
        {
          followingId: follower.id,
        },
        config,
      );

      if (isFollower) {
        // @ts-ignore
        dispatch(unfollow(follower.id));
        if (removeFollower) {
          removeFollower();
        }
      } else {
        // @ts-ignore
        dispatch(follow(follower));
        if (addFollower) {
          addFollower();
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button
      sx={{ padding: 1, textTransform: "capitalize", fontSize: "12px" }}
      color={"success"}
      variant={"contained"}
      onClick={onClick}
    >
      {isFollower ? "unfollow" : "follow"}
    </Button>
  );
};

export default memo(FollowButton);
