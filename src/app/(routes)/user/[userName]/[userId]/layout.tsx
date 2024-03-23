"use client";
import { Box } from "@mui/material";
import UserDrawer from "../../../../../_components/user-drawer/UserDrawer";
import { ReactNode } from "react";
import AuthorTitle from "../../../../../_components/author-title/AuthorTitle";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  params: {
    userName: string;
    followers?: string;
  };
  children: React.ReactNode;
  followers: React.ReactNode;
  followings: React.ReactNode;
};

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
  followers,
  followings,
}: {
  children: React.ReactNode;
  followers: React.ReactNode;
  followings: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        margin: "auto",
        maxWidth: "1200px",
        minHeight: 500,
        position: "relative",
      }}
    >
      <UserDrawer />
      <Box
        sx={{ marginRight: `380px`, marginTop: 8 }}
        display={"flex"}
        gap={2}
        flexDirection={"column"}
      >
        <AuthorTitle followers={!!followers} followings={!!followings} />
        {pathname.endsWith("/followers")
          ? followers
          : pathname.endsWith("/followings")
            ? followings
            : children}
      </Box>
    </Box>
  );
}
