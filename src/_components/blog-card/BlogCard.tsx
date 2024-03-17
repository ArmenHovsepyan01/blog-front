import React, { FC, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Avatar,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import Link from "next/link";

import { IBlog } from "../../utilis/types/definitions";
import { getDate } from "../../utilis/getDate";
import { showLessText } from "../../utilis/showLessText";
import AddToFavorites from "../common/add-to-favorites/AddToFavorites";

interface IBlogCard {
  blog: IBlog;
}

const BlogCard: FC<IBlogCard> = ({ blog }) => {
  const [isFallback, setIsFallback] = useState<boolean>(false);

  const fallbackImageSrc =
    "https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1699909964/fallback_image_ad_1/fallback_image_ad_1-gif?_i=AA";

  return (
    <Card sx={{ display: "flex", height: 250, width: "100%" }}>
      <CardMedia
        src={
          isFallback
            ? fallbackImageSrc
            : `http://localhost:5000/api/images/${blog.imageUrl}`
        }
        component={"img"}
        alt={"blog image"}
        onError={() => {
          setIsFallback(true);
        }}
        sx={{
          width: 400,
          height: "100%",
        }}
      />
      <Box
        padding={2}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        sx={{ width: "100%", flex: 2 }}
      >
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Avatar src={""} />

          <span>
            {blog?.user?.firstName} {blog?.user?.lastName}
          </span>
          <span>{getDate(blog.createdAt)}</span>
        </Box>
        <Box display={"flex"} gap={4} flexDirection={"column"}>
          <Typography variant={"h5"}>{blog.title}</Typography>
          <p style={{ lineBreak: "anywhere" }}>{showLessText(blog.content)}</p>
        </Box>
        <CardActions sx={{ justifyContent: "end" }}>
          <AddToFavorites id={blog.id} />
          <Link href={`/blog/${blog.id}`}>
            <IconButton aria-label="add to favorites">
              <ReadMoreIcon />
            </IconButton>
          </Link>
        </CardActions>
      </Box>
    </Card>
  );
};

export default BlogCard;
