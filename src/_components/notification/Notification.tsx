"use client";

import React, { FC, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

interface INotification {
  message: string;
  isOpen: boolean;
  handleClose: () => void;
  type: string;
}

const Notification: FC<INotification> = ({
  message,
  isOpen,
  handleClose,
  type,
}) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        //@ts-ignore
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
