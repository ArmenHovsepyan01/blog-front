"use client";

import React from "react";

import { Box, Drawer, Typography } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAppSelector } from "../../lib/store/hoooks/hooks";

import FollowButton from "../follow-button/FollowButton";

import { useAuthor } from "../../hooks/useAuthor";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

const UserDrawer = () => {
  const params = useParams<{ userName: string; userId: string }>();

  const { userId } = params;
  const { user, isLoading, mutate } = useAuthor(userId);

  const drawerWidth = 380;

  const userInfo = {
    id: user?.id,
    firstName: user?.firstName,
    lastName: user?.lastName,
  };

  const addFollower = async () => {
    // const follower = {
    //   id: currentUser.id,
    //   firstName: currentUser.firstName,
    //   lastName: currentUser.lastName,
    // };
    //
    // await mutate({
    //   data: {
    //     ...user,
    //     userFollowers: [...user.userFollowers, follower],
    //   },
    // });
  };

  const removeFollower = async () => {
    // await mutate({
    //   data: {
    //     ...user,
    //     userFollowers: [
    //       ...user.userFollowers.filter(
    //         (follower: any) => follower.id !== currentUser.id,
    //       ),
    //     ],
    //   },
    // });
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
      {isLoading ? (
        <div>Lading...</div>
      ) : (
        <Box display={"flex"} gap={2} flexDirection={"column"}>
          <AccountCircleIcon
            fontSize={"large"}
            sx={{ width: "65px", height: "65px" }}
          />
          <Typography variant={"h5"}>
            {user.firstName} {user.lastName}
          </Typography>
          <Link href={`/user/${params.userName}/${params.userId}/followers`}>
            <span>
              {user?.userFollowers?.length}{" "}
              {user?.userFollowers?.length > 1 ? "Followers" : "Follower"}
            </span>
          </Link>
          <Link href={`/user/${params.userName}/${params.userId}/followings`}>
            <span>
              {user?.userFollowed?.length}{" "}
              {user?.userFollowed?.length > 1 ? "Followings" : "Following"}
            </span>
          </Link>
          {/*{!isLoading && currentUser.id !== user.id && (*/}
          {/*  <FollowButton*/}
          {/*    publisher={userInfo}*/}
          {/*    addFollower={addFollower}*/}
          {/*    removeFollower={removeFollower}*/}
          {/*  />*/}
          {/*)}*/}
        </Box>
      )}
    </Drawer>
  );
};

export default UserDrawer;
