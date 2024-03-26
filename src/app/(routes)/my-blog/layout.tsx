"use client";

import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import Sidebar from "@/_components/sidebar/Sidebar";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
  create: ReactNode;
  published: ReactNode;
  unpublished: ReactNode;
  followers: ReactNode;
  followings: ReactNode;
};

export default function Layout({
  children,
  create,
  published,
  unpublished,
  followers,
  followings,
}: Props) {
  const pathname = usePathname();

  return (
    <Box sx={{ position: "relative" }}>
      <Sidebar />

      <Box
        marginLeft={`380px`}
        padding={2}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={3}
      >
        {pathname.endsWith("create")
          ? create
          : pathname.endsWith("/unpublished")
            ? unpublished
            : pathname.endsWith("/published")
              ? published
              : pathname.endsWith("/followers")
                ? followers
                : pathname.endsWith("/followings")
                  ? followings
                  : children}
      </Box>
    </Box>
  );
}
