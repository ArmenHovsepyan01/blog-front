"use client";

import React, { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Box, TextField } from "@mui/material";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";

import { createConfigForRequest } from "../../../utilis/createConfigForRequest";

import Notification from "../../../_components/notification/Notification";

import FormWrapper from "@/_components/form-wrapper/FormWrapper";
import { LoadingButton } from "@mui/lab";

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

  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const config = await createConfigForRequest();
      const body = {
        password: values.newPassword,
      };

      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/change-password?code=${code}`,
        body,
        config,
      );

      setLoading(false);

      setMessage(data.message);
    } catch (e: any) {
      console.error(e.response.data.error.message);
      if (loading) {
        setLoading(false);
      }
      setCustomError(e.response.data.error.message);
    }
  };

  const handleClose = () => {
    setMessage("");
    router.replace("/my-blog");
  };

  return (
    <main>
      <FormWrapper label={"Change Password"}>
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
            <LoadingButton
              type={"submit"}
              variant={"contained"}
              sx={{ textTransform: "capitalize" }}
              loading={!!loading}
            >
              change password
            </LoadingButton>
          </Box>
        </form>
      </FormWrapper>
    </main>
  );
};

export default Page;
