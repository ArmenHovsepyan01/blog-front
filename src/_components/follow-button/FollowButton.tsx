"use client";

import { Button } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../lib/store/hoooks/hooks";
import axios from "axios";
import { createConfigForRequest } from "../../utilis/createConfigForRequest";
import { useDispatch } from "react-redux";
import { follow, unfollow } from "../../lib/store/actions/user.actions";
import { Follower } from "../../utilis/types/definitions";
import {
  addFollower,
  removeFollower,
} from "../../lib/store/actions/publisher.actions";
import { useRouter } from "next/navigation";

interface IFollowButton {
  publisher: Follower;
  size?: number;
}

const FollowButton: FC<IFollowButton> = ({ publisher, size }) => {
  const dispatch = useDispatch();
  const [isFollower, setIsFollower] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user.user);
  const status = useAppSelector((state) => state.user.status);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const follower = user?.userFollowed?.find(
        (user: any) => user.id === publisher.id,
      );

      if (follower) {
        setIsFollower(true);
      } else {
        setIsFollower(false);
      }
    }
  }, [user.userFollowed]);

  const onClick = async () => {
    try {
      if (!user.id) return router.replace("/login");

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/follow`,
        {
          followingId: publisher?.id,
        },
        createConfigForRequest(),
      );

      if (isFollower) {
        dispatch(unfollow(publisher?.id));
        dispatch(removeFollower(user.id));
      } else {
        dispatch(follow(publisher));
        dispatch(
          addFollower({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
          }),
        );
      }

      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button
      sx={{ padding: 1, textTransform: "capitalize", fontSize: "12px" }}
      color={isFollower ? "warning" : "success"}
      variant={"contained"}
      onClick={onClick}
    >
      {isFollower ? "unfollow" : "follow"}
    </Button>
  );
};

export default FollowButton;
