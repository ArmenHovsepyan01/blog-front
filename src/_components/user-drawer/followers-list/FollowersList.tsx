import React, { FC } from "react";

import { Box } from "@mui/material";

import { Follower } from "../../../utilis/types/definitions";

import FollowerInfo from "../../follower-info/FollowerInfo";
import { useAuthor } from "../../../hooks/useAuthor";
import { useParams } from "next/navigation";

interface IFollowersList {
  title: string;
}

const FollowersList: FC<IFollowersList> = ({ title }) => {
  const params = useParams<{ userName: string; userId: string }>();

  const { user, mutate } = useAuthor(params.userId);

  const data = title === "Followers" ? user?.userFollowers : user?.userFollowed;

  const addFollower = async (follower: Follower) => {
    await mutate({
      data: {
        ...user,
        userFollowers: [...user.userFollowers, follower],
      },
    });
  };

  const removeFollower = async (followerId: number) => {
    const filteredFollowers = user.userFollowers.filter(
      (item: Follower) => item.id !== followerId,
    );

    await mutate({
      data: {
        ...user,
        userFollowers: [...filteredFollowers],
      },
    });
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <Box display={"flex"} gap={3} flexDirection={"column"}>
        {data?.length > 0 ? (
          data.map((follower: Follower) => {
            return <FollowerInfo follower={follower} key={follower.id} />;
          })
        ) : (
          <span>{title} list is empty.</span>
        )}
      </Box>
    </Box>
  );
};

export default FollowersList;
