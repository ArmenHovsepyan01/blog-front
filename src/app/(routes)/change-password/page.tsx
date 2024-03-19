"use client";

import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AlertTitle, Box, Button, TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
import { createConfigForRequest } from "../../../utilis/createConfigForRequest";
import { useRouter, useSearchParams } from "next/navigation";
import Notification from "../../../_components/notification/Notification";

const schema = yup
  .object({
    newPassword: yup.string().required(),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
      .required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [customError, setCustomError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const config = createConfigForRequest();
      const body = {
        password: values.newPassword,
      };

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/change-password?code=${code}`,
        body,
        config,
      );

      setMessage(data.message);
      console.log(data);
    } catch (e: any) {
      console.error(e.response.data.error.message);
      setCustomError(e.response.data.error.message);
    }
  };

  const handleClose = () => {
    setMessage("");
    router.replace("/my-blog");
  };

  return (
    <main>
      <form
        style={{ width: 400, margin: "auto" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box display={"flex"} gap={2} flexDirection={"column"}>
          {message && (
            <Notification
              message={message}
              isOpen={!!message}
              handleClose={handleClose}
            />
          )}
          <Controller
            name={"newPassword"}
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  id={"newPassword"}
                  label={"New Password"}
                  type={"password"}
                  helperText={errors.newPassword?.message}
                  error={!!errors.newPassword?.message}
                />
              );
            }}
          />
          <Controller
            name={"confirmNewPassword"}
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  id={"confirmNewPassword"}
                  label={"Confirm New Password"}
                  type={"password"}
                  helperText={errors.confirmNewPassword?.message}
                  error={!!errors.confirmNewPassword?.message}
                />
              );
            }}
          />
          {customError && <span style={{ color: "red" }}>{customError}</span>}
          <Button type={"submit"} variant={"contained"}>
            change password
          </Button>
        </Box>
      </form>
    </main>
  );
};

export default Page;
