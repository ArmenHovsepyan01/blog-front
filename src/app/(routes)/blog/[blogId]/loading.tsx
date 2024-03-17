import React from "react";
import { Box, Skeleton, Stack } from "@mui/material";

const Loading = () => {
  return (
    <main>
      <Stack spacing={2} padding={4} border={1} borderRadius={1}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} gap={1} alignItems={"center"}>
            <Skeleton variant={"circular"} width={40} height={40} />
            <Skeleton variant={"text"} width={180} height={30} />
            <Skeleton variant={"text"} width={120} height={30} />
          </Box>
          <Skeleton variant={"rounded"} width={25} height={25} />
        </Box>

        <Skeleton variant={"rectangular"} width={"100%"} height={500} />
        <Skeleton variant={"text"} width={300} height={45} />
        <Skeleton variant={"text"} width={"100%"} height={250} />

        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Skeleton variant={"rounded"} width={25} height={25} />
          <Skeleton variant={"rounded"} width={25} height={25} />
          <Skeleton variant={"rounded"} width={25} height={25} />
        </Box>
      </Stack>
    </main>
  );
};

export default Loading;
