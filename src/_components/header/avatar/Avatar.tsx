"use client";

import React, { useEffect, useState } from "react";
import {
  AccountCircle,
  Logout,
  PersonAdd,
  Settings,
  Login,
} from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  Button,
  Divider,
  ListItemIcon,
  Box,
} from "@mui/material";

import Link from "next/link";

import { useAppSelector } from "../../../lib/store/hoooks/hooks";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getUser, logOut } from "../../../lib/store/actions/user.actions";
import PersonIcon from "@mui/icons-material/Person";
const Avatar = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => setAnchorEl(null);
  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const onLogOut = () => {
    Cookies.remove("token");

    dispatch(logOut());
    handleClose();
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link href={user.id ? "/my-blog" : ""}>
          <MenuItem onClick={handleClose}>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <PersonIcon /> {user.firstName ? user.firstName : "Guest"}
            </Box>
          </MenuItem>
        </Link>

        {user.id && (
          <Link href={"/liked-blogs"}>
            <MenuItem onClick={handleClose}>Liked Blogs</MenuItem>
          </Link>
        )}

        <Divider />

        {user.id ? (
          <MenuItem onClick={onLogOut}>
            <Box display={"flex"} alignItems={"center"}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </Box>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose}>
            <Link href={"/login"}>
              <Box display={"flex"} alignItems={"center"}>
                <ListItemIcon>
                  <Login fontSize="small" />
                </ListItemIcon>
                Log in
              </Box>
            </Link>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default Avatar;
