import React, { FC } from "react";
import { Follower } from "../../utilis/types/definitions";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import FollowButton from "../follow-button/FollowButton";

interface IFollower {
  follower: Follower;
}

const FollowerInfo: FC<IFollower> = ({ follower }) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={2}
      sx={{
        backgroundColor: "rgba(222,222,222,0.3)",
        padding: 1,
        borderRadius: 2,
      }}
    >
      <>
        <AccountCircleIcon />
        <Link href={`/user/${follower.id}`}>
          <span>{`${follower.firstName} ${follower?.lastName}`}</span>
        </Link>
      </>
    </Box>
  );
};

export default FollowerInfo;
