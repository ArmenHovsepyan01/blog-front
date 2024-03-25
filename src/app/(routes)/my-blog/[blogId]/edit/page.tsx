"use server";

import React, { FC } from "react";
import axios from "axios";
import { createConfigForRequest } from "../../../../../utilis/createConfigForRequest";
import CreateBlog from "../../../../../_components/create-blog/CreateBlog";
import { Box, Typography } from "@mui/material";

interface IEdit {
  params: {
    blogId: string;
  };
}

const Edit: FC<IEdit> = async ({ params: { blogId } }) => {
  const config = await createConfigForRequest();
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URI}/blog/${blogId}`,
    config,
  );

  console.log(data, "data");

  return (
    <main>
      <Box display={"flex"} gap={2} flexDirection={"column"}>
        <Typography variant={"h5"} color={"black"}>
          Editing <i style={{ color: "gray" }}>{data.blog.title}</i>
        </Typography>
        <CreateBlog blog={data.blog} />
      </Box>
    </main>
  );
};

export default Edit;
