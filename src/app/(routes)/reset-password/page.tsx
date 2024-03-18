"use client";

import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AlertTitle, Box, Button, TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";

const schema = yup
  .object({
    email: yup.string().email("Please enter a valid email address").required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const Page = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/reset-password`,
        values,
      );
      console.log(data);
    } catch (e: any) {
      console.error(e.response.data.error.message);
      setError(
        "email",
        { type: "custom", message: e.response.data.error.message },
        { shouldFocus: true },
      );
    }
  };

  return (
    <main>
      <form
        style={{ width: 400, margin: "auto" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box display={"flex"} gap={2} flexDirection={"column"}>
          <Controller
            name={"email"}
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  id={"email"}
                  label={"Email"}
                  placeholder={"example@gmail.com"}
                  helperText={errors.email?.message}
                  error={!!errors.email?.message}
                />
              );
            }}
          />
          <Button type={"submit"} variant={"contained"}>
            Submit
          </Button>
        </Box>
      </form>
    </main>
  );
};

export default Page;
