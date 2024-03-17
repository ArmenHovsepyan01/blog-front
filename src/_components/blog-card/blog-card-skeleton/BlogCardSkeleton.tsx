import React from "react";
import { Box, Skeleton } from "@mui/material";

const BlogCardSkeleton = () => {
  return (
    <Box display={"flex"} gap={1}>
      <Skeleton variant="rounded" sx={{ flex: 2 }} height={250} />
      <Box sx={{ flex: 3 }} display={"flex"} flexDirection={"column"} gap={2}>
        <Box display={"flex"} gap={1}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant={"text"} width={180} height={30} />
          <Skeleton variant={"text"} width={120} height={30} />
        </Box>
        <Skeleton variant={"text"} width={"80%"} height={40} />
        <Skeleton variant={"text"} width={"80%"} height={80} />
        <Box display={"flex"} justifyContent={"end"} gap={2}>
          <Skeleton variant="rounded" width={30} height={30} />
          <Skeleton variant="rounded" width={30} height={30} />
        </Box>
      </Box>
    </Box>
  );
};

export default BlogCardSkeleton;
