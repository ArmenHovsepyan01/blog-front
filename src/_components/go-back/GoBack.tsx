"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const GoBack = () => {
  const router = useRouter();

  return (
    <IconButton
      onClick={() => router.back()}
      sx={{ border: 1, borderRadius: 2, width: 40, height: 40 }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

export default GoBack;
