"use client";

import React, { FC, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

interface INotification {
  message: string;
  isOpen: boolean;
  handleClose: () => void;
}

const Notification: FC<INotification> = ({ message, isOpen, handleClose }) => {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
