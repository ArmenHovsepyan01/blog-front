"use client";

import React, { FC } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useAuthor } from "../../hooks/useAuthor";
import { useParams } from "next/navigation";
import GoBack from "../go-back/GoBack";

const AuthorTitle = () => {
  const params = useParams<{ userName: string; userId: string }>();
  const { user } = useAuthor(params.userId);

  return (
    <>
      <Box display={"flex"} alignItems={"center"} gap={3}>
        <GoBack />
        <Typography variant={"h4"}>
          {user?.firstName} {user?.lastName}
        </Typography>
      </Box>
      <Divider />
    </>
  );
};

export default AuthorTitle;
