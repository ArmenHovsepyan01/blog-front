import React from "react";
import { Stack } from "@mui/material";
import BlogCardSkeleton from "@/_components/blog-card/blog-card-skeleton/BlogCardSkeleton";

const Loading = () => {
  return (
    <Stack spacing={2} padding={1} width={"100%"}>
      <BlogCardSkeleton />
      <BlogCardSkeleton />
    </Stack>
  );
};

export default Loading;
