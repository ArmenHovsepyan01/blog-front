import { Box, Divider, Typography } from "@mui/material";
import React, { FC } from "react";

interface ITitle {
  title: string;
}

const Title: FC<ITitle> = ({ title }) => {
  return (
    <Box width={"100%"}>
      <Typography variant={"h5"} marginBottom={1}>
        {title}
      </Typography>
      <Divider variant={"fullWidth"} />
    </Box>
  );
};

export default Title;
