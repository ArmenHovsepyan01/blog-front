"use client";

import React, { FC, useState } from "react";

import { Box, Button, IconButton, Modal } from "@mui/material";
import { Delete, Edit, Publish } from "@mui/icons-material";
import { Tooltip } from "@mui/joy";
import { useDispatch } from "react-redux";

import {
  deleteUserBlog,
  updateUserBlog,
} from "../../../lib/store/actions/userBlogs.action";

import Link from "next/link";
import { white } from "next/dist/lib/picocolors";
interface ISettings {
  id: number;
  isPublished: boolean;
}

const Settings: FC<ISettings> = ({ isPublished, id }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteBlog = async () => {
    dispatch(deleteUserBlog(id));
    closeModal();
  };

  const publishBlog = async () => {
    const values = {
      isPublished: true,
    };

    dispatch(updateUserBlog(id, values));
  };

  return (
    <>
      <Box display={"flex"} gap={2} alignItems={"center"}>
        <Tooltip title={"Delete blog"}>
          <IconButton onClick={openModal}>
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </Tooltip>

        {!isPublished && (
          <Tooltip title={"Publish blog"}>
            <IconButton onClick={publishBlog}>
              <Publish sx={{ color: "green" }} />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title={"Edit blog"}>
          <Link href={`/my-blog/${id}/edit`}>
            <IconButton>
              <Edit />
            </IconButton>
          </Link>
        </Tooltip>
      </Box>
      <Modal
        open={isOpen}
        onClose={closeModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{ backgroundColor: "white", width: 400, height: 220 }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          gap={3}
        >
          Are you sure you want to delete this blog.
          <Box display={"flex"} gap={2}>
            <Button
              variant={"contained"}
              color={"success"}
              onClick={deleteBlog}
            >
              Yes
            </Button>
            <Button variant={"contained"} color={"error"} onClick={closeModal}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Settings;
