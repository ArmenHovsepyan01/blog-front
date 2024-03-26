"use server";

import React, { FC, Suspense } from "react";

import axios from "axios";

import { IBlog } from "../../../../../utilis/types/definitions";

import { Box, Avatar, Typography, IconButton } from "@mui/material";

import { getDate } from "../../../../../utilis/getDate";

import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import ImageWithFallback from "../../../../../_components/image-with-fallback/ImageWithFallback";
import AddToFavorites from "../../../../../_components/common/add-to-favorites/AddToFavorites";

import Loading from "./loading";

import { calculateReadingTime } from "../../../../../utilis/calculateReadingTime";

import { Metadata, ResolvedMetadata } from "next";
import GoBack from "../../../../../_components/go-back/GoBack";

interface BlogProps {
  params: {
    blogId: string;
  };
}

interface Props {
  params: { blogId: string };
}

export const generateMetadata = async (
  { params }: Props,
  parent: ResolvedMetadata,
): Promise<Metadata> => {
  const blog = await getBlog(params.blogId);
  const previousImages = (await parent).openGraph?.images || [];

  const title = blog.title;
  const description = blog.content;

  return {
    title,
    description,
    openGraph: {
      title: blog.title,
      description: blog.content,
      type: "article",
      authors: [`${blog.user.firstName}`],
      publishedTime: `${blog.createdAt}`,
      images: [
        `${process.env.NEXT_PUBLIC_API_URI}/api/images${blog.imageUrl}`,
        ...previousImages,
      ],
    },
  };
};

async function getBlog(id: string) {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URI}/blog/${id}`,
    );

    return data.data;
  } catch (e: any) {
    throw new Error(e);
  }
}

const Blog: FC<BlogProps> = async ({ params: { blogId } }) => {
  const blog: IBlog = await getBlog(blogId);

  return (
    <main>
      <GoBack />
      <Suspense fallback={<Loading />}>
        <Box
          sx={{
            border: "solid 1px gray",
            borderRadius: 2,
            minHeight: 200,
            marginTop: 3,
          }}
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
              <span>{getDate(blog?.createdAt)}</span>
              <span>{calculateReadingTime(blog.content)} min read</span>
            </Box>
            <AddToFavorites id={+blog.id} />
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
