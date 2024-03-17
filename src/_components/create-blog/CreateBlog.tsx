"use client";

import React, { useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Textarea from "@mui/joy/Textarea";

import axios from "axios";
import { createConfigForRequest } from "@/utilis/createConfigForRequest";
import Upload from "@/_components/upload/Upload";
import { useDispatch } from "react-redux";
import { addBlog } from "@/lib/store/actions/blog.actions";

const schema = yup
  .object({
    title: yup.string().required(),
    content: yup.string().required(),
    image: yup.mixed(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const CreateBlog = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
    resolver: yupResolver(schema),
  });

  const [image, setImage] = useState<any>(null);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URI}/blog`;
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

      const config = createConfigForRequest();
      const { data } = await axios.post(url, formData, config);

      dispatch(addBlog(data.blog));
    } catch (e: any) {
      console.error("Error submitting form:", e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ border: "solid 1px gray", borderRadius: "8px", padding: 12 }}
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
              placeholder="Type in here…"
              variant="outlined"
              minRows={3}
            />
          )}
        />
        <Controller
          name={"image"}
          control={control}
          render={({ field }) => (
            <Upload setImage={setImage} field={field} image={image} />
          )}
        />
        <Button type={"submit"} variant={"contained"}>
          Create
        </Button>
      </Box>
    </form>
  );
};

export default CreateBlog;
