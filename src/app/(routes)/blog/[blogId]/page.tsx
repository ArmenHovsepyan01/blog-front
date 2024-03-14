"use server";

import React, { FC } from "react";
import axios from "axios";
import { IBlog } from "../../../../utilis/types/definitions";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import { getDate } from "../../../../utilis/getDate";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";
import store from "../../../../lib/store/store";
import ImageWithFallback from "../../../../_components/image-with-fallback/ImageWithFallback";

interface BlogProps {
  params: {
    blogId: string;
  };
}

async function getBlog(id: string) {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URI}/blog/${id}`,
    );
    return data.blog;
  } catch (e: any) {
    throw new Error(e);
  }
}

const Blog: FC<BlogProps> = async ({ params: { blogId } }) => {
  const blog: IBlog = await getBlog(blogId);
  const user = store.getState().user.user.id;

  return (
    <main>
      <Box
        sx={{ border: "solid 1px gray", borderRadius: 2, minHeight: 200 }}
        padding={4}
        display={"flex"}
        flexDirection={"column"}
        gap={4}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Avatar />
            <span>{`${blog.user.firstName} ${blog.user.lastName}`}</span>
            <span>{getDate(blog.createdAt)}</span>
          </Box>
          <IconButton>
            <Link href={!user ? "/login" : ""}>
              <FavoriteIcon />
            </Link>
          </IconButton>
        </Box>

        <Box sx={{ width: "100%", height: 500, position: "relative" }}>
          {/*<Image*/}
          {/*  src={`${process.env.NEXT_PUBLIC_API_URI}/api/images/${blog.imageUrl}`}*/}
          {/*  alt={"Image"}*/}
          {/*  layout={"fill"}*/}
          {/*  objectFit={"cover"}*/}
          {/*/>*/}
          <ImageWithFallback
            src={`${process.env.NEXT_PUBLIC_API_URI}/api/images/${blog.imageUrl}`}
            alt={"Image"}
          />
        </Box>
        <Box display={"flex"} gap={4} flexDirection={"column"}>
          <Typography variant={"h4"}>{blog.title}</Typography>
          <p>{blog.content}</p>
        </Box>
        <Box display={"flex"} gap={2} sx={{ borderTop: 1, borderBottom: 1 }}>
          <IconButton>
            <TwitterIcon />
          </IconButton>
          <IconButton>
            <FacebookIcon />
          </IconButton>
          <IconButton>
            <InstagramIcon />
          </IconButton>
        </Box>
      </Box>
    </main>
  );
};

export default Blog;
