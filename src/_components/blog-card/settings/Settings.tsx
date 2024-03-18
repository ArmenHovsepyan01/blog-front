"use client";

import React, { FC, useState } from "react";

import { Box, IconButton } from "@mui/material";
import { Delete, Edit, Publish } from "@mui/icons-material";
import { Tooltip } from "@mui/joy";
import { useDispatch } from "react-redux";

import {
  deleteUserBlog,
  updateUserBlog,
} from "../../../lib/store/actions/userBlogs.action";

import styles from "./Settings.module.scss";
import CreateBlog from "../../create-blog/CreateBlog";
interface ISettings {
  id: number;
  isPublished: boolean;
}

const Settings: FC<ISettings> = ({ isPublished, id }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deleteBlog = async () => {
    dispatch(deleteUserBlog(id));
  };

  const publishBlog = async () => {
    const values = {
      isPublished: true,
    };

    dispatch(updateUserBlog(id, values));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box display={"flex"} gap={2} alignItems={"center"}>
        <Tooltip title={"Delete blog"}>
          <IconButton onClick={deleteBlog}>
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
          <IconButton onClick={openModal}>
            <Edit />
          </IconButton>
        </Tooltip>
      </Box>

      {isOpen && (
        <Box
          className={styles.editModal}
          style={{ margin: 0 }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CreateBlog closeModal={closeModal} id={id} />
        </Box>
      )}
    </>
  );
};

export default Settings;
