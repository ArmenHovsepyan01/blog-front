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

interface ISidebar {
  handleCategoryChange: (category: number) => void;
  selectedCategory: number;
}

const Sidebar: FC<ISidebar> = ({ handleCategoryChange, selectedCategory }) => {
  const drawerWidth = 240;
  const sidebarItems = ["Drafts", "Create"];

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        width: drawerWidth,

        [`& .MuiDrawer-paper`]: {
          boxSizing: "border-box",
          top: 64,
          width: drawerWidth,
        },
      }}
    >
      <Toolbar sx={{ width: "100%" }}>
        <Typography variant="h6" noWrap component="div" width={"100%"}>
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
                      {i === 0 ? (
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
