"use client";

import React, { memo, useEffect } from "react";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import UserInfo from "../user-info/UserInfo";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { getUserBlogs } from "../../lib/store/actions/userBlogs.action";

import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const drawerWidth = 380;

  const sidebarItems = ["Published", "Unpublished", "Create"];

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.access_token) {
      // @ts-ignore
      dispatch(getUserBlogs(session?.user.access_token));
    }
  }, [session]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        width: drawerWidth,

        [`& .MuiDrawer-paper`]: {
          boxSizing: "border-box",
          width: drawerWidth,
          position: "absolute",
          height: "calc(100vh - 65px)",
        },
      }}
    >
      <Toolbar sx={{ width: "100%", padding: "24px 0" }}>
        <Typography variant="h6" noWrap component="div" width={"100%"}>
          <UserInfo />
          <List>
            {sidebarItems.map((item, i) => {
              return (
                <Link href={`/my-blog/${item.toLowerCase()}`} key={i}>
                  <ListItem
                    disablePadding
                    sx={{
                      backgroundColor:
                        pathname.split("/my-blog/")[1] === item.toLowerCase()
                          ? "#dedede"
                          : "transparent",
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        {i === 0 || i === 1 ? (
                          <InventoryIcon />
                        ) : (
                          <DriveFileRenameOutlineIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Typography>
      </Toolbar>
    </Drawer>
  );
};

export default memo(Sidebar);
