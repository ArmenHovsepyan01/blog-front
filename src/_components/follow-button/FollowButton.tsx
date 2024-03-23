"use client";

import React, { FC } from "react";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";

interface IFollowerButton {
  followerId: number;
  addFollow: () => void;
  removeFollow: () => void;
}

const FollowButton: FC<IFollowerButton> = ({
  followerId,
  addFollow,
  removeFollow,
}) => {
  const isFollower = false;
  const onClick = () => {
    if (isFollower) {
      removeFollow();
    } else {
      addFollow();
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

export default FollowButton;
