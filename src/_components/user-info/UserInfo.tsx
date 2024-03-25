"use client";

import React, { memo } from "react";
import { AccountCircle } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useSession } from "next-auth/react";

const UserInfo = () => {
  const { data: session } = useSession();

  return (
    <Box display={"flex"} alignItems={"center"} gap={2}>
      <AccountCircle fontSize={"large"} />
      <span>
        {session?.user?.firstName} {session?.user?.lastName}
      </span>
    </Box>
  );
};

export default memo(UserInfo);
