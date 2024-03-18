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

const schema = yup
  .object({
    title: yup.string().required(),
    content: yup.string().required(),
    image: yup.mixed(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

interface ICreateBlog {
  id?: number;
  closeModal?: () => void;
  handleCategoryChange?: (id: number) => void;
}

const CreateBlog: FC<ICreateBlog> = ({
  handleCategoryChange,
  id,
  closeModal,
}) => {
  const userBlogs = useAppSelector((state) => state.userBlogs.blogs);
  const blog = userBlogs.find((item: IBlog) => item.id === id);

  console.log(blog);

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

      if (id && closeModal) {
        dispatch(updateUserBlog(id, formData));
        closeModal();
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
              imageUrl={id && blog.imageUrl ? `${blog.imageUrl}` : ""}
            />
          )}
        />
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button type={"submit"} variant={"contained"}>
            {id ? "Update" : "Create"}
          </Button>
          {closeModal && (
            <Button
              variant={"contained"}
              sx={{ backgroundColor: "red" }}
              onClick={closeModal}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
};

export default CreateBlog;
