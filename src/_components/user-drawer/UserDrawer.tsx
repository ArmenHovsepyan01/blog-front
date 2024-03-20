"use client";

import React from "react";

import { Box, Drawer, Typography } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { RequestStatus } from "../../utilis/types/enums";

import { useAppSelector } from "../../lib/store/hoooks/hooks";

import FollowButton from "../follow-button/FollowButton";
import FollowersList from "./followers-list/FollowersList";

const UserDrawer = () => {
  const user = useAppSelector((state) => state.publisher.publisher);
  const status = useAppSelector((state) => state.publisher.status);
  const drawerWidth = 320;

  const userInfo = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  return (
    <Drawer
      anchor={"right"}
      variant="permanent"
      sx={{
        flexShrink: 0,
        width: drawerWidth,

        [`& .MuiDrawer-paper`]: {
          boxSizing: "border-box",
          width: drawerWidth,
          position: "absolute",
          height: "calc(100vh - 65px)",
          padding: 4,
        },
      }}
    >
      <Box display={"flex"} gap={2} flexDirection={"column"}>
        <AccountCircleIcon
          fontSize={"large"}
          sx={{ width: "65px", height: "65px" }}
        />
        <Typography variant={"h5"}>
          {user.firstName} {user.lastName}
        </Typography>
        <span>
          {user?.userFollowers?.length}{" "}
          {user?.userFollowers?.length > 1 ? "Followers" : "Follower"}
        </span>
        {status === RequestStatus.SUCCESS && (
          <FollowButton publisher={userInfo} />
        )}

        <FollowersList
          followers={user?.userFollowers}
          userName={user.firstName}
          title={"Followers"}
        />

        <FollowersList
          followers={user?.userFollowed}
          userName={user.firstName}
          title={"Followings"}
        />
      </Box>
    </Drawer>
  );
};

export default UserDrawer;
