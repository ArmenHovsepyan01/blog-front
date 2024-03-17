"use client";

import React, { useState } from "react";

import {
  Drawer,
  Typography,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import InventoryIcon from "@mui/icons-material/Inventory";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Sidebar from "@/_components/sidebar/Sidebar";
import CreateBlog from "@/_components/create-blog/CreateBlog";

const Page = () => {
  const [category, setCategory] = useState<number>(0);
  const drawerWidth = 240;

  const handleCategoryChange = (category: number) => {
    setCategory(category);
  };

  return (
    <Box>
      <Sidebar
        handleCategoryChange={handleCategoryChange}
        selectedCategory={category}
      />

      <Box
        marginLeft={`${drawerWidth}px`}
        padding={2}
        display={"flex"}
        flexDirection={"column"}
        gap={3}
      >
        <Box width={"100%"}>
          <Typography variant={"h5"} marginBottom={1}>
            Your Blogs
          </Typography>
          <Divider variant={"fullWidth"} />
        </Box>

        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <CreateBlog />
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
