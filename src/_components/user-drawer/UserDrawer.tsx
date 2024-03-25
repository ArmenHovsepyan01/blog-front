"use client";

import React, { memo, useCallback, useEffect, useMemo } from "react";

import { Box, Drawer, Typography } from "@mui/material";

import { useAuthor } from "@/hooks/useAuthor";
import { useParams } from "next/navigation";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSession } from "next-auth/react";
import FollowButton from "@/_components/follow-button/FollowButton";
import { useDispatch } from "react-redux";
import { getFollowed } from "@/lib/store/actions/followed.actions";

const UserDrawer = () => {
  const params = useParams<{ userName: string; userId: string }>();

  const { userId } = params;
  const { user, isLoading, mutate } = useAuthor(userId);
  const { data: session } = useSession();

  const dispatch = useDispatch();
  const id = session?.user.id;

  useEffect(() => {
    if (typeof window !== "undefined" && id) {
      // @ts-ignore
      dispatch(getFollowed(id));
    }
  }, [id]);

  const drawerWidth = 380;

  const userInfo = useMemo(() => {
    return {
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
    };
  }, [user]);

  const addFollower = useCallback(async () => {
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
  }, [user, session]);

  const removeFollower = useCallback(async () => {
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
  }, [user, session]);

  const followers = useMemo(() => {
    return user?.userFollowers?.length;
  }, [user?.userFollowers]);

  const followings = useMemo(() => {
    return user?.userFollowed?.length;
  }, [user?.userFollowed]);

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
              {followers} {followers > 1 ? "Followers" : "Follower"}
            </span>
          </Link>
          <Link href={`/user/${params.userName}/${params.userId}/followings`}>
            <span>
              {followings} {followings > 1 ? "Followings" : "Following"}
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

export default memo(UserDrawer);
