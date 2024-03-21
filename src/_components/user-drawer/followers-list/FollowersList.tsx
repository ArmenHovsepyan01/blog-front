import React, { FC } from "react";

import { Box, Divider, Typography } from "@mui/material";

import { Follower } from "../../../utilis/types/definitions";

import FollowerInfo from "../../follower-info/FollowerInfo";

interface IFollowersList {
  followers: Follower[];
  userName: string;
  title: string;
}

const FollowersList: FC<IFollowersList> = ({ followers, userName, title }) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant={"h6"}>{title}</Typography>
      <Divider sx={{ margin: "12px 0" }} />
      <Box
        display={"flex"}
        gap={3}
        flexDirection={"column"}
        sx={{ maxHeight: "120px", overflow: "auto" }}
      >
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
