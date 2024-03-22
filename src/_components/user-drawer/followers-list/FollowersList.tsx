import React, { FC } from "react";

import { Box, Divider, Typography } from "@mui/material";

import { Follower } from "../../../utilis/types/definitions";

import FollowerInfo from "../../follower-info/FollowerInfo";

interface IFollowersList {
  followers: Follower[];
  title: string;
}

const FollowersList: FC<IFollowersList> = ({ followers, title }) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Box display={"flex"} gap={3} flexDirection={"column"}>
        {followers?.length > 0 ? (
          followers.map((follower: Follower) => {
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
