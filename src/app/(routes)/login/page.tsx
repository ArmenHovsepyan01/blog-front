"use client";

import React, { useState } from "react";

import { signIn } from "next-auth/react";

import { Button, Link, TextField, Box } from "@mui/material";

import { useRouter } from "next/navigation";

import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import FormWrapper from "../../../_components/form-wrapper/FormWrapper";

const schema = yup
  .object({
    email: yup.string().email("Please enter a valid email address").required(),
    password: yup.string().min(6).required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const [customError, setCustomError] = useState<string>("");

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const res = await signIn("login", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error && !res?.ok) {
        if (res.error.toLowerCase().includes("password")) {
          return setError(
            "password",
            { type: "custom", message: res.error },
            { shouldFocus: true },
          );
        }

        if (res.error.toLowerCase().includes("email")) {
          return setError(
            "email",
            { type: "custom", message: res.error },
            { shouldFocus: true },
          );
        }
        return setCustomError(res.error);
      }

      router.replace("/");
    } catch (e: any) {
      console.error(e);
      const errorMessage = e.response.data.error.message;

      setCustomError(errorMessage);
    }
  };

  return (
    <FormWrapper label={"Login"}>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Box display={"flex"} gap={4} flexDirection={"column"}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id={"email"}
                label="Email address"
                required
                placeholder={"example@gmail.com"}
                helperText={errors.email?.message}
                error={!!errors.email?.message}
              />
            )}
          />

          <Controller
            name={"password"}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id={"password"}
                type={"password"}
                label="Password"
                helperText={errors.password?.message}
                error={!!errors.password?.message}
                required
              />
            )}
          />
          <p style={{ color: "red" }}>{customError}</p>

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              type={"submit"}
              variant={"contained"}
              size={"medium"}
              sx={{ width: 120, textTransform: "capitalize" }}
            >
              Log in
            </Button>

            <Link href={"/register"}>Reigster now</Link>
          </Box>
        </Box>
      </form>
    </FormWrapper>
  );
};

export default Login;
