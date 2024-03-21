"use client";

import React, { FC, useEffect, useState } from "react";

import { Box, Drawer, Typography } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { RequestStatus } from "../../utilis/types/enums";

import { useAppSelector } from "../../lib/store/hoooks/hooks";

import FollowButton from "../follow-button/FollowButton";
import FollowersList from "./followers-list/FollowersList";

interface IUserDrawer {
  user: any;
  isLoading: boolean;
}

const UserDrawer: FC<IUserDrawer> = ({ user, isLoading }) => {
  const [publisher, setPublisher] = useState(user);
  const currentUser = useAppSelector((state) => state.user.user);

  useEffect(() => {
    setPublisher(user);
  }, [user]);

  const drawerWidth = 380;

  const userInfo = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const addFollower = () => {
    const follower = {
      id: currentUser.id,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    };

    setPublisher((prev: any) => {
      return {
        ...prev,
        userFollowers: [...prev.userFollowers, follower],
      };
    });
  };

  const removeFollower = () => {
    setPublisher((prev: any) => {
      return {
        ...prev,
        userFollowers: [
          ...prev.userFollowers.filter(
            (follower: any) => follower.id !== currentUser.id,
          ),
        ],
      };
    });
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
          {publisher.firstName} {publisher.lastName}
        </Typography>
        <span>
          {publisher?.userFollowers?.length}{" "}
          {publisher?.userFollowers?.length > 1 ? "Followers" : "Follower"}
        </span>
        {!isLoading && currentUser.id !== user.id && (
          <FollowButton
            publisher={userInfo}
            addFollower={addFollower}
            removeFollower={removeFollower}
          />
        )}

        <FollowersList
          followers={publisher?.userFollowers}
          userName={publisher.firstName}
          title={"Followers"}
        />

        <FollowersList
          followers={publisher?.userFollowed}
          userName={publisher.firstName}
          title={"Followings"}
        />
      </Box>
    </Drawer>
  );
};

export default UserDrawer;
