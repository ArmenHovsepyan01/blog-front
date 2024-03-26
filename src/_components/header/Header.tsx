"use client";

import React from "react";

import { Box, AppBar, Toolbar, Typography } from "@mui/material";

import Avatar from "./avatar/Avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: "flex", gap: 3, alignItems: "center" }}
          >
            <Link
              href={"/"}
              className={pathname === "/" ? "active" : "ordinary"}
            >
              Blogs
            </Link>
            <Link
              href={"/following-blogs"}
              className={
                pathname.endsWith("/following-blogs") ? "active" : "ordinary"
              }
            >
              Followings Blogs
            </Link>
          </Typography>
          <Avatar />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
