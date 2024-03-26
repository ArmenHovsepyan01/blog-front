"use client";

import React, { FC, memo, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Avatar,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";

import ReadMoreIcon from "@mui/icons-material/ReadMore";
import Link from "next/link";

import { IBlog } from "@/utilis/types/definitions";
import { getDate } from "@/utilis/getDate";
import { showLessText } from "@/utilis/showLessText";
import AddToFavorites from "../common/add-to-favorites/AddToFavorites";
import { calculateReadingTime } from "@/utilis/calculateReadingTime";
import Settings from "./settings/Settings";
import { usePathname } from "next/navigation";

import Image from "next/image";

interface IBlogCard {
  blog: IBlog;
}

const BlogCard: FC<IBlogCard> = ({ blog }) => {
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const pathname = usePathname();

  const fallbackImageSrc =
    "https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1699909964/fallback_image_ad_1/fallback_image_ad_1-gif?_i=AA";

  const generateLinkTitle = (title?: string) => {
    if (!title) return "";
    return `${title.toLowerCase().split(" ").join("-")}`;
  };

  return (
    <Card sx={{ display: "flex", height: 250, width: "100%" }}>
      <Link href={`/blog/${generateLinkTitle(blog.title)}/${blog.id}`}>
        <CardMedia
          component={"div"}
          sx={{
            width: 400,
            height: "100%",
            position: "relative",
          }}
        >
          <Image
            src={
              isFallback
                ? fallbackImageSrc
                : `http://localhost:5000/api/images/${blog.imageUrl}`
            }
            alt={"blog image"}
            onError={() => {
              setIsFallback(true);
            }}
            fill
            sizes="(max-width: 700px) 400px"
            loading={"lazy"}
          />
        </CardMedia>
      </Link>
      <Box
        padding={2}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        sx={{ width: "100%", flex: 2 }}
      >
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Avatar />

          <Link
            href={`/user/${generateLinkTitle(blog?.user?.firstName)}/${blog.userId}`}
          >
            <span>
              {blog?.user?.firstName} {blog?.user?.lastName}
            </span>
          </Link>
          <span>{getDate(blog.createdAt)}</span>
          <span>{calculateReadingTime(blog.content)} min read</span>
        </Box>

        <Link href={`/blog/${generateLinkTitle(blog.title)}/${blog.id}`}>
          <Box display={"flex"} gap={4} flexDirection={"column"}>
            <Typography variant={"h6"}>{blog.title}</Typography>
            <p style={{ lineBreak: "anywhere" }}>
              {showLessText(blog.content)}
            </p>
          </Box>
        </Link>
        <CardActions sx={{ justifyContent: "end" }}>
          {pathname.includes("/my-blog") && (
            <Settings isPublished={blog.isPublished} id={blog.id} />
          )}

          {blog.isPublished && (
            <>
              <AddToFavorites id={blog.id} />
              <Link href={`/blog/${generateLinkTitle(blog.title)}/${blog.id}`}>
                <IconButton aria-label="add to favorites">
                  <ReadMoreIcon />
                </IconButton>
              </Link>
            </>
          )}
        </CardActions>
      </Box>
    </Card>
  );
};

export default memo(BlogCard);
