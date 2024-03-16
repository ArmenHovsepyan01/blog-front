import React from "react";
import { Skeleton, Stack } from "@mui/material";

const Loading = () => {
  return (
    <main>
      <Stack spacing={2}>
        <Skeleton variant="rounded" width={"100%"} height={250} />
        <Skeleton variant="rounded" width={"100%"} height={250} />
      </Stack>
    </main>
  );
};

export default Loading;
