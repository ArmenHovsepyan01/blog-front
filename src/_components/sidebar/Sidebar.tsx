"use client";

import React, { FC } from "react";

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
import { useAppSelector } from "../../lib/store/hoooks/hooks";
import FollowersList from "../user-drawer/followers-list/FollowersList";
import { Box } from "@mui/system";
import { AccountCircle } from "@mui/icons-material";

interface ISidebar {
  handleCategoryChange: (category: number) => void;
  selectedCategory: number;
}

const Sidebar: FC<ISidebar> = ({ handleCategoryChange, selectedCategory }) => {
  const user = useAppSelector((state) => state.user.user);
  const status = useAppSelector((state) => state.user.status);

  const drawerWidth = 380;

  const sidebarItems = ["Published", "Unpublished", "Create"];

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
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <AccountCircle fontSize={"large"} />
            <span>
              {user?.firstName} {user?.lastName}
            </span>
          </Box>
          <Box
            display={"flex"}
            gap={3}
            flexDirection={"column"}
            sx={{ margin: "16px 0", fontSize: "18px" }}
          >
            <FollowersList
              followers={user?.userFollowers}
              userName={user?.firstName}
              title={"Followers"}
            />
            <FollowersList
              followers={user?.userFollowed}
              userName={user?.firstName}
              title={"Following"}
            />
          </Box>
          <List>
            {sidebarItems.map((item, i) => {
              return (
                <ListItem
                  disablePadding
                  key={i}
                  onClick={() => handleCategoryChange(i)}
                  sx={{
                    backgroundColor:
                      selectedCategory === i ? "#dedede" : "transparent",
                    width: "100%",
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
              );
            })}
          </List>
        </Typography>
      </Toolbar>
    </Drawer>
  );
};

export default Sidebar;
