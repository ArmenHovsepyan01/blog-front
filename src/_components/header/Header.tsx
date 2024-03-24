"use client";

import React from "react";

import { Box, AppBar, Toolbar, Typography, TextField } from "@mui/material";

import Avatar from "./avatar/Avatar";
import Link from "next/link";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href={"/"} style={{ color: "#fff" }}>
              Blog
            </Link>
          </Typography>
          <Avatar />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
