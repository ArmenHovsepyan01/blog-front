"use client";

import React from "react";

import { Box } from "@mui/material";

import FollowersList from "@/_components/user-drawer/followers-list/FollowersList";

const Page = () => {
  return (
    <Box sx={{ padding: "12px" }}>
      <FollowersList title={"Followers"} />
    </Box>
  );
};

export default Page;
