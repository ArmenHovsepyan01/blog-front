import React, { FC } from "react";

import Box from "@mui/system/Box";
import GoBack from "../go-back/GoBack";

interface IFormWrapper {
  children: React.ReactNode;
  label: string;
}

const FormWrapper: FC<IFormWrapper> = ({ children, label }) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      maxWidth={500}
      margin={"120px auto"}
      padding={4}
      width={"100%"}
      sx={{
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        borderRadius: 2,
        color: "black",
      }}
      position={"relative"}
    >
      <Box sx={{ position: "absolute", top: 0, left: -50 }}>
        <GoBack />
      </Box>
      <h2 style={{ marginBottom: 20 }}>{label}</h2>
      {children}
    </Box>
  );
};

export default FormWrapper;
