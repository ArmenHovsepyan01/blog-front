"use client";

import React, { memo } from "react";
import { AccountCircle } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useSession } from "next-auth/react";
import { useUserFollowers } from "../../hooks/useUserFollowers";
import Followers from "./followers/Followers";
import Followings from "./followings/Followings";

const UserInfo = () => {
  const { data: session } = useSession();

  return (
    <Box display={"flex"} gap={2} flexDirection={"column"}>
      <Box display={"flex"} alignItems={"center"} gap={2}>
        <AccountCircle fontSize={"large"} />
        <span>
          {session?.user?.firstName} {session?.user?.lastName}
        </span>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-content"}
        alignItems={"center"}
        gap={3}
      >
        {session?.user.id && <Followers id={session?.user.id} />}
        {session?.user.id && <Followings id={session?.user.id} />}
      </Box>
    </Box>
  );
};

export default memo(UserInfo);
