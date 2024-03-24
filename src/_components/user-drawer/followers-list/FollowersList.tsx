import React, { FC } from "react";

import { Box } from "@mui/material";

import { Follower } from "@/utilis/types/definitions";

import FollowerInfo from "../../follower-info/FollowerInfo";

import { useParams } from "next/navigation";

interface IFollowersList {
  title: string;
  data: Follower[];
}

const FollowersList: FC<IFollowersList> = ({ title, data }) => {
  const params = useParams<{ userName: string; userId: string }>();

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
