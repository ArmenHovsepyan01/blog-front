"use client";

import React, { useEffect } from "react";

import { Box, AppBar, Toolbar, Typography } from "@mui/material";

import Avatar from "./avatar/Avatar";
import Link from "next/link";
import { getUser } from "@/lib/store/actions/user.actions";

import { useDispatch } from "react-redux";
const Header = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

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
