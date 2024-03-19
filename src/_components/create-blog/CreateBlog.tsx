"use client";

import React, { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Textarea from "@mui/joy/Textarea";

import Upload from "@/_components/upload/Upload";
import { useDispatch } from "react-redux";
import {
  addBlogToUserBlogs,
  updateUserBlog,
} from "../../lib/store/actions/userBlogs.action";
import { useAppSelector } from "../../lib/store/hoooks/hooks";
import { IBlog } from "../../utilis/types/definitions";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    title: yup.string().required(),
    content: yup.string().required(),
    image: yup.mixed(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

interface ICreateBlog {
  blog?: IBlog;
  handleCategoryChange?: (id: number) => void;
}

const CreateBlog: FC<ICreateBlog> = ({ blog, handleCategoryChange }) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: {
      title: blog ? blog.title : "",
      content: blog ? blog.content : "",
      image: blog ? blog.imageUrl : "",
    },
    resolver: yupResolver(schema),
  });

  const [image, setImage] = useState<any>(null);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        if (key === "image") {
          if (image) {
            formData.append(key, image, image.name);
          }
        } else {
          //   @ts-ignore
          formData.append(key, values[key]);
        }
      }

      if (blog) {
        dispatch(updateUserBlog(blog.id, formData));
        router.replace("/my-blog");
      } else {
        dispatch(addBlogToUserBlogs(formData));
      }

      if (handleCategoryChange) {
        handleCategoryChange(1);
      }
    } catch (e: any) {
      console.error("Error submitting form:", e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        border: "solid 1px gray",
        borderRadius: "8px",
        padding: 12,
        minWidth: 800,
        backgroundColor: "white",
      }}
    >
      <Box display={"flex"} gap={2} flexDirection={"column"}>
        <Controller
          name={"title"}
          control={control}
          render={({ field }) => (
            <TextField {...field} id={"title"} required placeholder={"Title"} />
          )}
        />
        <Controller
          name={"content"}
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              id={"content"}
              name="content"
              placeholder="Type your story…"
              variant="outlined"
              minRows={3}
            />
          )}
        />
        <Controller
          name={"image"}
          control={control}
          render={({ field }) => (
            <Upload
              setImage={setImage}
              field={field}
              image={image}
              imageUrl={blog?.id && blog?.imageUrl ? `${blog?.imageUrl}` : ""}
            />
          )}
        />
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button type={"submit"} variant={"contained"}>
            {blog?.id ? "Update" : "Create"}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default CreateBlog;
