"use client";

import React, { useState } from "react";
import { AccountCircle, Logout, Login } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Box,
} from "@mui/material";

import Link from "next/link";

import { useAppSelector } from "../../../lib/store/hoooks/hooks";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { logOut } from "../../../lib/store/actions/user.actions";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/navigation";
import { setLikedBlogs } from "../../../lib/store/actions/likedBlogs.actions";
import { useSession, signOut } from "next-auth/react";

const Avatar = () => {
  const router = useRouter();

  // const user = useAppSelector((state) => state.user.user);
  const { data } = useSession();
  const user = data?.user;
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => setAnchorEl(null);
  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const onLogOut = async () => {
    await signOut({ redirect: false });
    handleClose();
    router.replace("/");
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
        <Link href={user?.id ? "/my-blog" : ""}>
          <MenuItem onClick={handleClose}>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <PersonIcon /> {user?.firstName ? user?.firstName : "Guest"}
            </Box>
          </MenuItem>
        </Link>

        {user?.id && (
          <Link href={"/liked-blogs"}>
            <MenuItem onClick={handleClose}>Liked Blogs</MenuItem>
          </Link>
        )}

        {user?.id && (
          <Link href={"/reset-password"}>
            <MenuItem onClick={handleClose}>Change password</MenuItem>
          </Link>
        )}

        <Divider />

        {user?.id ? (
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
