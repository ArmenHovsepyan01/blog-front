"use client";

import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AlertTitle, Alert, Box, Button, TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Notification from "../../../_components/notification/Notification";
import FormWrapper from "../../../_components/form-wrapper/FormWrapper";

const schema = yup
  .object({
    email: yup.string().email("Please enter a valid email address").required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const Page = () => {
  const [message, setMessage] = useState<string>("");

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

      setMessage(data.message);
    } catch (e: any) {
      console.error(e.response.data.error.message);
      setError(
        "email",
        { type: "custom", message: e.response.data.error.message },
        { shouldFocus: true },
      );
    }
  };

  const handleClose = () => {
    setMessage("");
  };

  return (
    <main>
      <FormWrapper label={"Reset Password"}>
        <form
          style={{ width: 400, margin: "auto" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box display={"flex"} gap={2} flexDirection={"column"}>
            <Notification
              message={message}
              isOpen={!!message}
              handleClose={handleClose}
            />
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
            <Button
              type={"submit"}
              variant={"contained"}
              sx={{ textTransform: "capitalize" }}
            >
              Confirm reset
            </Button>
          </Box>
        </form>
      </FormWrapper>
    </main>
  );
};

export default Page;
