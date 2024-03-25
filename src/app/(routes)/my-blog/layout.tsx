"use client";

import { Box } from "@mui/material";
import React from "react";
import Sidebar from "@/_components/sidebar/Sidebar";
import { usePathname } from "next/navigation";

// export const generateMetadata = (route: Props) => {
//   const { params } = route;
//
//   const title = params?.userName
//     ? `Author: ${params.userName}`
//     : "Node Blogs with Next.js";
//   const description =
//     "A blog built with Next.js and featuring Node.js content.";
//
//   return {
//     title,
//     description,
//   };
// };

export default function Layout({
  children,
  create,
  published,
  unpublished,
}: {
  children: React.ReactNode;
  create: React.ReactNode;
  published: React.ReactNode;
  unpublished: React.ReactNode;
}) {
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
              : children}
      </Box>
    </Box>
  );
}
