"use client";

import React from "react";

import { Box, Drawer, Typography } from "@mui/material";

import { useAuthor } from "@/hooks/useAuthor";
import { useParams } from "next/navigation";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSession } from "next-auth/react";
import FollowButton from "@/_components/follow-button/FollowButton";

const UserDrawer = () => {
  const params = useParams<{ userName: string; userId: string }>();

  const { userId } = params;
  const { user, isLoading, mutate } = useAuthor(userId);
  const { data: session } = useSession();

  const drawerWidth = 380;

  const userInfo = {
    id: user?.id,
    firstName: user?.firstName,
    lastName: user?.lastName,
  };

  const addFollower = async () => {
    const follower = {
      id: session?.user.id,
      firstName: session?.user.firstName,
      lastName: session?.user.lastName,
    };

    await mutate({
      data: {
        ...user,
        userFollowers: [...user.userFollowers, follower],
      },
    });
  };

  const removeFollower = async () => {
    await mutate({
      data: {
        ...user,
        userFollowers: [
          ...user.userFollowers.filter(
            (follower: any) => follower.id !== session?.user.id,
          ),
        ],
      },
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
          {!isLoading && session?.user.id !== user.id && (
            <FollowButton
              follower={userInfo}
              addFollower={addFollower}
              removeFollower={removeFollower}
            />
          )}
        </Box>
      )}
    </Drawer>
  );
};

export default UserDrawer;
