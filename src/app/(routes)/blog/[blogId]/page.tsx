"use server";

import React, { FC, Suspense } from "react";
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
import AddToFavorites from "../../../../_components/common/add-to-favorites/AddToFavorites";
import Loading from "./loading";
import { calculateReadingTime } from "../../../../utilis/calculateReadingTime";

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

  return (
    <main>
      <Suspense fallback={<Loading />}>
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
              <span>{`${blog?.user?.firstName} ${blog?.user?.lastName}`}</span>
              <span>{getDate(blog.createdAt)}</span>
              <span>{calculateReadingTime(blog.content)} min read</span>
            </Box>
            <AddToFavorites id={+blogId} />
          </Box>

          <Box sx={{ width: "100%", height: 500, position: "relative" }}>
            <ImageWithFallback
              src={`${process.env.NEXT_PUBLIC_API_URI}/api/images/${blog.imageUrl}`}
              alt={"Image"}
            />
          </Box>
          <Box display={"flex"} gap={4} flexDirection={"column"}>
            <Typography variant={"h4"}>{blog.title}</Typography>
            <p style={{ lineHeight: 1.5 }}>{blog.content}</p>
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
      </Suspense>
    </main>
  );
};

export default Blog;
