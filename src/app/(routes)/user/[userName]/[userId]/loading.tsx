import React from "react";
import { Box, Divider, Skeleton, Typography } from "@mui/material";
import BlogLoading from "../../../../loading";

const Loading = () => {
  return (
    <Box
      sx={{
        margin: "auto",
        maxWidth: "1200px",
        minHeight: 500,
        position: "relative",
      }}
    >
      <Box
        sx={{ marginRight: `380px` }}
        display={"flex"}
        gap={2}
        flexDirection={"column"}
      >
        <Typography variant={"h4"} sx={{ marginTop: 8 }}>
          <Skeleton variant="text" sx={{ fontSize: "3rem" }} width={100} />
        </Typography>

        <Divider />
        <Box
          display={"flex"}
          gap={2}
          flexDirection={"column"}
          sx={{ padding: "18px 0", paddingRight: "18px" }}
        >
          <BlogLoading />
        </Box>
      </Box>
    </Box>
  );
};

export default Loading;
