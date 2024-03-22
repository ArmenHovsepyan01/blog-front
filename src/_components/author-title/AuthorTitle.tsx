"use client";

import React, { FC } from "react";
import { Divider, Typography } from "@mui/material";
import { useAuthor } from "../../hooks/useAuthor";
import { useParams } from "next/navigation";

interface IAuthorTitle {
  followers?: boolean;
  followings?: boolean;
}

const AuthorTitle: FC<IAuthorTitle> = ({ followings, followers }) => {
  const params = useParams<{ userName: string; userId: string }>();
  const { user } = useAuthor(params.userId);

  return (
    <>
      <Typography variant={"h4"}>
        {user?.firstName} {user?.lastName}
      </Typography>
      <Divider />
    </>
  );
};

export default AuthorTitle;
