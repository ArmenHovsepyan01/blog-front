"use client";

import { Box } from "@mui/material";
import UserDrawer from "../../../../../_components/user-drawer/UserDrawer";
import AuthorTitle from "../../../../../_components/author-title/AuthorTitle";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  followers: React.ReactNode;
  followings: React.ReactNode;
};

export default function Layout({ children, followers, followings }: Props) {
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
        <AuthorTitle />
        {pathname.endsWith("/followers")
          ? followers
          : pathname.endsWith("/followings")
            ? followings
            : children}
      </Box>
    </Box>
  );
}
